import { config } from './ui/config'
import { store } from './store'
import { Message, MessageBox } from './ui/message'
import { user } from './user'
import { ajax } from './utils/ajax'

class Auth {
    constructor() {
        this.auth_clicked = false
    }

    checkLoginStatus() {

        const [auth_id, auth_sec, access_key, auth_time] = [
            store.get('auth_id'),
            store.get('auth_sec'),
            store.get('access_key'),
            store.get('auth_time') || '0',
        ]

        if (!access_key) return

        if (user.is_login && (config.base_api !== store.get('pre_base_api') ||
            Date.now() - parseInt(auth_time) > 24 * 60 * 60 * 1000)) {
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
                        url: `${config.base_api}/auth/v2/?act=check&auth_id=${auth_id}&auth_sec=${auth_sec}&access_key=${access_key}`,
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

    _login(resolve) {
        if (this.auth_clicked) {
            Message.miaow()
            return
        }
        this.auth_clicked = true
        ajax({
            url: 'https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=https%3A%2F%2Fwww.mcbbs.net%2Ftemplate%2Fmcbbs%2Fimage%2Fspecial_photo_bg.png&sign=04224646d1fea004e79606d3b038c84a',
            xhrFields: { withCredentials: true },
            type: 'GET',
            dataType: 'json'
        }).then(resolve).finally(_ => this.auth_clicked = false)
    }

    login(auto = '1') {
        const do_login = auto === '1' // 绑定 this
            ? this.loginAuto.bind(this)
            : this.loginManual.bind(this)

        if (store.get('auth_id')) {
            MessageBox.confirm('发现授权记录，是否重新授权？', do_login)
            return
        }
        do_login()
    }

    reLogin() {
        store.set('auth_id', '')
        store.set('auth_sec', '')
        store.set('access_key', '')
        store.set('auth_time', '0')
        this.loginAuto()
    }

    loginAuto() {
        this._login(res => {
            if (res.data.has_login) {
                $('body').append(`<iframe id='auth_iframe' src='${res.data.confirm_uri}' style='display:none;'></iframe>`)
            } else {
                MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', () => {
                    location.href = 'https://passport.bilibili.com/login'
                })
            }
        })
    }

    loginManual() {
        this._login(res => {
            if (res.data.has_login) {
                const msg = '' +
                    `请点击<b><a href='${res.data.confirm_uri}' target='_blank'>授权地址</a></b>
                    打开一个新窗口，正常情况新窗口应该显示一个图片，请将该窗口地址栏的URL链接复制到当前文本框中<br/>
                    <input id='auth_url' style='width:100%;' type='text' autocomplete='off'><br>然后点击确定即可`
                MessageBox.alert(msg, () => {
                    const auth_url = $('#auth_url').val()
                    const [auth_id, auth_sec] = [
                        store.get('auth_id') || '',
                        store.get('auth_sec') || '',
                    ]
                    ajax({
                        url: auth_url.replace(
                            'https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?',
                            `${config.base_api}/auth/v2/?act=login&auth_id=${auth_id}&auth_sec=${auth_sec}&`
                        ),
                        type: 'GET',
                        dataType: 'json',
                    }).then(res => {
                        if (!res.code) {
                            Message.success('授权成功')
                            if (res.auth_id && res.auth_sec) {
                                store.set('auth_id', res.auth_id)
                                store.set('auth_sec', res.auth_sec)
                            }
                            store.set('access_key', new URL(auth_url).searchParams.get('access_key'))
                            store.set('auth_time', Date.now())
                            $('#auth').val('1')
                            config.auth = '1'
                        } else {
                            Message.warning('授权失败')
                        }
                    })
                })
            } else {
                MessageBox.confirm('必须登录B站才能正常授权，是否登陆？', () => {
                    location.href = 'https://passport.bilibili.com/login'
                })
            }
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
            url: `${config.base_api}/auth/v2/?act=logout&auth_id=${auth_id}&auth_sec=${auth_sec}`,
            type: 'GET',
            dataType: 'json',
        }).then(res => {
            if (!res.code) {
                Message.success('取消成功')
                store.set('auth_id', '')
                store.set('auth_sec', '')
                store.set('auth_time', '0')
                store.set('access_key', '')
                $('#auth').val('0')
                config.auth = '0'
            } else {
                Message.warning('取消失败')
            }
        }).finally(_ => this.auth_clicked = false)

    }

    initAuth() {

        window.addEventListener('message', e => {
            if (typeof e.data !== 'string') return
            if (e.data.split(':')[0] === 'bilibili-parse-login-credentials') {
                $('iframe#auth_iframe').remove()
                let url = e.data.split(': ')[1]
                const [auth_id, auth_sec] = [
                    store.get('auth_id'),
                    store.get('auth_sec')
                ]
                ajax({
                    url: url.replace('https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png?',
                        `${config.base_api}/auth/v2/?act=login&auth_id=${auth_id}&auth_sec=${auth_sec}&`),
                    type: 'GET',
                    dataType: 'json',
                }).then(res => {
                    if (!res.code) {
                        Message.success('授权成功')
                        if (res.auth_id && res.auth_sec) {
                            store.set('auth_id', res.auth_id)
                            store.set('auth_sec', res.auth_sec)
                        }
                        store.set('access_key', new URL(url).searchParams.get('access_key'))
                        store.set('auth_time', Date.now())
                        $('#auth').val('1')
                        config.auth = '1'
                    } else {
                        Message.warning('授权失败')
                    }
                }).finally(_ => this.auth_clicked = false)
            }
        })
    }
}

export const auth = new Auth()
