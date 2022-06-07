import { video } from './utils/video'
import { player } from './utils/player'

class Check {

    constructor() {
        this.aid = ''
        this.cid = ''
        this.q = ''
        this.epid = ''
    }

    refresh() {
        console.log('refresh...')
        $('#video_download').hide()
        $('#video_download_2').hide()
        player.recover_player()
        // 更新check
        try {
            const vb = video.base()
            this.aid = vb.aid()
            this.cid = vb.cid()
            this.epid = vb.epid()
            this.q = video.get_quality().q
            window.bp_episodes = null // todo
        } catch (err) {
            console.log(err)
        }

    }

}

export const check = new Check()
