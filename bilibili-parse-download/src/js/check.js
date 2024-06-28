import { video } from './utils/video'
import { player } from './utils/player'
import CacheFactory from './utils/cache'

class Check {

    constructor() {
        this.href = ''
        this.aid = ''
        this.cid = ''
        this.q = ''
        this.epid = ''
        this.lock = false
    }

    refresh() {
        if (this.lock) {
            return
        }
        this.lock = true
        console.log('refresh...')
        $('#video_download').hide()
        $('#video_download_2').hide()
        player.recover_player()
        // 更新check
        try {
            this.href = location.href
            const vb = video.base()
            this.aid = vb.aid()
            this.cid = vb.cid()
            this.epid = vb.epid()
            this.q = video.get_quality().q
            window.bp_episodes = null // todo
        } catch (err) {
            console.log(err)
        } finally{
            this.lock = false
        }
    }

}

export const check = new Check()
