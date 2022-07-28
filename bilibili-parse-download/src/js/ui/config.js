import { auth } from '@/js/auth'
import { check } from '@/js/check'
import { store } from '@/js/store'
import { Message, MessageBox } from '@/js/ui/message'
import { scroll } from '@/js/ui/scroll'
import { ajax } from '@/js/utils/ajax'
import { Download } from '@/js/utils/download'
import { player } from '@/js/utils/player'

import config_html from '@/html/config.html'

const config = {
    base_api: 'https://api.injahow.cn/bparse/',
    request_type: 'auto',
    format: 'flv',
    host_key: '0',
    replace_force: '0',
    auth: '0',
    download_type: 'web',
    rpc_domain: 'http://localhost',
    rpc_port: '16800',
    rpc_token: '',
    rpc_dir: 'D:/',
    aria2c_max_concurrent_downloads: 1,
    aria2c_max_connection_per_server: 5,
    ariang_host: 'http://ariang.injahow.com/',
    auto_download: '0',
    video_quality: '0',
    danmaku_speed: '15',
    danmaku_fontsize: '22'
}

const default_config = Object.assign({}, config) // 浅拷贝

const hostMap = {
    ks3: 'upos-sz-mirrorks3.bilivideo.com',
    ks3b: 'upos-sz-mirrorks3b.bilivideo.com',
    ks3c: 'upos-sz-mirrorks3c.bilivideo.com',
    ks32: 'upos-sz-mirrorks32.bilivideo.com',
    kodo: 'upos-sz-mirrorkodo.bilivideo.com',
    kodob: 'upos-sz-mirrorkodob.bilivideo.com',
    cos: 'upos-sz-mirrorcos.bilivideo.com',
    cosb: 'upos-sz-mirrorcosb.bilivideo.com',
    bos: 'upos-sz-mirrorbos.bilivideo.com',
    wcs: 'upos-sz-mirrorwcs.bilivideo.com',
    wcsb: 'upos-sz-mirrorwcsb.bilivideo.com',
    /* 不限CROS, 限制UA */
    hw: 'upos-sz-mirrorhw.bilivideo.com',
    hwb: 'upos-sz-mirrorhwb.bilivideo.com',
    upbda2: 'upos-sz-upcdnbda2.bilivideo.com',
    upws: 'upos-sz-upcdnws.bilivideo.com',
    uptx: 'upos-sz-upcdntx.bilivideo.com',
    uphw: 'upos-sz-upcdnhw.bilivideo.com',
    js: 'upos-tf-all-js.bilivideo.com',
    hk: 'cn-hk-eq-bcache-01.bilivideo.com',
    akamai: 'upos-hz-mirrorakam.akamaized.net'
}

const videoQualityMap = {
    '120': '4K 超清',
    '116': '1080P 60帧',
    '112': '1080P 高码率',
    '80': '1080P 高清',
    '74': '720P 60帧',
    '64': '720P 高清',
    '48': '720P 高清(MP4)',
    '32': '480P 清晰',
    '16': '360P 流畅'
}

let help_clicked = false

const config_functions = {
    save_config: function () {
        let old_config
        try {
            old_config = JSON.parse(store.get('config_str'))
            store.set('config_str', JSON.stringify(config))
        } catch (err) {
            old_config = Object.assign({}, config)
        }
        // 判断重新请求
        for (const key of ['base_api', 'format', 'auth', 'video_quality']) {
            if (config[key] !== old_config[key]) {
                $('#video_download').hide()
                $('#video_download_2').hide()
                break
            }
        }
        if (config.host_key !== old_config.host_key) {
            check.refresh()
            $('#video_url').attr('href', '#')
            $('#video_url_2').attr('href', '#')
        }
        // 判断RPC配置情况
        if (config.rpc_domain !== old_config.rpc_domain) {
            if (
                !(
                    config.rpc_domain.match('https://') ||
                    config.rpc_domain.match(/(localhost|127\.0\.0\.1)/)
                )
            ) {
                MessageBox.alert(
                    '检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；' +
                    '请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；' +
                    '配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！',
                    () => {
                        Download.open_ariang({
                            domain: config.rpc_domain,
                            port: config.rpc_port,
                            token: config.rpc_token
                        })
                    }
                )
            }
        }
        // 更新弹幕设置
        for (const key of ['danmaku_speed', 'danmaku_fontsize']) {
            if (config[key] !== old_config[key]) {
                player.danmaku.config()
                break
            }
        }
        // todo

        // 关闭
        $('#bp_config').hide()
        $('#bp_config').css('opacity', 0)
        scroll.show()
    },
    reset_config: function () {
        for (const key in default_config) {
            if (key === 'auth') {
                continue
            }
            config[key] = default_config[key]
            $(`#${key}`).val(default_config[key])
        }
    },
    show_help: function () {
        if (help_clicked) {
            Message.miaow()
            return
        }
        help_clicked = true
        ajax({
            url: `${config.base_api}/auth/v2/?act=help`,
            dataType: 'text',
        })
            .then((res) => {
                if (res) {
                    MessageBox.alert(res)
                } else {
                    Message.warning('获取失败')
                }
            })
            .finally(() => (help_clicked = false))
    },
    show_login: function () {
        auth.login('1')
    },
    show_login_2: function () {
        auth.login('0')
    },
    show_logout: function () {
        auth.logout()
    },
    show_login_help: function () {
        MessageBox.confirm('进行授权之后将能在远程请求时享有用户账号原有的权益，例如能够请求用户已经付费或承包的番剧，是否需要授权？', () => {
            auth.login()
        })
    }
}

function initConfig(el) {

    // 注入 host_key_options
    let options = '<option value="0">关闭</option>'
    for (const k in hostMap) {
        options += `<option value="${k}">${hostMap[k]}</option>`
    }
    config_html = config_html.replace('{{host_key_options}}', options)
    // 注入 video_quality_options
    options = '<option value="0">与播放器相同</option>'
    for (const k in videoQualityMap) {
        options += `<option value="${k}">${videoQualityMap[k]}</option>`
    }
    config_html = config_html.replace('{{video_quality_options}}', options)

    if (el && !!$(el)[0]) {
        $(el).append(config_html)
    } else {
        $('body').append(config_html)
    }
    // 同步数据
    const config_str = store.get('config_str')
    if (config_str) {
        // set config from cache
        try {
            const old_config = JSON.parse(config_str)
            for (const key in old_config) {
                if (Object.hasOwnProperty.call(config, key)) {
                    config[key] = old_config[key]
                }
            }
        } catch {
            console.log('初始化脚本配置')
        }
    }
    config.auth = store.get('auth_id') ? '1' : '0'
    store.set('config_str', JSON.stringify(config))
    // 函数绑定
    for (const key in config) {
        if (key === 'auth') {
            continue
        }
        $(`#${key}`).on('input', e => {
            config[key] = e.delegateTarget.value
        })
    }
    for (const k in config_functions) {
        const e = $(`#${k}`)[0] // a && button
        !!e && (e.onclick = config_functions[k])
    }
    // 渲染数据
    for (const key in config) {
        $(`#${key}`).val(config[key])
    }

    window.onbeforeunload = () => {
        // todo
        const bp_aria2_window = window.bp_aria2_window
        if (bp_aria2_window && !bp_aria2_window.closed) {
            bp_aria2_window.close()
        }
    }
}

export {
    config,
    hostMap,
    videoQualityMap,
    initConfig
}
