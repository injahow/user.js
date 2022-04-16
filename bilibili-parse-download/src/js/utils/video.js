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
            aid: (_p) => {
                return state.videoData.aid
            },
            p: () => {
                return state.p || 1
            },
            cid: (_p) => {
                const p = _p || state.p || 1
                return state.videoData.pages[p - 1].cid
            },
            epid: (_p) => {
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
            p: () => {
                return _id + 1
            },
            cid: (_p) => {
                let id = _p ? (_p - 1) : _id
                return medialist.eq(id).attr('data-cid')
            },
            epid: (_p) => {
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
        const _id = $('li.on.list-box-li').index()
        const main_title = ($('div.season-info h1').html() || 'unknown').replace(/[\/\\:*?"<>|]+/g, '')
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
    '自动': 64
}

function get_quality() {
    let _q = 0, _q_max = 0
    if (!!$('li.bui-select-item')[0] && !!(_q_max = parseInt($('li.bui-select-item')[0].dataset.value))) {
        _q = parseInt($('li.bui-select-item.bui-select-item-active').attr('data-value')) || (_q_max > 80 ? 80 : _q_max)
    } else if (!!$('li.squirtle-select-item')[0] && !!(_q_max = parseInt($('li.squirtle-select-item')[0].dataset.value))) {
        _q = parseInt($('li.squirtle-select-item.active').attr('data-value')) || (_q_max > 80 ? 80 : _q_max)
    } else if (!!$('div.edu-player-quality-item')[0]) {
        _q = q_map[$('div.edu-player-quality-item.active span').text() || '自动'] || 80
        _q_max = q_map[$('div.edu-player-quality-item span').text() || '自动'] || 80
    } else {
        _q = _q_max = 80
    }
    return { q: _q, q_max: _q_max }
}

function get_quality_support() {
    let list, quality_list = []
    if (type() === 'cheese') {
        list = $('div.edu-player-quality-item span')
        list.each(function () {
            const k = $(this).text()
            if (k === '自动') {
                return false
            }
            quality_list.push(q_map[$(this).text()])
        })
        return quality_list.length
            ? quality_list
            : ['80', '64', '32', '16']
    }
    if (!!$('ul.squirtle-select-list')[0]) {
        list = $('li.squirtle-select-item')
    } else if (!!$('ul.bui-select-list')[0]) {
        list = $('li.bui-select-item')
    }
    if (list && list.length) {
        list.each(function () {
            const q = `${$(this).attr('data-value')}`
            if (q === '0') {
                return false
            }
            quality_list.push(q)
        })
        return quality_list
    }
    return ['80', '64', '32', '16']
}

export const video = {
    type, base,
    get_quality,
    get_quality_support
}
