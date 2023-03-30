import { config } from '../ui/config'
import { ajax } from './ajax'
import { api } from './api'
import { video } from './video'
import { DPlayer } from '../utils/runtime-lib'
import { MessageBox } from '../ui/message'

function get_bili_player_id() {
    if (!!$('#bilibiliPlayer')[0]) {
        return '#bilibiliPlayer'
    } else if (!!$('#bilibili-player')[0]) {
        return '#bilibili-player'
    } else if (!!$('#edu-player')[0]) {
        return 'div.bpx-player-primary-area'
    }
}

function request_danmaku(options, cid) {
    if (!cid) {
        options.error('cid未知，无法获取弹幕')
        return
    }
    ajax({
        url: `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`,
        dataType: 'text',
    }).then(result => {
        const result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''))
        if (!result_dom) {
            options.error('弹幕获取失败')
            return
        }
        if (!result_dom.find('d')[0]) {
            options.error('未发现弹幕')
        } else {
            const danmaku_data = result_dom.find('d').map((i, el) => {
                const item = $(el)
                const p = item.attr('p').split(',')
                let type = 0
                if (p[1] === '4') {
                    type = 2
                } else if (p[1] === '5') {
                    type = 1
                }
                return [{ author: '', time: parseFloat(p[0]), type: type, color: parseInt(p[3]), id: '', text: item.text() }]
            }).get()
            options.success(danmaku_data)
            // 加载弹幕设置
            setTimeout(() => {
                danmaku_config()
            }, 100)
        }
    }).catch(() => {
        options.error('弹幕请求异常')
    })
}

function replace_player(url, url_2) {
    // 恢复原视频
    recover_player()
    // 暂停原视频
    const bili_video = $(bili_video_tag())[0]
    bili_video_stop()
    !!bili_video && bili_video.addEventListener('play', bili_video_stop, false)
    let bili_player_id = get_bili_player_id()
    if (!!$('#bilibiliPlayer')[0]) {
        $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor">')
        $(bili_player_id).hide()
    } else if (!!$('#bilibili-player')[0]) {
        $(bili_player_id).before('<div id="bp_dplayer" class="bilibili-player relative bilibili-player-no-cursor" style="width:100%;height:100%;z-index:1000;"></div>')
        $(bili_player_id).hide()
    } else if (!!$('#edu-player')[0]) {
        $(bili_player_id).before('<div id="bp_dplayer" style="width:100%;height:100%;z-index:1000;"></div>')
        $(bili_player_id).hide()
    } else {
        MessageBox.alert('<div id="bp_dplayer" style="width:100%;height:100%;"></div>', () => {
            recover_player()
        })
    }
    const dplayer_init = (subtitle_url = '') => {
        window.bp_dplayer = new DPlayer({
            container: $('#bp_dplayer')[0],
            mutex: false,
            volume: 1,
            autoplay: true,
            video: {
                url: url,
                type: 'auto'
            },
            subtitle: {
                url: subtitle_url,
                type: 'webvtt',
                fontSize: '35px',
                bottom: '5%',
                color: '#fff',
            },
            danmaku: true,
            apiBackend: {
                read: (options) => {
                    request_danmaku(options, video.base().cid())
                },
                send: (options) => { // ?
                    options.error('此脚本无法将弹幕同步到云端')
                }
            },
            contextmenu: [
                {
                    text: '脚本信息',
                    link: 'https://github.com/injahow/user.js'
                },
                {
                    text: '脚本作者',
                    link: 'https://injahow.com'
                }
            ]
        })
        // subtitle_blob save
        if (url_2 && url_2 !== '#') {
            $('body').append('<div id="bp_dplayer_2" style="display:none;"></div>')
            window.bp_dplayer_2 = new DPlayer({
                container: $('#bp_dplayer_2')[0],
                mutex: false,
                volume: 1,
                autoplay: false,
                video: {
                    url: url_2,
                    type: 'auto'
                }
            })
            const [bp_dplayer, bp_dplayer_2] = [
                window.bp_dplayer,
                window.bp_dplayer_2
            ]
            bp_dplayer.on('play', () => {
                !bp_dplayer.paused && bp_dplayer_2.play()
            })
            bp_dplayer.on('playing', () => {
                !bp_dplayer.paused && bp_dplayer_2.play()
            })
            bp_dplayer.on('timeupdate', () => {
                if (Math.abs(bp_dplayer.video.currentTime - bp_dplayer_2.video.currentTime) > 1) {
                    bp_dplayer_2.pause()
                    bp_dplayer_2.seek(bp_dplayer.video.currentTime)
                }
                !bp_dplayer.paused && bp_dplayer_2.play()
            })
            bp_dplayer.on('seeking', () => {
                bp_dplayer_2.pause()
                bp_dplayer_2.seek(bp_dplayer.video.currentTime)
            })
            bp_dplayer.on('waiting', () => {
                bp_dplayer_2.pause()
                bp_dplayer_2.seek(bp_dplayer.video.currentTime)
            })
            bp_dplayer.on('pause', () => {
                bp_dplayer_2.pause()
                bp_dplayer_2.seek(bp_dplayer.video.currentTime)
            })
            bp_dplayer.on('suspend', () => {
                bp_dplayer_2.speed(bp_dplayer.video.playbackRate)
            })
            bp_dplayer.on('volumechange', () => {
                bp_dplayer_2.volume(bp_dplayer.video.volume)
                bp_dplayer_2.video.muted = bp_dplayer.video.muted
            })
        }
    }
    // 默认请求字幕
    api.get_subtitle_url(0, dplayer_init)
}

function bili_video_tag() {
    if (!!$('bwp-video')[0]) {
        return 'bwp-video'
    } else if (!!$('video[class!="dplayer-video dplayer-video-current"]')[0]) {
        return 'video[class!="dplayer-video dplayer-video-current"]'
    }
}

function bili_video_stop() { // listener
    const bili_video = $(bili_video_tag())[0]
    if (bili_video) {
        bili_video.pause()
        bili_video.currentTime = 0
    }
}

function recover_player() {
    if (window.bp_dplayer) {
        const bili_video = $(bili_video_tag())[0]
        !!bili_video && bili_video.removeEventListener('play', bili_video_stop, false)
        window.bp_dplayer.destroy()
        window.bp_dplayer = null
        $('#bp_dplayer').remove()
        if (window.bp_dplayer_2) {
            window.bp_dplayer_2.destroy()
            window.bp_dplayer_2 = null
            $('#bp_dplayer_2').remove()
        }
        $(get_bili_player_id()).show()
    }
}

// DPlayer 弹幕设置
function danmaku_config() {
    const style = '' +
        `<style id="dplayer_danmaku_style">
        .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
            animation-duration: ${parseFloat(config.danmaku_speed)}s;
            font-size: ${parseInt(config.danmaku_fontsize)}px;
        }
        </style>`
    if (!!$('#dplayer_danmaku_style')[0]) {
        $('#dplayer_danmaku_style').remove()
    }
    $('body').append(style)
}

export const player = {
    bili_video_tag,
    recover_player,
    replace_player,
    danmaku: {
        config: danmaku_config
    }
}
