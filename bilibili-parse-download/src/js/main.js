
import { auth } from './auth'
import { check } from './check'
import { store } from './store'
import { config, initConfig } from './ui/config'
import { initMessage, Message, MessageBox } from './ui/message'
import { scroll } from './ui/scroll'
import { initToolbar } from './ui/toolbar'
import { user } from './user'
import { api } from './utils/api'
import { Download } from './utils/download'
import { player } from './utils/player'
import { video } from './utils/video'

class Main {

    constructor() {
        /* global JS_VERSION GIT_HASH */
        console.log(`${'\n'} %c bilibili-parse-download.user.js v${JS_VERSION} ${GIT_HASH} %c https://github.com/injahow/user.js ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
    }

    init() {

        initToolbar()

        const root_div = document.createElement('div')
        root_div.id = 'bp_root'
        document.body.append(root_div)
        // initConfig
        initConfig(`#${root_div.id}`)
        initMessage(`#${root_div.id}`)

        user.lazyInit()
        auth.checkLoginStatus()
        check.refresh()

        $(`#${root_div.id}`).append('<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/dplayer/1.25.0/DPlayer.min.css">') // for dom changed
        $(`#${root_div.id}`).append('<a id="video_url" style="display:none;" target="_blank" href="#"></a>')
        $(`#${root_div.id}`).append('<a id="video_url_2" style="display:none;" target="_blank" href="#"></a>')

    }

    run() {

        this.init()

        let api_url, api_url_temp
        const evt = {
            setting_btn() {
                user.lazyInit(true) // init
                // set form by config
                for (const key in config) {
                    $(`#${key}`).val(config[key])
                }
                //show setting
                $("#bp_config").show()
                $("#bp_config").animate({
                    'opacity': '1'
                }, 300)
                scroll.hide()
            },
            bilibili_parse() {
                user.lazyInit(true) // init
                const vb = video.base()
                const [type, aid, p, cid, epid] = [
                    vb.type(),
                    vb.aid(),
                    vb.p(),
                    vb.cid(),
                    vb.epid()
                ]
                const { q } = video.get_quality()
                api_url = `${config.base_api}?av=${aid}&p=${p}&cid=${cid}&ep=${epid}&q=${q}&type=${type}&format=${config.format}&otype=json&_host=${config.host_key}&_req=${config.request_type}&_q=${config.video_quality}`
                const [auth_id, auth_sec] = [
                    store.get('auth_id'),
                    store.get('auth_sec')
                ]
                if (config.auth === '1' && auth_id && auth_sec) {
                    api_url += `&auth_id=${auth_id}&auth_sec=${auth_sec}`
                }
                if (api_url === api_url_temp && config.request_type !== 'local') {
                    Message.miaow()
                    const url = $('#video_url').attr('href')
                    const url_2 = $('#video_url_2').attr('href')
                    if (url && url !== '#') {
                        $('#video_download').show()
                        config.format === 'dash' && $('#video_download_2').show()
                        if (user.needReplace() || vb.isLimited() || config.replace_force === '1') {
                            !$('#bp_dplayer')[0] && player.replace_player(url, url_2)
                        }
                        if (config.auto_download === '1') {
                            $('#video_download').click()
                        }
                    }
                    return
                }
                $('#video_url').attr('href', '#')
                $('#video_url_2').attr('href', '#')
                api_url_temp = api_url

                Message.info('开始请求')
                api.get_url(res => {
                    if (res && !res.code) {
                        Message.success('请求成功')
                        res.times && Message.info(`剩余请求次数：${res.times}`)

                        let url, url_2
                        if (res.url) {
                            url = res.url.replace('http://', 'https://')
                            url_2 = '#'
                        } else if (res.video && res.audio) {
                            url = res.video.replace('http://', 'https://')
                            url_2 = res.audio.replace('http://', 'https://')
                        } else {
                            Message.warning('数据错误')
                            return
                        }
                        $('#video_url').attr('href', url)
                        $('#video_url').attr('download', vb.filename() + Download.url_format(url))
                        $('#video_download').show()
                        if (url_2 !== '#') {
                            $('#video_url_2').attr('href', url_2)
                            $('#video_url_2').attr('download', vb.filename() + '_audio.mp4')
                            $('#video_download_2').show()
                        }

                        if (user.needReplace() || vb.isLimited() || config.replace_force === '1') {
                            player.replace_player(url, url_2)
                        }

                        if (config.auto_download === '1') {
                            $('#video_download').click()
                        }
                    }
                })
            },
            download_danmaku() {
                const vb = video.base()
                Download.download_danmaku_ass(vb.cid(), vb.filename())
            },
            download_subtitle() {
                Download.download_subtitle_vtt(0, video.base().filename())
            },
            video_download_all() {
                user.lazyInit(true) // init

                if (store.get('auth_id') && store.get('auth_sec')) {
                    if (config.download_type === 'rpc') {
                        Download.download_all()
                    } else {
                        MessageBox.confirm('仅支持使用RPC接口批量下载，请确保RPC环境正常，是否继续？', () => {
                            Download.download_all()
                        })
                    }
                } else {
                    MessageBox.confirm('批量下载仅支持授权用户使用RPC接口下载，是否进行授权？', () => {
                        auth.login()
                    })
                }
            },
            video_download() {
                const type = config.download_type
                if (type === 'web') {
                    $('#video_url')[0].click()
                } else if (type === 'a') {
                    const [video_url, video_url_2, file_name, file_name_2] = [
                        $('#video_url').attr('href'),
                        $('#video_url_2').attr('href'),
                        $('#video_url').attr('download'),
                        $('#video_url_2').attr('download')
                    ]
                    const msg = '建议使用IDM、FDM等软件安装其浏览器插件后，鼠标右键点击链接下载~<br/><br/>' +
                        `<a href="${video_url}" download="${file_name}" target="_blank" style="text-decoration:underline;">&gt视频地址&lt</a><br/><br/>` +
                        (config.format === 'dash' ? `<a href="${video_url_2}" download="${file_name_2}" target="_blank" style="text-decoration:underline;">&gt音频地址&lt</a>` : '')
                    MessageBox.alert(msg)
                } else if (type === 'aria') {
                    const [video_url, video_url_2] = [
                        $('#video_url').attr('href'),
                        $('#video_url_2').attr('href')
                    ]
                    const video_title = video.base().filename()
                    const [file_name, file_name_2] = [
                        video_title + Download.url_format(video_url),
                        video_title + '.m4a'
                    ]
                    const aria2c_header = `--header "User-Agent: ${window.navigator.userAgent}" --header "Referer: ${window.location.href}"`
                    const [url_max_connection, server_max_connection] = {
                        min: [1, 5],
                        mid: [16, 8],
                        max: [32, 16]
                    }[config.aria2c_connection_level] || [1, 5]
                    const aria2c_max_connection_parameters = `--max-concurrent-downloads ${url_max_connection} --max-connection-per-server ${server_max_connection}`
                    const [code, code_2] = [
                        `aria2c "${video_url}" --out "${file_name}"`,
                        `aria2c "${video_url_2}" --out "${file_name_2}"`
                    ].map(code => `${code} ${aria2c_header} ${aria2c_max_connection_parameters} ${config.aria2c_addition_parameters}`)
                    const msg = '点击文本框即可复制下载命令！<br/><br/>' +
                        `视频：<br/><input id="aria2_code" value='${code}' onclick="bp_clip_btn('aria2_code')" style="width:100%;"></br></br>` +
                        (config.format === 'dash' ? `音频：<br/><input id="aria2_code_2" value='${code_2}' onclick="bp_clip_btn('aria2_code_2')" style="width:100%;"><br/><br/>` +
                            `全部：<br/><textarea id="aria2_code_all" onclick="bp_clip_btn('aria2_code_all')" style="min-width:100%;max-width:100%;min-height:100px;max-height:100px;">${code}\n${code_2}</textarea>` : '')
                    !window.bp_clip_btn && (window.bp_clip_btn = id => {
                        $(`#${id}`).select()
                        if (document.execCommand('copy')) {
                            Message.success('复制成功')
                        } else {
                            Message.warning('复制失败')
                        }
                    })
                    MessageBox.alert(msg)
                } else {
                    const url = $('#video_url').attr('href')
                    const filename = video.base().filename() + Download.url_format(url)
                    Download.download(url, filename, type)
                }
            },
            video_download_2() {
                const type = config.download_type
                if (type === 'web') {
                    $('#video_url_2')[0].click()
                } else if (type === 'a') {
                    $('#video_download').click()
                } else if (type === 'aria') {
                    $('#video_download').click()
                } else {
                    const url = $('#video_url_2').attr('href')
                    const filename = video.base().filename() + '.m4a'
                    Download.download(url, filename, type)
                }
            }
        }

        // api & click
        window.bpd = evt
        Object.entries(evt).forEach(([k, v]) => $('body').on('click', `#${k}`, v))

        // part of check
        $('body').on('click', 'a.router-link-active', function () {
            if (this !== $('li[class="on"]').find('a')[0]) {
                check.refresh()
            }
        })
        $('body').on('click', 'li.ep-item', () => {
            check.refresh()
        })
        $('body').on('click', 'button.bilibili-player-iconfont-next', () => {
            check.refresh()
        })
        const bili_video_tag = player.bili_video_tag()
        !!$(bili_video_tag)[0] && ($(bili_video_tag)[0].onended = () => {
            check.refresh()
        })
        // 监听q
        $('body').on('click', 'li.bui-select-item', () => {
            check.refresh()
        })
        // 监听aid
        $('body').on('click', '.rec-list', () => {
            check.refresh()
        })
        $('body').on('click', '.bilibili-player-ending-panel-box-videos', () => {
            check.refresh()
        })
        // 定时检查
        setInterval(() => {
            if (check.href !== location.href) {
                check.refresh()
            }
        }, 1000)
        setInterval(() => {
            const vb = video.base()
            if (check.aid !== vb.aid() || check.cid !== vb.cid()) {
                check.refresh()
            }
        }, 3000)
    }
}

export default Main
