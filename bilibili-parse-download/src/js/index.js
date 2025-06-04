
import Main from './main'

(() => {
    'use strict'

    if (window.bp_fun_locked) return
    window.bp_fun_locked = true

    // error page
    if (document.getElementsByClassName('error-text')[0]) {
        return
    }

    // 处理 initToolbar 白屏问题，渲染后执行
    let running = false
    let timer
    const run = (timeout) => {
        setTimeout(() => {
            if (running) {
                return
            }
            running = true
            if (timeout === 0) {
                clearInterval(timer)
            } else {
                console.warn('waiting timeout...')
            }
            new Main().run()
        }, timeout * 1000)
    }
    timer = setInterval(() => {
        const search_form = document.getElementById('nav-searchform')
        if (search_form && !running) {
            run(0)
        }
    }, 500)
    run(5)
    run(10)
})()
