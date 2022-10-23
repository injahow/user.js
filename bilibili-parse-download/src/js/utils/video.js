import { videoQualityMap } from '../ui/config'
import { user } from '../user'
import { api } from './api'

function type() {
    if (location.pathname.match('/cheese/play/')) {
        return 'cheese'
    } else if (location.pathname.match('/medialist/play/')) {
        // -/ml*/* or -/watchlater/*
        return 'medialist'
    } else if (!window.__INITIAL_STATE__) {
        // todo
        return '?'
    } else if (!!window.__INITIAL_STATE__.epInfo) {
        return 'bangumi'
    } else if (!!window.__INITIAL_STATE__.videoData) {
        return 'video'
    }
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
            title: (_p) => {
                const p = _p || state.p || 1
                return (state.videoData.pages[p - 1].part || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (_p) => {
                const p = _p || state.p || 1
                const title = main_title + ` P${p} （${state.videoData.pages[p - 1].part || p}）`
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
            cid: (_p) => {
                const p = _p || state.p || 1
                return state.videoData.pages[p - 1].cid
            },
            epid: () => {
                return ''
            },
            need_vip: () => {
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
            title: (_p) => {
                let id = _p ? (_p - 1) : _id
                const title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown'
                return title.replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (_p) => {
                let id = _p ? (_p - 1) : _id
                const title = medialist.eq(id).find('.player-auxiliary-playlist-item-title').attr('title') || 'unknown'
                return (`${main_title} P${id + 1} （${title}）`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return medialist.eq(id).attr('data-aid')
            },
            bvid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return medialist.eq(id).attr('data-bvid')
            },
            p: () => {
                return _id + 1
            },
            cid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return medialist.eq(id).attr('data-cid')
            },
            epid: () => {
                return ''
            },
            need_vip: () => {
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
        const state = window.__INITIAL_STATE__
        const main_title = (state.mediaInfo.season_title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
        return {
            type: 'bangumi',
            name: main_title,
            total: () => {
                return state.epList.length
            },
            title: (_p) => {
                const ep = _p ? state.epList[_p - 1] : state.epInfo
                return (`${ep.titleFormat} ${ep.longTitle}`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (_p) => {
                if (_p) {
                    const ep = state.epList[_p - 1]
                    return (`${main_title}：${ep.titleFormat} ${ep.longTitle}`).replace(/[\/\\:*?"<>|]+/g, '')
                }
                return (state.h1Title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (_p) => {
                return _p ? state.epList[_p - 1].aid : state.epInfo.aid
            },
            bvid: () => {
                return _p ? state.epList[_p - 1].bvid : state.epInfo.bvid
            },
            p: () => {
                return state.epInfo.i || 1
            },
            cid: (_p) => {
                return _p ? state.epList[_p - 1].cid : state.epInfo.cid
            },
            epid: (_p) => {
                return _p ? state.epList[_p - 1].id : state.epInfo.id
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
    } else if (_type === 'cheese') {
        const epid = (location.href.match(/\/cheese\/play\/ep(\d+)/i) || ['', ''])[1]

        if (!window.bp_episodes) { // todo: 异步如何处理？
            window.bp_episodes = [] // ref check
            api.get_season(epid)
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
            title: (_p) => {
                let id = _p ? (_p - 1) : _id
                return (episodes[id].title || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
            },
            filename: (_p) => {
                let id = _p ? (_p - 1) : _id
                return (`${main_title} P${id + 1} （${episodes[id].title || 'unknown'}）`).replace(/[\/\\:*?"<>|]+/g, '')
            },
            aid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return episodes[id].aid
            },
            bvid: () => {
                return ''
            },
            p: () => {
                return _id + 1
            },
            cid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return episodes[id].cid
            },
            epid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return episodes[id].id
            },
            need_vip: () => {
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
            title: (_p) => { return '' },
            filename: (_p) => { return '' },
            aid: (_p) => { return '' },
            p: () => { return 1 },
            cid: (_p) => { return '' },
            epid: (_p) => { return '' },
            need_vip: () => { return false },
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
