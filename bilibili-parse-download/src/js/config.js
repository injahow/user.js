import { store } from "./store"
import { check } from "./check"
import { Message, MessageBox } from "./ui/message"
import { scroll } from "./ui/scroll"
import { ajax } from "./utils/ajax"
import { Download } from "./utils/download"
import { player } from "./utils/player"
import config_html from "../html/config.html"

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
    auto_download: '0',
    danmaku_speed: '15',
    danmaku_fontsize: '22'
}

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

function initConfig() {
    const default_config = Object.assign({}, config); // 浅拷贝
    const config_str = store.get('config_str') || localStorage.getItem('my_config_str')
    if (!config_str) {
        store.set('config_str', JSON.stringify(config))
        localStorage.setItem('my_config_str', JSON.stringify(config)); // wait to be deleted
    } else {
        // set config from cache
        const old_config = JSON.parse(config_str)
        for (const key in old_config) {
            if (Object.hasOwnProperty.call(config, key)) {
                config[key] = old_config[key]
            }
        }
    }
    window.bp_save_config = () => {
        // set config by form
        for (const key in config) {
            config[key] = $(`#${key}`).val()
        }
        const old_config = JSON.parse(store.get('config_str') || localStorage.getItem('my_config_str'))
        store.set('config_str', JSON.stringify(config))
        localStorage.setItem('my_config_str', JSON.stringify(config)); // wait to be deleted
        // hide
        $('#bp_config').hide()
        $('#bp_config').css('opacity', 0)
        scroll.show()
        // 判断是否需要重新请求
        for (const key of ['base_api', 'format', 'auth']) {
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
            if (!(config.rpc_domain.match('https://') || config.rpc_domain.match(/(localhost|127\.0\.0\.1)/))) {
                MessageBox.alert('' +
                    '检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；' +
                    '请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；' +
                    '配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！', () => {
                        Download.open_ariang({
                            domain: config.rpc_domain,
                            port: config.rpc_port,
                            token: config.rpc_token
                        })
                    })
            }
        }
        // 判断弹幕设置情况
        for (const key of ['danmaku_speed', 'danmaku_fontsize']) {
            if (config[key] !== old_config[key]) {
                player.danmaku.config()
                break
            }
        }
    }

    window.onbeforeunload = () => {
        window.bp_save_config()
        const bp_aria2_window = window.bp_aria2_window
        if (bp_aria2_window && !bp_aria2_window.closed) {
            bp_aria2_window.close()
        }
    }

    let help_clicked = false
    window.bp_show_help = () => {
        if (help_clicked) {
            Message.miaow()
            return
        }
        help_clicked = true
        ajax({
            url: `${config.base_api}/auth/v2/?act=help`,
            dataType: 'text',
        }).then(res => {
            if (res) {
                MessageBox.alert(res)
            } else {
                Message.warning('获取失败')
            }
        }).finally(_ => help_clicked = false)
    }
    !window.bp_reset_config && (window.bp_reset_config = () => {
        for (const key in default_config) {
            if (key === 'auth') {
                continue
            }
            $(`#${key}`).val(default_config[key])
        }
    })

    // 注入 html
    config_html = config_html.replace('${host_key_option}', hostKeyOption())
    $('body').append(config_html)
    // 初始化配置页面
    for (const key in config) {
        $(`#${key}`).val(config[key])
    }
}

function hostKeyOption() {
    const host_keys = Object.keys(hostMap)
    let host_key_option = '<option value="0">关闭</option>'
    for (const key of host_keys) {
        host_key_option += `<option value="${key}">${hostMap[key]}</option>`
    }
    return host_key_option
}


export {
    config,
    hostMap,
    initConfig,
    hostKeyOption
}
