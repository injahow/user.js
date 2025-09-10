import { videoQualityMap } from '../ui/config'
import { user } from '../user'
import { Bangumi, Cheese, Video, VideoBase, VideoFestival, VideoList } from './video-base'


function type() {
    const routerMap = {
        video: '/video/',
        list: '/list/',
        festival: '/festival/',
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
    let vb = new VideoBase()
    if (_type === 'video') {
        const state = window.__INITIAL_STATE__
        const main_title = state.videoData && state.videoData.title

        vb = new Video(main_title, state)
    } else if (_type === 'list') {
        const state = window.__INITIAL_STATE__
        const main_title = state.mediaListInfo && (state.mediaListInfo.upper.name + '-' + state.mediaListInfo.title)

        vb = new VideoList(main_title, state)
    } else if (_type === 'festival') {
        const state = window.__INITIAL_STATE__
        const main_title = state.title

        vb = new VideoFestival(main_title, state)
    } else if (_type === 'bangumi') {

        vb = Bangumi.build()
    } else if (_type === 'cheese') { // todo

        vb = Cheese.build()
    }

    return vb
}

const q_map = {
    '8K 超高清': 127,
    '4K 超高清': 120,
    '1080P 60帧': 116,
    '1080P 高码率': 112,
    '1080P 高清': 80,
    '720P 准高清': 64,
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

    if (!_q) {
        _q = parseInt($('li.bpx-player-ctrl-quality-menu-item.bpx-state-active').attr('data-value') || _q)
    }

    if (!_q_max) {
        _q_max = parseInt($('li.bpx-player-ctrl-quality-menu-item').attr('data-value') || _q_max)
    }

    !_q_max && (_q_max = 80) && (console.error('video get quality max error'))
    !_q && (_q = _q_max < 80 ? _q_max : 80)

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
        if (!list[0]) {
            list = $('li.bpx-player-ctrl-quality-menu-item')
        }
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
    type,
    base,
    get_quality,
    get_quality_support
}
