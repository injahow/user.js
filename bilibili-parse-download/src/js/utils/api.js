
import { config, hostMap } from '../ui/config'
import { store } from '../store'
import { Message } from '../ui/message'
import { user } from '../user'
import { ajax } from './ajax'
import { video } from './video'

function get_url_base(page, quality, video_format, success, error, request_type) {

    let _success, _error
    if ('function' === typeof success) {
        _success = e => {
            // todo
            success(e)
        }
    } else {
        _success = res => console.log(res)
    }

    if ('function' === typeof error) {
        _error = e => {
            Message.error('请求失败')
            error(e)
        }
    } else {
        _error = err => console.error(err)
    }

    const vb = video.base()
    const [aid, cid, epid, q, type] = [
        vb.aid(page),
        vb.cid(page),
        vb.epid(page),
        quality || video.get_quality().q,
        vb.type
    ]

    // 参数预处理
    let format = video_format || config.format
    if (request_type === 'auto' && user.needReplace()) request_type = 'online'

    const url_replace_cdn = url => {
        if (config.host_key !== '0' && request_type === 'online' && format !== 'mp4') {
            // 切换CDN
            let url_tmp = url.split('/')
            url_tmp[2] = hostMap[config.host_key]
            url = url_tmp.join('/')
        }
        return url
    }

    let base_api
    const ajax_obj = {
        type: 'GET',
        dataType: 'json'
    }

    if (request_type === 'auto' || request_type === 'local') {
        let fnver, fnval = { dash: 4048, flv: 4049, mp4: 80 }[format] || 0
        if (type === 'cheese') {
            base_api = 'https://api.bilibili.com/pugv/player/web/playurl'
            fnver = format === 'mp4' ? 1 : 0
        } else {
            base_api = type === 'video'
                ? 'https://api.bilibili.com/x/player/playurl'
                : 'https://api.bilibili.com/pgc/player/web/playurl'
            fnver = 0
        }
        base_api += `?avid=${aid}&cid=${cid}&qn=${q}&fnver=${fnver}&fnval=${fnval}&fourk=1&ep_id=${epid}&type=${format}&otype=json`
        base_api += format === 'mp4' ? '&platform=html5&high_quality=1' : ''
        ajax_obj.xhrFields = { withCredentials: true }
    } else {
        base_api = config.base_api
        base_api += `?av=${aid}&cid=${cid}&q=${q}&ep=${epid}&type=${type}&format=${format}&otype=json`
        const [auth_id, auth_sec] = [
            store.get('auth_id'),
            store.get('auth_sec')
        ]
        if (config.auth === '1' && auth_id && auth_sec) {
            base_api += `&auth_id=${auth_id}&auth_sec=${auth_sec}`
            !!page && (base_api += '&s')
        }
    }

    ajax_obj.url = base_api
    ajax(ajax_obj).then(res => {
        let data
        if (!res.code) {
            data = res.result || res.data
        }

        if (!data) {
            if (request_type === 'auto') {
                get_url_base(page, quality, video_format, success, error, 'online')
                return
            }
            // online
            res.url && (res.url = url_replace_cdn(res.url))
            res.video && (res.video = url_replace_cdn(res.video))
            res.audio && (res.audio = url_replace_cdn(res.audio))
            _success(res)
            return
        }

        if (data.dash) {
            const result = {
                'code': 0,
                'quality': data.quality,
                'accept_quality': data.accept_quality,
                'video': '',
                'audio': ''
            }
            const videos = data.dash.video
            for (let i = 0; i < videos.length; i++) {
                const video = videos[i]
                if (video.id <= q) {
                    result.video = url_replace_cdn(video.base_url)
                    result.audio = url_replace_cdn(data.dash.audio[0].base_url)
                    break
                }
            }
            _success(result)
            return
        }

        _success({
            'code': 0,
            'quality': data.quality,
            'accept_quality': data.accept_quality,
            'url': url_replace_cdn(data.durl[0].url)
        })

    }).catch(err => _error(err))

}

function _get_subtitle(p, callback, to_blob_url = true) {
    const video_base = video.base()
    const [aid, cid, epid] = [
        video_base.aid(p),
        video_base.cid(p),
        video_base.epid(p)
    ]
    ajax({
        url: `https://api.bilibili.com/x/player/v2?aid=${aid}&cid=${cid}&ep_id=${epid}`,
        dataType: 'json'
    }).then(res => {
        // todo
        if (!res.code && res.data.subtitle.subtitles[0]) {
            ajax({
                url: `${res.data.subtitle.subtitles[0].subtitle_url}`,
                dataType: 'json'
            }).then(res => {
                // json -> webvtt -> blob_url
                const datas = res.body || [{ from: 0, to: 0, content: '' }]
                let webvtt = 'WEBVTT\n\n'
                for (let data of datas) {
                    const a = new Date((parseInt(data.from) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] +
                        '.' + (data.from.toString().split('.')[1] || '000').padEnd(3, '0')
                    const b = new Date((parseInt(data.to) - 8 * 60 * 60) * 1000).toTimeString().split(' ')[0] +
                        '.' + (data.to.toString().split('.')[1] || '000').padEnd(3, '0')
                    webvtt += `${a} --> ${b}\n${data.content.trim()}\n\n`
                }
                if (to_blob_url) {
                    callback(URL.createObjectURL(new Blob([webvtt], { type: 'text/vtt' })))
                } else {
                    callback(webvtt)
                }
            }).catch(callback)
        } else {
            callback()
        }
    }).catch(callback)
}

function get_subtitle_data(p, callback) {
    _get_subtitle(p, callback, false)
}

function get_subtitle_url(p, callback) {
    _get_subtitle(p, callback, true)
}

function get_season(epid) {
    ajax({
        url: `https://api.bilibili.com/pugv/view/web/season?ep_id=${epid}`,
        xhrFields: { withCredentials: true },
        dataType: 'json'
    }).then(res => {
        if (res.code) {
            Message.warning('获取剧集信息失败')
            return
        }
        window.bp_episodes = res.data.episodes || null
    })
}

export const api = {
    get_url: (success, error) => {
        const request_type = config.request_type
        const format = config.format
        const quality = parseInt(config.video_quality)
        get_url_base(0, quality, format, success, error, request_type)
    },
    get_urls: (page, quality, format, success, error) => {
        const request_type = config.request_type
        get_url_base(page, quality, format, success, error, request_type)
    },
    get_subtitle_url,
    get_subtitle_data,
    get_season
}
