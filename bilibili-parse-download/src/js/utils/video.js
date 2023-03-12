import { videoQualityMap } from '../ui/config'
import { user } from '../user'
import { api } from './api'

const routerMap = {
    video: '/video/',
    bangumi: '/bangumi/play/', // ss / ep
    medialist: '/medialist/play/',
    cheese: '/cheese/play/',
}

function type() {
    for (const key in routerMap) {
        if (location.pathname.startsWith(routerMap[key])) {
            return key
        }
    }
    return '?'
}

function base() {
    const _type = type()
    if (_type === 'video') {
        const state = window.__INITIAL_STATE__
        const main_title = (state.videoData && state.videoData.title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
        return {
            type: 'video',
            name: main_title,
            total: () => {
                return state.videoData.pages.length || 1
            },
            title: (p) => {
                const id = p || state.p || 1
                return (state.videoData.pages[id - 1].part || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (p) => {
                const id = p || state.p || 1
                const title = main_title + ` P${p} （${state.videoData.pages[id - 1].part || p}）`
                return title.replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: () => {
                return state.videoData.aid
            },
            bvid: () => {
                return state.videoData.bvid
            },
            p: () => {
                return state.p || 1
            },
            cid: (p) => {
                const id = p || state.p || 1
                return state.videoData.pages[id - 1].cid
            },
            epid: () => {
                return ''
            },
            need_vip: (p) => {
                return false
            },
            vip_need_pay: () => {
                return false
            },
            is_limited: () => {
                return false
            }
        }
    } else if (_type === 'medialist') {
        const medialist = $('div.player-auxiliary-playlist-item')
        const _id = $('div.player-auxiliary-playlist-item.player-auxiliary-playlist-item-active').index()
        const collect_name = $('.player-auxiliary-playlist-top .player-auxiliary-filter-title').html()
        const main_title = (collect_name || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
        return {
            type: 'video',
            name: main_title,
            total: () => {
                return medialist.length
            },
            title: (p) => {
                let id = p ? (p - 1) : _id
                const title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown'
                return title.replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (p) => {
                let id = p ? (p - 1) : _id
                const title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown'
                return (`${main_title} P${id + 1} （${title}）`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (p) => {
                let id = p ? (p - 1) : _id
                return medialist.eq(id).attr('data-aid')
            },
            bvid: (p) => {
                let id = p ? (p - 1) : _id
                return medialist.eq(id).attr('data-bvid')
            },
            p: () => {
                return _id + 1
            },
            cid: (p) => {
                let id = p ? (p - 1) : _id
                return medialist.eq(id).attr('data-cid')
            },
            epid: () => {
                return ''
            },
            need_vip: (p) => {
                return false
            },
            vip_need_pay: () => {
                return false
            },
            is_limited: () => {
                return false
            }
        }
    } else if (_type === 'bangumi') {

        if (!!window.__INITIAL_STATE__) {
            const state = window.__INITIAL_STATE__
            const main_title = (state.mediaInfo.season_title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            return {
                type: 'bangumi',
                name: main_title,
                total: () => {
                    return state.epList.length
                },
                title: (p) => {
                    const ep = p ? state.epList[p - 1] : state.epInfo
                    return (`${ep.titleFormat} ${ep.longTitle}`).replace(/[\/\\:*?"<>|]+/g, '')
                },
                filename: (p) => {
                    if (p) {
                        const ep = state.epList[p - 1]
                        return (`${main_title}：${ep.titleFormat} ${ep.longTitle}`).replace(/[\/\\:*?"<>|]+/g, '')
                    }
                    return (state.h1Title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
                },
                aid: (p) => {
                    return p ? state.epList[p - 1].aid : state.epInfo.aid
                },
                bvid: (p) => {
                    return p ? state.epList[p - 1].bvid : state.epInfo.bvid
                },
                p: () => {
                    return state.epInfo.i || 1
                },
                cid: (p) => {
                    return p ? state.epList[p - 1].cid : state.epInfo.cid
                },
                epid: (p) => {
                    return p ? state.epList[p - 1].id : state.epInfo.id
                },
                need_vip: () => {
                    return state.epInfo.badge === '会员'
                },
                vip_need_pay: () => {
                    return state.epPayMent.vipNeedPay
                },
                is_limited: () => {
                    return state.userState.areaLimit
                }
            }
        }

        // todo vue ?
        const queries = __NEXT_DATA__.props.pageProps.dehydratedState.queries
        const mediaInfo = queries[0].state.data.mediaInfo
        const historyEpId = queries[1].state.data.userInfo.history.epId
        const main_title = mediaInfo.season_title
        const episodes = mediaInfo.episodes

        let epid
        if (location.pathname.startsWith('/bangumi/play/ss')) {
            epid = parseInt(historyEpId)
        } else {
            epid = location.pathname.match(/ep(\d+)/)
            epid = epid ? parseInt(epid[1]) : 0
        }

        let _id = 0
        for (let i = 0; i < episodes.length; i++) {
            if (episodes[i].id == epid) {
                _id = i
                break
            }
        }

        const state = {
            epList: episodes,
            epInfo: episodes[_id]
        }

        return {
            type: 'bangumi',
            name: main_title,
            total: () => {
                return state.epList.length
            },
            title: (p) => {
                const ep = p ? state.epList[p - 1] : state.epInfo
                return (`${ep.titleFormat} ${ep.long_title}`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (p) => {
                const ep = p ? state.epList[p - 1] : state.epInfo
                return (`${main_title}：${ep.titleFormat} ${ep.long_title}`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (p) => {
                return p ? state.epList[p - 1].aid : state.epInfo.aid
            },
            bvid: (p) => {
                return p ? state.epList[p - 1].bvid : state.epInfo.bvid
            },
            p: () => {
                return _id + 1
            },
            cid: (p) => {
                return p ? state.epList[p - 1].cid : state.epInfo.cid
            },
            epid: (p) => {
                return p ? state.epList[p - 1].id : state.epInfo.id
            },
            need_vip: (p) => {
                return state.epList[p - 1].badge === '会员'
            },
            vip_need_pay: (p) => {
                return state.epList[p - 1].badge === '付费'
            },
            is_limited: () => {
                return !!mediaInfo.user_status.area_limit
            }
        }
    } else if (_type === 'cheese') {

        const sid = (location.href.match(/\/cheese\/play\/ss(\d+)/i) || ['', ''])[1]
        let epid

        if (!sid) {
            epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || ['', ''])[1]
        }

        if (!window.bp_episodes) { // todo
            window.bp_episodes = [] // ref check
            api.get_season(sid, epid)
        }

        const episodes = window.bp_episodes
        let _id = 0

        for (let i = 0; i < episodes.length; i++) {
            if (episodes[i].id == epid) {
                _id = i
                break
            }
        }

        const main_title = ($('div.archive-title-box').text() || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
        return {
            type: 'cheese',
            name: main_title,
            total: () => {
                return episodes.length
            },
            title: (p) => {
                let id = p ? (p - 1) : id
                return (episodes[id].title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (p) => {
                let id = p ? (p - 1) : _id
                return (`${main_title} P${id + 1} （${episodes[id].title || 'unknown'}）`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (p) => {
                return episodes[p ? (p - 1) : _id].aid
            },
            bvid: (p) => {
                return ''
            },
            p: () => {
                return _id + 1
            },
            cid: (p) => {
                return episodes[p ? (p - 1) : _id].cid
            },
            epid: (p) => {
                return episodes[p ? (p - 1) : _id].id
            },
            need_vip: (p) => {
                return false
            },
            vip_need_pay: () => {
                return false
            },
            is_limited: () => {
                return false
            }
        }
    } else { // error
        return {
            type: '?',
            name: 'none',
            total: () => { return 0 },
            title: (p) => { return '' },
            filename: (p) => { return '' },
            aid: (p) => { return '' },
            bvid: (p) => { return '' },
            p: () => { return 1 },
            cid: (p) => { return '' },
            epid: (p) => { return '' },
            need_vip: (p) => { return false },
            vip_need_pay: () => { return false },
            is_limited: () => { return false }
        }
    }
}

const q_map = {
    '1080P 高码率': 112,
    '1080P 高清': 80,
    '720P 高清': 64,
    '480P 清晰': 32,
    '360P 流畅': 16,
    '自动': 32
}

function get_quality() {
    let _q = 0, _q_max = 0
    const vb = video.base()
    if (vb.type === 'cheese') {
        const q = $('div.edu-player-quality-item.active span').text()
        const q_max = $($('div.edu-player-quality-item span').get(0)).text()
        _q = q in q_map ? q_map[q] : 0
        _q_max = q_max in q_map ? q_map[q_max] : 0
    } else {
        const keys = Object.keys(videoQualityMap)
        const q = parseInt((vb.type === 'video'
            ? $('li.bpx-player-ctrl-quality-menu-item.bpx-state-active')
            : $('li.squirtle-select-item.active')).attr('data-value'))
        const q_max = parseInt($((vb.type === 'video'
            ? $('li.bpx-player-ctrl-quality-menu-item')
            : $('li.squirtle-select-item')).get(0)).attr('data-value'))
        _q = keys.indexOf(`${q}`) > -1 ? q : 0
        _q_max = keys.indexOf(`${q_max}`) > -1 ? q_max : 0
    }
    !_q && (_q = 80)
    !_q_max && (_q_max = 80)

    if (!user.isVIP()) {
        _q = _q > 80 ? 80 : _q
    }

    return { q: _q, q_max: _q_max }
}

function get_quality_support() {
    let list, quality_list = []
    const vb = video.base()
    if (vb.type === 'cheese') {
        list = $('div.edu-player-quality-item span')
        list.each(function () {
            const k = $(this).text()
            if (q_map[k]) {
                quality_list.push(q_map[k])
            }
        })
    } else {
        const keys = Object.keys(videoQualityMap)
        list = vb.type === 'video'
            ? $('li.bpx-player-ctrl-quality-menu-item')
            : $('li.squirtle-select-item')
        if (list && list.length) {
            list.each(function () {
                const q = `${parseInt($(this).attr('data-value'))}`
                if (keys.indexOf(q) > -1) {
                    quality_list.push(q)
                }
            })
        }
    }

    return quality_list.length
        ? quality_list
        : ['80', '64', '32', '16']

}

export const video = {
    type, base,
    get_quality,
    get_quality_support
}
