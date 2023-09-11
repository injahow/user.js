
import Main from './main'

(() => {
    'use strict'

    if (window.bp_fun_locked) return
    window.bp_fun_locked = true

    if (location.href.match(/^https:\/\/www\.mcbbs\.net\/template\/mcbbs\/image\/special_photo_bg\.png/) != null) {
        // https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6/code
        if (location.href.match('access_key') && window !== window.opener) {
            window.stop()
            window.opener.postMessage('bilibili-parse-login-credentials: ' + location.href, '*')
        }
        return
    }

    // error page
    if ($('.error-text')[0]) {
        return
    }

    setTimeout(() => {
        new Main().run()
    }, 3000)

})()
