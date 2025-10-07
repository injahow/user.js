
import Main from './main'

(() => {
    'use strict'

    if (window.bp_fun_locked) return
    window.bp_fun_locked = true

    // error page
    if (document.getElementsByClassName('error-text')[0]) {
        return
    }

    setTimeout(() => {
        new Main().run()
    }, 0)

})()
