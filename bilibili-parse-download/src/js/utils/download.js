import { config, videoQualityMap } from '../ui/config'
import { Message, MessageBox } from '../ui/message'
import { ajax } from './ajax'
import { api } from './api'
import { video } from './video'
import { JSZip } from './runtime-lib'

function rpc_type() {
    if (config.rpc_domain.match('https://') || config.rpc_domain.match(/localhost|127\.0\.0\.1/)) {
        return 'post'
    } else {
        return 'ariang'
    }
}

function download_all() {

    const vb = video.base()
    const [q, total] = [
        video.get_quality().q,
        vb.total()
    ]

    $('body').on('click', 'input[name="option_video"]', function (event) {
        if ($(this).is(':checked')) {
            $(this).parent().css('color', 'rgba(0,0,0,1)')
        } else {
            $(this).parent().css('color', 'rgba(0,0,0,0.5)')
        }
        function get_option_index(element) {
            return element && parseInt(element.id.split('_')[1]) || 0
        }
        if (event.ctrlKey || event.altKey) {
            // 记录当前点击option的index
            const current_select_option_index = get_option_index(event.target)
            // 获取所有复选框
            const option_videos = [...document.getElementsByName('option_video')]
            if (event.target.checked) { // checked = true: 选中`上一个被选中`到`这次被选中`的所有option
                const previous_selected_option_index = get_option_index(option_videos.filter(e => e.checked && get_option_index(e) < current_select_option_index).slice(-1)[0])
                for (let i = previous_selected_option_index; i < current_select_option_index; i++) {
                    option_videos[i].checked = true
                    option_videos[i].parentNode.style.color = 'rgba(0,0,0,1)'
                }
            } else { //checked = false，取消选中`上一个未被选中`到`这次被取消选中`的所有option
                const previous_not_selected_option_index = get_option_index(option_videos.filter(e => !e.checked && get_option_index(e) < current_select_option_index).slice(-1)[0])
                for (let i = previous_not_selected_option_index; i < current_select_option_index; i++) {
                    option_videos[i].checked = false
                    option_videos[i].parentNode.style.color = 'rgba(0,0,0,0.5)'
                }
            }
        }
    })

    let video_html = ''
    for (let i = 0; i < total; i++) {
        video_html += '' +
            `<label for="option_${i}"><div style="color:rgba(0,0,0,0.5);">
                <input type="checkbox" id="option_${i}" name="option_video" value="${i}">
                P${i + 1} ${vb.title(i + 1)}
            </div></label>`
    }

    let all_checked = false
    $('body').on('click', 'button#checkbox_btn', () => {
        if (all_checked) {
            all_checked = false
            $('input[name="option_video"]').prop('checked', all_checked)
            $('input[name="option_video"]').parent().css('color', 'rgba(0,0,0,0.5)')
        } else {
            all_checked = true
            $('input[name="option_video"]').prop('checked', all_checked)
            $('input[name="option_video"]').parent().css('color', 'rgb(0,0,0)')
        }
    })

    const quality_support = video.get_quality_support()
    let option_support_html = ''
    for (const item of quality_support) {
        option_support_html += `<option value="${item}">${videoQualityMap[item]}</option>`
    }
    const msg = '' +
        `<div style="margin:2% 0;">
            <label>视频格式:</label>
            <select id="dl_format">
                <option value="mp4" selected>MP4</option>
                <option value="flv">FLV</option>
                <option value="dash">DASH</option>
            </select>
            &nbsp;&nbsp;无法设置MP4清晰度
        </div>
        <div style="margin:2% 0;">
            <label>视频质量:</label>
            <select id="dl_quality">
                ${option_support_html}
            </select>
        </div>
        <div style="margin:2% 0;">
            <label>下载选择:</label>
            <label style="color:rgba(0,0,0,1);">
                <input type="checkbox" id="dl_video" name="dl_option" checked="checked">
                <label for="dl_video" >视频</label>
            </label>
            <label style="color:rgba(0,0,0,0.5);">
                <input type="checkbox" id="dl_subtitle" name="dl_option">
                <label for="dl_subtitle">字幕</label>
            </label>
            <label style="color:rgba(0,0,0,0.5);">
                <input type="checkbox" id="dl_danmaku" name="dl_option">
                <label for="dl_danmaku">弹幕</label>
            </label>
        </div>
        <b>
            <span style="color:red;">为避免请求被拦截，设置了延时且不支持下载无法播放的视频；请勿频繁下载过多视频，可能触发风控导致不可再下载！</span>
        </b><br />
        <div style="height:220px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);">
            ${video_html}
        </div>
        <div>${video.type() === 'medialist' ? '不支持多页视频，若需要请到视频原播放页面下载' : ''}</div>
        <div style="margin:2% 0;">
            <button id="checkbox_btn">全选</button>
        </div>`

    MessageBox.confirm(msg, () => {
        // 获取参数
        const [dl_video, dl_subtitle, dl_danmaku, dl_format, dl_quality, videos] = [
            $('#dl_video').is(':checked'),
            $('#dl_subtitle').is(':checked'),
            $('#dl_danmaku').is(':checked'),
            $('#dl_format').val(),
            $('#dl_quality').val() || q,
            []
        ]
        for (let i = 0; i < total; i++) {
            if (!$(`input#option_${i}`).is(':checked')) {
                continue
            }
            const p = i + 1
            const [cid, filename] = [
                vb.cid(p),
                vb.filename(p)
            ]
            videos.push({
                cid: cid,
                p: p,
                q: dl_quality,
                format: dl_format,
                filename: filename
            })
        }

        if (dl_video) {
            // 下载视频
            download_videos(videos, 0, [])
        }

        if (dl_subtitle) {
            // 下载字幕
            if (videos.length === 1) {
                download_subtitle_vtt(videos[0].p, videos[0].filename)
            } else {
                download_subtitle_vtt_zip([...videos], new JSZip())
            }
        }
        if (dl_danmaku) {
            // 下载弹幕
            if (videos.length === 1) {
                download_danmaku_ass(videos[0].cid, videos[0].filename)
            } else {
                download_danmaku_ass_zip([...videos], new JSZip())
            }
        }

    })

    // 处理被隐藏的input
    $('body').on('click', 'input[name="dl_option"]', function () {
        if ($(this).is(':checked')) {
            $(this).parent().css('color', 'rgba(0,0,0,1)')
        } else {
            $(this).parent().css('color', 'rgba(0,0,0,0.5)')
        }
    })

    // 初始化参数，去除8k及以上
    $('#dl_quality').val(q > 120 ? 80 : q)

    function download_videos(videos, i, video_urls) {
        // 单线递归处理，请求下载同时进行
        if (videos.length) {
            if (i < videos.length) {
                const video = videos[i]
                const msg = `第${i + 1}（${i + 1}/${videos.length}）个视频`
                MessageBox.alert(`${msg}：获取中...`)

                setTimeout(() => {

                    const success = res => {
                        if (!res.code) {
                            Message.success('请求成功' + (res.times ? `<br/>今日剩余请求次数${res.times}` : ''))
                            MessageBox.alert(`${msg}：获取成功！`)

                            const [url, type, video_url, audio_url] = [
                                res.url,
                                rpc_type(),
                                res.video,
                                res.audio
                            ]

                            if (type === 'post') {

                                if (video.format === 'dash') { // 处理dash
                                    video_urls.push({
                                        url: video_url,
                                        filename: video.filename + '_video' + format(video_url)
                                    })
                                    video_urls.push({
                                        url: audio_url,
                                        filename: video.filename + '_audio' + format(video_url)
                                    })
                                } else {
                                    video_urls.push({
                                        url: url,
                                        filename: video.filename + format(url)
                                    })
                                }

                                if (video_urls.length > 3) {
                                    download_rpc_all(video_urls)
                                    video_urls.length = 0
                                }
                            } else if (type === 'ariang') {

                                if (video.format === 'dash') { // 处理dash
                                    download_rpc_ariang_one({
                                        url: video_url,
                                        filename: video.filename + '_video' + format(video_url)
                                    })
                                    download_rpc_ariang_one({
                                        url: audio_url,
                                        filename: video.filename + '_audio' + format(video_url)
                                    })
                                } else {
                                    download_rpc_ariang_one({
                                        url: url,
                                        filename: video.filename + format(url)
                                    })
                                }
                            }
                        }

                        setTimeout(() => {
                            download_videos(videos, ++i, video_urls)
                        }, 3000)
                    }
                    const error = () => {
                        download_videos(videos, ++i, video_urls)
                    }
                    api.get_urls(video.p, video.q, video.format, success, error)

                }, 3000)

            } else {

                MessageBox.alert('视频地址请求完成！')
                if (rpc_type() === 'post') {
                    if (video_urls.length > 0) {
                        download_rpc_all(video_urls)
                        video_urls.length = 0
                    }
                }
                // one by one -> null
            }
        }
    }

    function download_rpc_all(video_urls) {
        const rpc = {
            domain: config.rpc_domain,
            port: config.rpc_port,
            token: config.rpc_token,
            dir: config.rpc_dir
        }
        const json_rpc = []
        for (const video of video_urls) {
            json_rpc.push({
                id: window.btoa(`BParse_${Date.now()}_${Math.random()}`),
                jsonrpc: '2.0',
                method: 'aria2.addUri',
                params: [`token:${rpc.token}`, [video.url], {
                    dir: rpc.dir,
                    out: video.filename,
                    header: [
                        `User-Agent: ${window.navigator.userAgent}`,
                        `Referer: ${window.location.href}`
                    ]
                }]
            })
        }
        Message.info('发送RPC下载请求')
        ajax({
            url: `${rpc.domain}:${rpc.port}/jsonrpc`,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(json_rpc),
        }).then(res => {
            if (res.length === json_rpc.length) {
                Message.success('RPC请求成功')
            } else {
                Message.warning('请检查RPC参数')
            }
        }).catch(_ => {
            Message.error('请检查RPC服务配置')
        })
    }
}

function download_rpc_ariang_one(video) {
    const bp_aria2_window = window.bp_aria2_window
    let time = 100
    if (!bp_aria2_window || bp_aria2_window.closed) {
        open_ariang()
        time = 3000
    }
    setTimeout(() => {
        const bp_aria2_window = window.bp_aria2_window
        const aria2_header = `header=User-Agent:${window.navigator.userAgent}&header=Referer:${window.location.href}`
        if (bp_aria2_window && !bp_aria2_window.closed) {
            const task_hash = `#!/new/task?url=${window.btoa(video.url)}&out=${encodeURIComponent(video.filename)}&${aria2_header}`
            bp_aria2_window.location.href = config.ariang_host + task_hash
            Message.success('RPC请求成功')
        } else {
            Message.warning('请检查RPC参数')
        }
    }, time)
}

let download_rpc_clicked = false

function download_rpc(url, filename, type = 'post') {
    if (download_rpc_clicked) {
        Message.miaow()
        return
    }
    download_rpc_clicked = true
    const rpc = {
        domain: config.rpc_domain,
        port: config.rpc_port,
        token: config.rpc_token,
        dir: config.rpc_dir
    }
    const json_rpc = {
        id: window.btoa(`BParse_${Date.now()}_${Math.random()}`),
        jsonrpc: '2.0',
        method: 'aria2.addUri',
        params: [`token:${rpc.token}`, [url], {
            dir: rpc.dir,
            out: filename,
            header: [
                `User-Agent: ${window.navigator.userAgent}`,
                `Referer: ${window.location.href}`
            ]
        }]
    }
    Message.info('发送RPC下载请求')
    if (type === 'post') {
        ajax({
            url: `${rpc.domain}:${rpc.port}/jsonrpc`,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(json_rpc),
        }).then(res => {
            if (res.result) {
                Message.success('RPC请求成功')
            } else {
                Message.warning('请检查RPC参数')
            }
        }).catch(_ => {
            Message.error('请检查RPC服务配置')
        }).finally(_ => download_rpc_clicked = false)

    } else if (type === 'ariang') {
        const bp_aria2_window = window.bp_aria2_window
        let time = 100
        if (!bp_aria2_window || bp_aria2_window.closed) {
            open_ariang()
            time = 3000
        }
        setTimeout(() => {
            const bp_aria2_window = window.bp_aria2_window
            const aria2_header = `header=User-Agent:${window.navigator.userAgent}&header=Referer:${window.location.href}`
            const task_hash = `#!/new/task?url=${window.btoa(url)}&out=${encodeURIComponent(filename)}&${aria2_header}`
            if (bp_aria2_window && !bp_aria2_window.closed) {
                bp_aria2_window.location.href = config.ariang_host + task_hash
                Message.success('RPC请求发送成功')
            } else {
                Message.warning('AriaNG页面未打开')
            }
            download_rpc_clicked = false
        }, time)
    }
}

function open_ariang(rpc) {
    const hash_tag = rpc
        ? `#!/settings/rpc/set/${rpc.domain.replace('://', '/')}/${rpc.port}/jsonrpc/${window.btoa(rpc.token)}`
        : ''
    const url = config.ariang_host + hash_tag
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.setAttribute('onclick', `window.bp_aria2_window=window.open('${url}');`)
    a.click()
}

let download_blob_clicked = false, need_show_progress = true

function show_progress({ total, loaded, percent }) {
    if (need_show_progress) {
        MessageBox.alert(`文件大小：${Math.floor(total / (1024 * 1024))}MB(${total}Byte)<br/>` +
            `已经下载：${Math.floor(loaded / (1024 * 1024))}MB(${loaded}Byte)<br/>` +
            `当前进度：${percent}%<br/>下载中请勿操作浏览器！`, () => {
                need_show_progress = false
                MessageBox.alert('注意：刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。')
            })
    }
    if (total === loaded) {
        MessageBox.alert('下载完成，请等待浏览器保存！')
        download_blob_clicked = false
    }
}

function download_blob(url, filename) {
    if (download_blob_clicked) {
        Message.miaow()
        need_show_progress = true
        return
    }
    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.responseType = 'blob'
    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            if ('msSaveOrOpenBlob' in navigator) {
                navigator.msSaveOrOpenBlob(this.response, filename)
                return
            }
            const blob_url = URL.createObjectURL(this.response)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = blob_url
            a.download = filename
            a.click()
            URL.revokeObjectURL(blob_url)
        }
    }
    need_show_progress = true
    xhr.onprogress = function (evt) {
        if (this.state != 4) {
            const loaded = evt.loaded
            const tot = evt.total
            show_progress({
                total: tot,
                loaded: loaded,
                percent: Math.floor(100 * loaded / tot)
            })
        }
    }
    xhr.send()
    download_blob_clicked = true // locked
    Message.info('准备开始下载')
}

function _download_danmaku_ass(cid, title, return_type = null, callback = null) { // todo: 暂时使用随机弹幕
    ajax({
        url: `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`,
        dataType: 'text'
    }).then(result => {
        const result_dom = $(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''))
        if (!result_dom || !result_dom.find('d')[0]) {
            if (return_type === 'callback' && callback) {
                callback()
                return
            }
            Message.warning('未发现弹幕')
            return
        } else {
            // 1.json
            const danmaku_data = result_dom.find('d').map((i, el) => {
                const item = $(el)
                const p = item.attr('p').split(',')
                let type = 0
                if (p[1] === '4') {
                    type = 2
                } else if (p[1] === '5') {
                    type = 1
                }
                return [{ time: parseFloat(p[0]), type: type, color: parseInt(p[3]), text: item.text() }]
            }).get()
            danmaku_data.sort((a, b) => a.time - b.time)
            // 2.dialogue
            const dialogue = (danmaku, scroll_id, fix_id) => {
                const encode = text => text.replace(/\{/g, '｛').replace(/\}/g, '｝').replace(/\r|\n/g, '')
                const colorCommand = color => {
                    const [r, g, b] = [(color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff]
                    return `\\c&H${((b << 16) | (g << 8) | r).toString(16)}&`
                }
                //const borderColorCommand = color => `\\3c&H${color.toString(16)}&`
                const isWhite = color => color === 16777215
                const scrollCommand = (top, left_a, left_b) => `\\move(${left_a},${top},${left_b},${top})`
                const fixCommand = (top, left) => `\\pos(${left},${top})`
                const [scrollTime, fixTime] = [8, 4]
                const { text, time } = danmaku
                const commands = [
                    danmaku.type === 0 ? scrollCommand(50 * (1 + Math.floor(Math.random() * 15)), 1920 + 50 * danmaku.text.length / 2, 0 - 50 * danmaku.text.length / 2) : fixCommand(50 * (1 + fix_id % 15), 960),
                    isWhite(danmaku.color) ? '' : colorCommand(danmaku.color)
                    //isWhite(danmaku.color) ? '' : borderColorCommand(danmaku.color)
                ]
                const formatTime = seconds => {
                    const div = (i, j) => Math.floor(i / j)
                    const pad = n => (n < 10 ? '0' + n : '' + n)
                    const integer = Math.floor(seconds)
                    const hour = div(integer, 60 * 60)
                    const minute = div(integer, 60) % 60
                    const second = integer % 60
                    const minorSecond = Math.floor((seconds - integer) * 100) // 取小数部分2位
                    return `${hour}:${pad(minute)}:${pad(second)}.${minorSecond}`
                }
                const fields = [
                    0, // Layer,
                    formatTime(time), // Start
                    formatTime(time + (danmaku.type === 0 ? scrollTime : fixTime)), // End
                    'Medium', // Style
                    '', // Name
                    '0', // MarginL
                    '0', // MarginR
                    '0', // MarginV
                    '', // Effect
                    '{' + commands.join('') + '}' + encode(text) // Text
                ]
                return 'Dialogue: ' + fields.join(',')
            }
            // todo 3. make
            const content = [
                '[Script Info]',
                '; Script generated by injahow/user.js',
                '; https://github.com/injahow/user.js',
                `Title: ${title}`,
                'ScriptType: v4.00+',
                `PlayResX: ${1920}`,
                `PlayResY: ${1080}`,
                'Timer: 10.0000',
                'WrapStyle: 2',
                'ScaledBorderAndShadow: no',
                '',
                '[V4+ Styles]',
                'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
                'Style: Small,微软雅黑,36,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0',
                'Style: Medium,微软雅黑,52,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0',
                'Style: Large,微软雅黑,64,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0',
                'Style: Larger,微软雅黑,72,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0',
                'Style: ExtraLarge,微软雅黑,90,&H66FFFFFF,&H66FFFFFF,&H66000000,&H66000000,0,0,0,0,100,100,0,0,1,1.2,0,5,0,0,0,0',
                '',
                '[Events]',
                'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
            ]
            let scroll_id = 0, fix_id = 0
            for (const danmaku of danmaku_data) {
                if (danmaku.type === 0) {
                    scroll_id++
                } else {
                    fix_id++
                }
                content.push(dialogue(danmaku, scroll_id, fix_id))
            }
            // 4.ass & return
            const data = content.join('\n')
            if (return_type === null || return_type === 'file') {
                const blob_url = URL.createObjectURL(new Blob([data], { type: 'text/ass' }))
                const a = document.createElement('a')
                a.style.display = 'none'
                a.href = blob_url
                a.download = title + '.ass'
                a.click()
                URL.revokeObjectURL(blob_url)
            } else if (return_type === 'callback' && callback) {
                callback(data)
            }
        }
    }).catch(_ => {
        if (return_type === 'callback' && callback) {
            callback()
        }
    })
}

function download_danmaku_ass(cid, title) {
    _download_danmaku_ass(cid, title, 'file')
}

function download_subtitle_vtt(p = 0, file_name) {
    const download_subtitle = blob_url => {
        if (!blob_url) {
            Message.warning('未发现字幕')
            return
        }
        const a = document.createElement('a')
        a.setAttribute('target', '_blank')
        a.setAttribute('href', blob_url)
        a.setAttribute('download', file_name + '.vtt')
        a.click()
        URL.revokeObjectURL(blob_url)
    }
    api.get_subtitle_url(p, download_subtitle)
}

function download_blob_zip(blob_data, filename) {
    if (!blob_data) return
    const blob_url = URL.createObjectURL(blob_data)
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.setAttribute('href', blob_url)
    a.setAttribute('download', filename + '.zip')
    a.click()
    URL.revokeObjectURL(blob_url)
}

/**
 * 批量下载弹幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_danmaku_ass_zip(videos, zip) { // 异步递归
    if (!videos) return
    if (videos.length === 0) {
        if (Object.keys(zip.files).length === 0) {
            Message.warning('未发现弹幕')
            return
        }
        zip.generateAsync({ type: 'blob' }).then(data => download_blob_zip(data, video.base().name + '_ass'))
        return
    }
    const videos_pop = videos.pop()
    _download_danmaku_ass(videos_pop.cid, videos_pop.filename, 'callback', data => {
        if (data) {
            zip.file(videos_pop.filename + '.ass', data)
        }
        download_danmaku_ass_zip(videos, zip)
    })
}

/**
 * 批量下载字幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_subtitle_vtt_zip(videos, zip) { // 异步递归
    if (!videos) return
    if (videos.length === 0) {
        if (Object.keys(zip.files).length === 0) {
            Message.warning('未发现字幕')
            return
        }
        zip.generateAsync({ type: 'blob' }).then(data => download_blob_zip(data, video.base().name + '_vtt'))
        return
    }
    const videos_pop = videos.pop()
    api.get_subtitle_data(videos_pop.p, data => {
        if (data) {
            zip.file(videos_pop.filename + '.vtt', data)
        }
        download_subtitle_vtt_zip(videos, zip)
    })
}


function format(url) {
    if (!url) return ''
    if (url.match('.flv')) {
        return '.flv'
    } else if (url.match('.m4s')) {
        return '.mp4'
    } else if (url.match('.mp4')) {
        return '.mp4'
    }
    return '.mp4'
}

export const Download = {
    url_format: format,
    download: (url, name, type) => {
        name = name.replace(/[\/\\*|]+/g, '-')
            .replace(/:/g, '：')
            .replace(/\?/g, '？')
            .replace(/"/g, '\'')
            .replace(/</g, '《')
            .replace(/>/g, '》')
        const filename = name + format(url)
        if (type === 'blob') {
            download_blob(url, filename)
        } else if (type === 'rpc') {
            download_rpc(url, filename, rpc_type())
        }
    },
    download_all,
    download_danmaku_ass,
    download_subtitle_vtt,
    open_ariang
}
