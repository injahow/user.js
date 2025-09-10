
import { auth } from './auth'
import { check } from './check'
import { event } from './ui/event'
import { initConfig } from './ui/config'
import { initMessage } from './ui/message'
import { initToolbar } from './ui/toolbar'
import { user } from './user'
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
        $(`#${root_div.id}`).append('<a id="video_url" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>')
        $(`#${root_div.id}`).append('<a id="video_url_2" style="display:none;" target="_blank" referrerpolicy="origin" href="#"></a>')

    }

    run() {

        this.init()

        // api & click
        window.bpd = event
        Object.entries(event).forEach(([k, v]) => $('body').on('click', `#${k}`, v))

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
        }, 500)
        setInterval(() => {
            const vb = video.base()
            if (check.aid !== vb.aid() || check.cid !== vb.cid() || check.q !== video.get_quality().q) {
                check.refresh()
            }
        }, 1500)
    }
}

export default Main
