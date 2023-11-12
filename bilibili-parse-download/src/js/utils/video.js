import { videoQualityMap } from '../ui/config'
import { user } from '../user'
import { api } from './api'
import { Bangumi, Cheese, Video, VideoBase, VideoList } from './video-base'


function type() {
    const routerMap = {
        video: '/video/',
        list: '/list/',
        bangumi: '/bangumi/play/', // ss / ep
        cheese: '/cheese/play/'
    }
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
        const main_title = state.videoData && state.videoData.title

        return new Video(main_title, state)
    } else if (_type === 'list') {
        const state = window.__INITIAL_STATE__
        const main_title = state.mediaListInfo && (state.mediaListInfo.upper.name + '-' + state.mediaListInfo.title)

        return new VideoList(main_title, state)
    } else if (_type === 'bangumi') {
        // ! state: {p, mediaInfo, epList, epId, epMap}
        if (!!window.__INITIAL_STATE__) {
            // old
            const state = window.__INITIAL_STATE__
            const main_title = state.mediaInfo.season_title
            state.p = state.epInfo.i + 1

            return new Bangumi(main_title, state)
        }
        // new // todo
        const queries = window.__NEXT_DATA__.props.pageProps.dehydratedState.queries
        const { mediaInfo, sectionsMap } = queries[0].state.data.seasonInfo
        const historyEpId = queries[0].state.data.userInfo.userInfo.history.epId
        const { season_title: main_title, episodes } = mediaInfo

        const epMap = {}
        episodes.forEach(epInfo => {
            epMap[epInfo.id] = epInfo
        })
        Object.entries(sectionsMap).forEach(([sid, sectionInfo]) => {
            sectionInfo.epList.forEach(epInfo => {
                epMap[epInfo.id] = epInfo
            })
        })

        let epid
        if (location.pathname.startsWith('/bangumi/play/ss')) {
            epid = parseInt(historyEpId)
            if (epid < 0) {
                epid = episodes[0].id
            }
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
            p: _id + 1,
            epId: epid,
            epList: episodes,
            mediaInfo: mediaInfo,
            epMap: epMap
        }

        return new Bangumi(main_title, state)
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
        const state = {
            p: _id + 1,
            episodes
        }

        return new Cheese(main_title, state)
    } else { // error

        return new VideoBase()
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
    const _type = type()
    if (_type === 'cheese') {
        const q = $('div.edu-player-quality-item.active span').text()
        const q_max = $($('div.edu-player-quality-item span').get(0)).text()
        _q = q in q_map ? q_map[q] : 0
        _q_max = q_max in q_map ? q_map[q_max] : 0
    } else {
        const keys = Object.keys(videoQualityMap)
        const q = parseInt((_type === 'video'
            ? $('li.bpx-player-ctrl-quality-menu-item.bpx-state-active')
            : $('li.squirtle-select-item.active')).attr('data-value'))
        const q_max = parseInt($((_type === 'video'
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
    const _type = type()
    if (_type === 'cheese') {
        list = $('div.edu-player-quality-item span')
        list.each(function () {
            const k = $(this).text()
            if (q_map[k]) {
                quality_list.push(q_map[k])
            }
        })
    } else {
        const keys = Object.keys(videoQualityMap)
        list = ['video', 'list'].includes(_type)
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
