import { config } from './ui/config'
import { store } from './store'
import { Message, MessageBox } from './ui/message'
import { user } from './user'
import { _ajax, ajax } from './utils/ajax'
import { QRCode, md5 } from './utils/runtime-lib'

class Auth {
    constructor() {
        this.auth_clicked = false
        this.auth_window = null
        this.TV_KEY = '4409e2ce8ffd12b8'
        this.TV_SEC = '59b43e04ad6965f34319062b478f83dd'
    }

    checkLoginStatus() {

        const [auth_id, auth_sec, access_key, auth_time] = [
            store.get('auth_id'),
            store.get('auth_sec'),
            store.get('access_key'),
            store.get('auth_time') || 0,
        ]

        if (!access_key) return

        if (user.is_login && (config.base_api !== store.get('pre_base_api') ||
            Date.now() - parseInt(auth_time) > 24 * 3600 * 1e4)) {
            // check key
            ajax({
                url: `https://passport.bilibili.com/api/oauth?access_key=${access_key}`,
                type: 'GET',
                dataType: 'json'
            }).then(res => {
                if (res.code) {
                    Message.info('授权已过期，准备重新授权')
                    this.reLogin()
                } else {
                    store.set('auth_time', Date.now())
                    ajax({
                        url: `${config.base_api}/auth/?act=check&auth_id=${auth_id}&auth_sec=${auth_sec}&access_key=${access_key}`,
                        type: 'GET',
                        dataType: 'json'
                    }).then(res => {
                        if (res.code) {
                            Message.info('检查失败，准备重新授权')
                            this.reLogin()
                        }
                    })
                }
            })
        }
        store.set('pre_base_api', config.base_api)
    }

    makeAPIData(param, sec) {
        return {
            ...param,
            sign: md5(`${Object.entries(param).map(e => `${e[0]}=${e[1]}`).join('&')}${sec}`)
        }
    }

    _login(resolve) {
        if (this.auth_clicked) {
            Message.miaow()
            return
        }
        this.auth_clicked = true
        ajax({
            url: 'https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code',
            type: 'POST',
            data: this.makeAPIData({
                appkey: this.TV_KEY,
                csrf: window.getCookie('bili_jct') || '',
                local_id: '0',
                ts: Date.now()
            }, this.TV_SEC)
        }).then(resolve).catch(() => this.auth_clicked = false)
    }

    login(useApp = '1') {
        const do_login = useApp === '1' // 绑定 this
            ? this.loginApp.bind(this)
            : this.loginWeb.bind(this)

        if (store.get('auth_id')) {
            MessageBox.confirm('发现授权记录，是否重新授权？', do_login)
            return
        }
        do_login()
    }

    reLogin() {
        this.logout()
        store.set('auth_time', '0')
        this.loginApp()
    }

    loginApp() {
        this._login(res => {
            if (!res || res.code) {
                return
            }
            const { url, auth_code } = res.data
            let is_login = 0
            const box = MessageBox.alert('<p>请使用<a href="https://app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>扫码登录</p><div id="login_qrcode"></div>', () => {
                if (!is_login) {
                    Message.info('登陆失败！')
                }
                clearInterval(timer)
                this.auth_clicked = false
            })
            new QRCode(document.getElementById('login_qrcode'), url)
            const timer = setInterval(() => {
                _ajax({
                    url: `https://passport.bilibili.com/x/passport-tv-login/qrcode/poll`,
                    type: 'POST',
                    data: this.makeAPIData({
                        appkey: this.TV_KEY,
                        auth_code: auth_code,
                        csrf: window.getCookie('bili_jct') || '',
                        local_id: '0',
                        ts: Date.now().toString()
                    }, this.TV_SEC)
                }).then(res => {
                    if (!res.code && res.data) {
                        console.log('login success')
                        is_login = 1
                        this.doAuth(res.data.token_info)
                        box.affirm()
                    } else if (res.code === 86038) {
                        box.affirm()
                    }
                })
            }, 3000)
        })
    }

    loginWeb() {
        this._login(res => {
            if (!res || res.code) {
                return
            }
            const { url, auth_code } = res.data
            this.auth_window = window.open(url)
            let is_login = 0
            const timer = setInterval(() => {
                if (!this.auth_window || this.auth_window.closed) {
                    clearInterval(timer)
                    this.auth_clicked = false
                    if (!is_login) {
                        Message.info('登陆失败！')
                    }
                    return
                }
                _ajax({
                    url: `https://passport.bilibili.com/x/passport-tv-login/qrcode/poll`,
                    type: 'POST',
                    data: this.makeAPIData({
                        appkey: this.TV_KEY,
                        auth_code: auth_code,
                        csrf: window.getCookie('bili_jct') || '',
                        local_id: '0',
                        ts: Date.now().toString()
                    }, this.TV_SEC)
                }).then(res => {
                    if (!res.code && res.data) {
                        console.log('login success')
                        this.doAuth(res.data.token_info)
                        is_login = 1
                        this.auth_window.close()
                    } else if (res.code === 86038) {
                        this.auth_window.close()
                    }
                })
            }, 3000)
        })
    }


    logout() {
        if (!store.get('auth_id')) {
            MessageBox.alert('没有发现授权记录')
            return
        }
        if (this.auth_clicked) {
            Message.miaow()
            return
        }
        const [auth_id, auth_sec] = [
            store.get('auth_id'),
            store.get('auth_sec')
        ]
        ajax({
            url: `${config.base_api}/auth/?act=logout&auth_id=${auth_id}&auth_sec=${auth_sec}`,
            type: 'GET',
            dataType: 'json',
        }).then(res => {
            if (!res.code) {
                Message.success('注销成功')
                store.set('auth_id', '')
                store.set('auth_sec', '')
                store.set('auth_time', '0')
                store.set('access_key', '')
                $('#auth').val('0')
                config.auth = '0'
            } else {
                Message.warning('注销失败')
            }
        }).finally(() => this.auth_clicked = false)

    }

    doAuth(param) {
        if (this.auth_window && !this.auth_window.closed) {
            this.auth_window.close()
            this.auth_window = null
        }
        const [auth_id, auth_sec] = [
            store.get('auth_id'),
            store.get('auth_sec')
        ]

        ajax({
            url: `${config.base_api}/auth/?act=login&${Object.entries({
                auth_id: auth_id,
                auth_sec: auth_sec,
                ...param
            }).map(e => `${e[0]}=${e[1]}`).join('&')}`,
            type: 'GET',
            dataType: 'json',
        }).then(res => {
            if (!res.code) {
                Message.success('授权成功')
                if (res.auth_id && res.auth_sec) {
                    store.set('auth_id', res.auth_id)
                    store.set('auth_sec', res.auth_sec)
                }
                store.set('access_key', param.access_token)
                store.set('auth_time', Date.now())
                $('#auth').val('1')
                config.auth = '1'
            } else {
                Message.warning('授权失败')
            }
        }).finally(() => this.auth_clicked = false)
    }
}

export const auth = new Auth()
