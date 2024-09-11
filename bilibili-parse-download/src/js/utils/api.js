
import { config, hostMap } from '../ui/config'
import { store } from '../store'
import { Message } from '../ui/message'
import { user } from '../user'
import { ajax, _ajax } from './ajax'
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
    const [aid, bvid, cid, epid, q, type] = [
        vb.aid(page),
        vb.bvid(page),
        vb.cid(page),
        vb.epid(page),
        quality || video.get_quality().q,
        vb.type()
    ]

    // 参数预处理
    let format = video_format || config.format
    if (request_type === 'auto' && user.needReplace()) request_type = 'remote'

    const url_replace_cdn = url => {
        if (config.host_key === '0') {
            return url
        }
        // 全部切换CDN
        const url_tmp = url.split('/')
        const mapping = hostMap[config.host_key]
        if ('string' === typeof mapping && mapping.length) {
            if (mapping.at(0).match(/[a-z]/)) {
                url_tmp[2] = mapping
            }
        } else if ('function' === typeof mapping) {
            url_tmp[2] = mapping()
        }
        url = url_tmp.join('/')
        return url
    }

    let base_api
    const ajax_obj = {
        type: 'GET',
        dataType: 'json'
    }

    if (request_type === 'auto' || request_type === 'local') {
        let fnver, fnval
        if (type === 'cheese') {
            base_api = 'https://api.bilibili.com/pugv/player/web/playurl'
            fnver = format === 'mp4' ? 1 : 0
            fnval = 80
        } else {
            base_api = type === 'video'
                ? 'https://api.bilibili.com/x/player/playurl'
                : 'https://api.bilibili.com/pgc/player/web/playurl'
            fnver = 0
            fnval = { dash: 4048, flv: 4049, mp4: 0 }[format] || 0
        }
        base_api += `?avid=${aid}&bvid=${bvid}&cid=${cid}&qn=${q}&fnver=${fnver}&fnval=${fnval}&fourk=1&ep_id=${epid}&type=${format}&otype=json`
        base_api += format === 'mp4' ? '&platform=html5&high_quality=1' : ''
        ajax_obj.xhrFields = { withCredentials: true }
    } else {
        base_api = config.base_api
        base_api += `?av=${aid}&bv=${bvid}&cid=${cid}&ep=${epid}&q=${q}&type=${type}&format=${format}&otype=json`
        !!page && (base_api += '&s')
        const [auth_id, auth_sec] = [
            store.get('auth_id'),
            store.get('auth_sec')
        ]
        if (auth_id && auth_sec) {
            base_api += `&auth_id=${auth_id}&auth_sec=${auth_sec}`
        }
    }

    const resultConvertor = (data, _success) => { // 判断地址有效性
        const checkTask = (key, backup_key) => {
            if (!data[backup_key]) {
                return Promise.resolve(key)
            }
            return _ajax({
                type: 'GET',
                url: data[key],
                cache: false,
                timeout: 1000,
                success: function (res) {
                    return key
                },
                error: function (res) {
                    if (res.statusText == 'timeout') {
                        return key
                    } else { // back_url
                        return backup_key
                    }
                }
            })
        }

        new Promise((resolve, reject) => {
            const promiseList = []
            const valueList = []
            if (data.url) {
                promiseList.push(checkTask('url', 'backup_url'))
            } else {
                promiseList.push(checkTask('video', 'backup_video'))
                promiseList.push(checkTask('audio', 'backup_audio'))
            }
            const timer = setTimeout(() => {
                resolve(valueList)
            }, 1500)
            let index = 0
            promiseList.forEach(async (promise) => {
                let result
                try {
                    result = await promise
                } catch (error) {
                    result = error
                }
                console.log('use ' + result)
                valueList[index++] = result
                if (index == promiseList.length) {
                    clearInterval(timer)
                    resolve(valueList)
                }
            })
        }).then((resList) => {
            console.log('use data key: ', resList);
            if (!resList) {
                return
            }
            resList = [...resList]
            for (const key of resList) {
                if (!data[key]) continue
                if (['url', 'backup_url'].includes(key)) {
                    data.url = data[key]
                } else if (['video', 'backup_video'].includes(key)) {
                    data.video = data[key]
                }
                else if (['audio', 'backup_audio'].includes(key)) {
                    data.audio = data[key]
                }
            }
        }).finally(() => {
            _success(data)
        })
    }

    ajax_obj.url = base_api
    ajax(ajax_obj).then(res => {
        let data
        if (!res.code) {
            data = res.result || res.data
        }

        if (!data) {
            if (request_type === 'auto') {
                get_url_base(page, quality, video_format, success, error, 'remote')
                return
            }
            // remote
            res.url && (res.url = url_replace_cdn(res.url))
            res.video && (res.video = url_replace_cdn(res.video))
            res.audio && (res.audio = url_replace_cdn(res.audio))
            // _success(res)
            resultConvertor(res, _success)
            return
        }

        // local
        if (data.dash) {
            const result = {
                code: 0,
                quality: data.quality,
                accept_quality: data.accept_quality,
                video: '',
                audio: ''
            }
            const videos = data.dash.video
            for (let i = 0; i < videos.length; i++) {
                const video = videos[i]
                if (video.id <= q) {
                    result.video = url_replace_cdn(video.base_url)
                    result.audio = url_replace_cdn(data.dash.audio[0].base_url)
                    result.backup_video = video.backup_url && url_replace_cdn(video.backup_url[0])
                    result.backup_audio = data.dash.audio[0].backup_url && url_replace_cdn(data.dash.audio[0].backup_url[0])
                    break
                }
            }
            resultConvertor(result, _success)
            return
        }

        // durl
        resultConvertor({
            code: 0,
            quality: data.quality,
            accept_quality: data.accept_quality,
            url: url_replace_cdn(data.durl[0].url),
            backup_url: data.durl[0].backup_url && url_replace_cdn(data.durl[0].backup_url[0])
        }, _success)

    }).catch(err => _error(err))

}

function _get_subtitle(p, callback, to_blob_url = true) {
    const vb = video.base()
    const [aid, cid, epid] = [
        vb.aid(p),
        vb.cid(p),
        vb.epid(p)
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

export const api = {
    get_url(success, error) {
        const request_type = config.request_type
        const format = config.format
        const quality = parseInt(config.video_quality)
        get_url_base(0, quality, format, success, error, request_type)
    },
    get_urls(page, quality, format, success, error) {
        const request_type = config.request_type
        get_url_base(page, quality, format, success, error, request_type)
    },
    get_subtitle_url,
    get_subtitle_data
}
