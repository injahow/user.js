import { config, videoQualityMap } from '../ui/config'
import { Message, MessageBox } from '../ui/message'
import { ajax } from './ajax'
import { api } from './api'
import { video } from './video'
import { JSZip } from './runtime-lib'
import { ffmpeg } from './ffmpeg'
import { downloadBlob, downloadBlobURL, prettyBytes } from './common'

function rpc_type() {
    if (config.rpc_domain.startsWith('https://') || config.rpc_domain.match(/localhost|127\.0\.0\.1/)) {
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
            </div></label><hr>`
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
            <span style="color:rgba(0,0,0,1);">
                <input type="checkbox" id="dl_video" name="dl_option" checked="checked">
                <label for="dl_video">视频</label>
            </span>
            <span style="color:rgba(0,0,0,1);">
                <input type="checkbox" id="dl_audio" name="dl_option" checked="checked">
                <label for="dl_audio">音频</label>
            </span>
            <span style="color:rgba(0,0,0,0.5);">
                <input type="checkbox" id="dl_subtitle" name="dl_option">
                <label for="dl_subtitle">字幕</label>
            </span>
            <span style="color:rgba(0,0,0,0.5);">
                <input type="checkbox" id="dl_danmaku" name="dl_option">
                <label for="dl_danmaku">弹幕</label>
            </span><br/>
            <small>提示：下载音频需要修改视频格式为DASH</small>
        </div>
        <div style="margin:2% 0;">
            <label>保存目录:</label>
            <input id="dl_rpc_dir" placeholder="${(rpc_type() === 'post' ? config.rpc_dir : config.ariang_dir) || '为空使用默认目录'}" style="width:80%;"/>
        </div>
        <b>
            <span style="color:red;">为避免请求被拦截，设置了延时且不支持下载无法播放的视频；请勿频繁下载过多视频，可能触发风控导致不可再下载！</span>
        </b><br />
        <div style="height:240px;width:100%;overflow:auto;background:rgba(0,0,0,0.1);">
            ${video_html}
        </div>
        <div style="margin:2% 0;">
            <button id="checkbox_btn">全选</button>
        </div>`

    MessageBox.confirm(msg, () => {
        // 获取参数
        const [dl_video, dl_audio, dl_subtitle, dl_danmaku, dl_format, dl_quality, dl_rpc_dir] = [
            $('#dl_video').is(':checked'),
            $('#dl_audio').is(':checked'),
            $('#dl_subtitle').is(':checked'),
            $('#dl_danmaku').is(':checked'),
            $('#dl_format').val(),
            $('#dl_quality').val() || q,
            $('#dl_rpc_dir').val()
        ]
        // video_tasks
        const video_tasks = []
        for (let i = 0; i < total; i++) {
            if (!$(`input#option_${i}`).is(':checked')) {
                continue
            }
            const p = i + 1
            video_tasks.push({
                cid: vb.cid(p),
                p: p,
                q: dl_quality,
                format: dl_format,
                filename: vb.filename(p),
                dl_video,
                dl_audio,
                rpc_dir: dl_rpc_dir
            })
        }

        if (dl_video || dl_audio) {
            // 1.下载视频或音频
            download_videos([...video_tasks])
        }

        if (dl_subtitle) {
            // 2.下载字幕
            if (video_tasks.length === 1) {
                download_subtitle_vtt(video_tasks[0].p, video_tasks[0].filename)
            } else {
                download_subtitle_vtt_zip([...video_tasks], new JSZip())
            }
        }

        if (dl_danmaku) {
            // 3.下载弹幕
            if (video_tasks.length === 1) {
                download_danmaku_ass(video_tasks[0].cid, video_tasks[0].filename)
            } else {
                download_danmaku_ass_zip([...video_tasks], new JSZip())
            }
        }
    })

    // 处理默认值
    $('#dl_format').val(config.format)
    $('#dl_quality').val(q)
    const dl_format_change_evt = (format) => {
        if (format === 'dash') {
            $('#dl_audio').prop('checked', true).parent().css('color', 'rgba(0,0,0,1)')
            $('#dl_audio').prop('disabled', false)
        } else {
            $('#dl_audio').prop('checked', false).parent().css('color', 'rgba(0,0,0,0.5)')
            $('#dl_audio').prop('disabled', true)
        }
    }
    dl_format_change_evt(config.format)

    // 绑定操作事件
    $('body').on('change', '#dl_format', function () {
        const format = $(this).val()
        dl_format_change_evt(format)
    })

    // 处理input颜色
    $('body').on('click', 'input[name="dl_option"]', function () {
        if ($(this).is(':checked')) {
            $(this).parent().css('color', 'rgba(0,0,0,1)')
        } else {
            $(this).parent().css('color', 'rgba(0,0,0,0.5)')
        }
    })
}

/**
 * rpc
 */
function download_videos_rpc(videos, rpc_type) {
    if (rpc_type === 'post') {
        download_rpc_post_all(videos)
    } else if (rpc_type === 'ariang') {
        download_rpc_ariang(...videos)
    } else {
        console.error('未知RPC类型: ' + rpc_type)
    }
}

/**
 * 批量下载视频或音频，递归请求
 * 注意：rpc_type() 在下载过程中可能变化
 * @param {Array<Object>} video_tasks - 视频任务列表，每个任务包含视频参数（如 p, q, format, filename, rpc_dir, dl_video, dl_audio）
 * @param {number} [i=0] - 当前处理的视频任务索引，递归时递增
 * @param {Array<Object>} [videos=[]] - 已收集待下载的视频/音频信息
 * @returns
 */
function download_videos(video_tasks, i = 0, videos = []) {

    if (!video_tasks.length) {
        return
    }

    if (i >= video_tasks.length) {
        // 兜底处理，确认任务已清空
        const type = rpc_type()
        if (type === 'post') {
            if (videos.length > 0) {
                download_rpc_post_all(videos)
                videos.length = 0
            }
        } else if (type === 'ariang') {
            // 中途修改rpc_type时，可能出现遗漏
            if (videos.length > 0) {
                download_rpc_ariang(...videos)
                videos.length = 0
            }
        }
        MessageBox.alert('视频地址请求完成！')
        return
    }

    const task = video_tasks[i]
    const msg = `第${i + 1}（${i + 1}/${video_tasks.length}）个视频`
    MessageBox.alert(`${msg}：获取中...`)

    const success = res => {

        setTimeout(() => {
            download_videos(video_tasks, i + 1, videos)
        }, 4000)

        if (res.code) {
            return
        }

        Message.success('请求成功' + (res.times ? `<br/>今日剩余请求次数${res.times}` : ''))
        MessageBox.alert(`${msg}：获取成功！`)

        const [url, type, video_url, audio_url] = [
            res.url,
            rpc_type(),
            res.video,
            res.audio
        ]

        if (task.format === 'dash') { // 处理dash
            if (task.dl_video) {
                videos.push({
                    url: video_url,
                    filename: task.filename + format(video_url),
                    rpc_dir: task.rpc_dir
                })
            }
            if (task.dl_audio) {
                videos.push({
                    url: audio_url,
                    filename: task.filename + '.m4a',
                    rpc_dir: task.rpc_dir
                })
            }
        } else {
            videos.push({
                url: url,
                filename: task.filename + format(url),
                rpc_dir: task.rpc_dir
            })
        }

        if (type === 'post') {
            if (videos.length > 3) {
                download_videos_rpc(videos, type)
                videos.length = 0
            }
        } else if (type === 'ariang') {
            download_videos_rpc(videos, type)
            videos.length = 0
        }
    }

    const error = () => {
        download_videos(video_tasks, i + 1, videos)
    }

    api.get_urls(task.p, task.q, task.format, success, error)
}

function get_rpc_post(data) { // [...{ url, filename, rpc_dir }]
    if (!(data instanceof Array)) {
        data = data instanceof Object ? [data] : []
    }
    const rpc = {
        domain: config.rpc_domain,
        port: config.rpc_port,
        path: config.rpc_path || '/jsonrpc',
        token: config.rpc_token,
        dir: config.rpc_dir
    }

    return {
        url: `${rpc.domain}:${rpc.port}${rpc.path}`,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data.map(({ url, filename, rpc_dir }) => {

            const param = {
                out: filename,
                header: [
                    `User-Agent: ${window.navigator.userAgent}`,
                    `Referer: ${window.location.href}`
                ]
            }

            if (rpc_dir || rpc.dir) {
                param.dir = rpc_dir || rpc.dir
            }

            return {
                id: window.btoa(`BParse_${Date.now()}_${Math.random()}`),
                jsonrpc: '2.0',
                method: 'aria2.addUri',
                params: [`token:${rpc.token}`, [url], param]
            }
        }))
    }
}

function download_rpc(url, filename, rpc_dir, type = 'post') {
    if (type === 'post') {
        download_rpc_post({ url, filename, rpc_dir })
    } else if (type === 'ariang') {
        download_rpc_ariang({ url, filename, rpc_dir })
    }
}

let download_rpc_clicked = false

function download_rpc_post(video) {
    download_rpc_post_all([video])
}

function download_rpc_post_all(videos) {
    if (download_rpc_clicked) {
        Message.miaow()
        return
    }
    download_rpc_clicked = true
    const data = [...videos]
    ajax(get_rpc_post(data)).then(res => {
        if (res.length === data.length) {
            Message.success('RPC请求成功')
        } else {
            Message.warning('请检查RPC参数')
        }
    }).catch(() => {
        Message.error('请检查RPC服务配置')
    }).finally(() => download_rpc_clicked = false)
    Message.info('发送RPC下载请求')
}

/**
 * AriaNg
 */
function get_ariang_set_hash(rpc) {
    return rpc
        ? `#!/settings/rpc/set/${rpc.domain.replace('://', '/')}/${rpc.port}${rpc.path}/${window.btoa(rpc.token)}`
        : ''
}

function open_ariang(rpc) {
    const hash_tag = rpc ? get_ariang_set_hash(rpc) : ''
    const url = config.ariang_host + hash_tag
    const a = document.createElement('a')
    a.style.display = 'none'
    a.onclick = () => {
        window.bp_aria2_window = window.open(url)
    }
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    return window.bp_aria2_window
}

function download_rpc_ariang_send(video) {
    const bp_aria2_window = window.bp_aria2_window
    let time = 100
    if (!bp_aria2_window || bp_aria2_window.closed) {
        open_ariang()
        time = 3000
    }
    setTimeout(() => {
        const bp_aria2_window = window.bp_aria2_window
        const cmd = [
            `url=${encodeURIComponent(window.btoa(video.url))}`,
            `out=${encodeURIComponent(video.filename)}`,
            `header=User-Agent:${window.navigator.userAgent}`,
            `header=Referer:${window.location.origin}`
        ]
        // issues#94
        if (video.rpc_dir || config.ariang_dir) {
            cmd.push(`dir=${encodeURIComponent(video.rpc_dir || config.ariang_dir)}`)
        }
        const task_hash = '#!/new/task?' + cmd.join('&')
        if (bp_aria2_window && !bp_aria2_window.closed) {
            bp_aria2_window.location.href = config.ariang_host + task_hash
            Message.success('发送RPC请求')
        } else {
            Message.warning('AriaNg页面未打开')
        }

    }, time)
}

function download_rpc_ariang(...videos) { // video: { url, filename, rpc_dir }
    if (videos.length == 0) {
        return
    }

    if (videos.length == 1 && videos[0] instanceof Array) {
        download_rpc_ariang(...videos[0])
        return
    }

    download_rpc_ariang_send(videos.pop())
    setTimeout(() => {
        download_rpc_ariang(...videos)
    }, 100)
}

/**
 * blob
 */
let download_blob_clicked = false, need_show_progress = true

function show_progress({ total, loaded, percent }) {
    if (need_show_progress) {
        MessageBox.alert(`文件大小：${prettyBytes(total)}(${total}Byte)<br/>` +
            `已经下载：${prettyBytes(loaded)}(${loaded}Byte)<br/>` +
            `当前进度：${percent}%<br/>下载中请勿操作浏览器，刷新或离开页面会导致下载取消！<br/>再次点击下载按钮可查看下载进度。`, () => {
                need_show_progress = false
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
            downloadBlobURL(blob_url, filename)
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
    xhr.onerror = function () {
        Message.error('下载失败')
        download_blob_clicked = false
    }
    xhr.send()
    download_blob_clicked = true // locked
    Message.info('准备开始下载')
}

/**
 * blob_merge
 */
let download_blob_merge_clicked = false, need_show_merge_progress = true

function download_blob_merge(video_url, audio_url, filename) {

    if (download_blob_merge_clicked) {
        Message.miaow()
        need_show_merge_progress = true
        return
    }

    download_blob_merge_clicked = true
    need_show_merge_progress = true
    const controller = new AbortController()
    function show_merge_progress({ message, loaded, total, isFinished }) {
        if (need_show_merge_progress) {
            const content = `
                ${message}</br>
                ${loaded && total && `
                下载进度: ${Math.round(loaded / total * 100)}% </br>
                文件大小：${prettyBytes(total)} <br/>
                已经下载：${prettyBytes(loaded)}` || ''}
                请勿操作浏览器，刷新或离开页面会导致下载取消！
            `
            MessageBox.confirm(content, () => {
                need_show_merge_progress = false
            }, () => {
                controller.abort()
            })
        }
        if (isFinished) {
            MessageBox.alert('下载完成，请等待浏览器保存！')
            download_blob_merge_clicked = false
        }
    }

    Message.info('准备开始下载')
    ffmpeg.mergeVideoAndAudio(video_url, audio_url, {
        showProgress: show_merge_progress,
        controller
    }).then((mergedBlob) => {
        if (!mergedBlob || mergedBlob.size === 0) {
            Message.error('合并视频失败')
            return
        }
        show_merge_progress({
            isFinished: true
        })
        downloadBlob(mergedBlob, filename)
    }).catch((error) => {
        console.error(error)
        if (error.name === 'AbortError') {
            Message.warning('已取消下载')
            return
        }
        if (!controller.signal.aborted) {
            controller.abort()
        }
        Message.error('合并下载失败')
    }).finally(() => {
        download_blob_merge_clicked = false
    })

}

/**
 * danmaku & subtitle
 */
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
            }).get().sort((a, b) => a.time - b.time)
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
                downloadBlob(new Blob([data], { type: 'text/ass' }), title + '.ass')
            } else if (return_type === 'callback' && callback) {
                callback(data)
            }
        }
    }).catch(() => {
        if (return_type === 'callback' && callback) {
            callback()
        }
    })
}

function download_danmaku_ass(cid, title) {
    _download_danmaku_ass(cid, title, 'file')
}

function download_subtitle_vtt(p = 0, filename) {
    const download_subtitle = blob_url => {
        if (!blob_url) {
            Message.warning('未发现字幕')
            return
        }
        downloadBlobURL(blob_url, filename + '.vtt')
    }
    api.get_subtitle_url(p, download_subtitle)
}

function download_blob_zip(blob_data, filename) {
    if (!blob_data) return
    downloadBlob(blob_data, filename + '.zip')
}

/**
 * 批量下载弹幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_danmaku_ass_zip(videos, zip) {
    if (!videos) return
    if (videos.length === 0) {
        if (Object.keys(zip.files).length === 0) {
            Message.warning('未发现弹幕')
            return
        }
        zip.generateAsync({ type: 'blob' }).then(data => download_blob_zip(data, video.base().getFilename() + '_ass'))
        return
    }
    const { cid, filename } = videos.pop()
    _download_danmaku_ass(cid, filename, 'callback', data => {
        if (data) {
            zip.file(filename + '.ass', data)
        }
        setTimeout(() => {
            download_danmaku_ass_zip(videos, zip)
        }, 1000)
    })
}

/**
 * 批量下载字幕
 * @param {Array} videos
 * @param {JSZip} zip
 * @returns
 */
function download_subtitle_vtt_zip(videos, zip) {
    if (!videos) return
    if (videos.length === 0) {
        if (Object.keys(zip.files).length === 0) {
            Message.warning('未发现字幕')
            return
        }
        zip.generateAsync({ type: 'blob' }).then(data => download_blob_zip(data, video.base().getFilename() + '_vtt'))
        return
    }
    const { p, filename } = videos.pop()
    api.get_subtitle_data(p, data => {
        if (data) {
            zip.file(filename + '.vtt', data)
        }
        setTimeout(() => {
            download_subtitle_vtt_zip(videos, zip)
        }, 1000)
    })
}

function format(url) {
    if (!url) return ''
    if (url.match('.mp4|.m4s')) {
        return '.mp4'
    } else if (url.match('.flv')) {
        return '.flv'
    }
    return '.mp4'
}

function download(url, filename, type) {
    filename = filename.replace(/[\/\\*|]+/g, '-')
        .replace(/:/g, '：')
        .replace(/\?/g, '？')
        .replace(/"/g, '\'')
        .replace(/</g, '《')
        .replace(/>/g, '》')
    if (type === 'blob') {
        download_blob(url, filename)
    } else if (type === 'rpc') {
        download_rpc(url, filename, null, rpc_type())
    }
}

export const Download = {
    url_format: format,
    download,
    download_blob_merge,
    download_all,
    download_danmaku_ass,
    download_subtitle_vtt,
    open_ariang,
    get_ariang_set_hash
}
