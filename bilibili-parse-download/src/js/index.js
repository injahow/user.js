
import Main from './main'

(() => {
    'use strict';

    if (window.bp_fun_locked) return
    window.bp_fun_locked = true

    if (location.href.match(/^https:\/\/www\.mcbbs\.net\/template\/mcbbs\/image\/special_photo_bg\.png/) != null) {
        // https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6/code
        if (location.href.match('access_key') && window !== window.parent) {
            window.stop()
            window.parent.postMessage('bilibili-parse-login-credentials: ' + location.href, '*')
        }
        return
    }

    // error page
    if ($('.error-text')[0]) {
        return
    }

    setTimeout(() => {
        /* global JS_VERSION GIT_HASH */
        console.log(`${'\n'} %c bilibili-parse-download.user.js v${JS_VERSION} ${GIT_HASH} %c https://github.com/injahow/user.js ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
        new Main().run()
    }, 2000)

})()

