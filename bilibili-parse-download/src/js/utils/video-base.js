
class VideoBase {

    constructor(type, main_title, state) {
        this.type = type || '?'
        this.main_title = main_title || ''
        this.state = state
        // ! state.p
        this.page = state && state.p || 1
    }

    p(p) {
        return p && p <= this.total() ? p : this.page
    }

    id(p) {
        return this.p(p) - 1
    }

    total() {
        return 0
    }

    title() {
        return ''
    }

    filename() {
        return ''
    }

    aid() {
        return 0
    }

    bvid() {
        return ''
    }

    cid() {
        return 0
    }

    epid() {
        return ''
    }

    need_vip() {
        return false
    }

    vip_need_pay() {
        return false
    }

    is_limited() {
        return false
    }
}

class Video extends VideoBase {

    constructor(type, main_title, state) {
        super(type, main_title, state)
    }

    total() {
        return this.state.videoData.pages.length
    }

    title(p) {
        const id = this.id(p)
        return this.state.videoData.pages[id].part
    }

    filename(p) {
        const id = this.id(p)
        const title = this.main_title + (this.total() > 1 ? ` P${id + 1} ${this.state.videoData.pages[id].part || ''}` : '')
        return title.replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        return this.state.videoData.aid
    }

    bvid(p) {
        return this.state.videoData.bvid
    }

    cid(p) {
        const id = this.id(p)
        return this.state.videoData.pages[id].cid
    }
}

class VideoList extends VideoBase {

    constructor(type, main_title, state) {
        super(type, main_title, state)
        this.video = new Video(type, state.videoData.title, state)
        this.resourceList = state.resourceList || []
        const video_list = []
        for (const video of this.resourceList) {
            let i = 0, length = video.pages && video.pages.length || 1
            while (i < length) {
                const _video = Object.assign({}, video)
                _video.title = video.title + (length > 1 ? ` P${i + 1} ${video.pages[i].title}` : '')
                _video.cid = video.pages[i].id
                video_list.push(_video)
                i++
            }
        }
        this.video_list = video_list
    }

    total() {
        return this.video_list.length
    }

    title(p) {
        return !p
            ? this.video.title()
            : this.video_list[this.id(p)].title
    }

    filename(p) {
        if (!p) {
            return this.video.filename()
        }
        const id = this.id(p)
        const title = this.main_title + (this.total() > 1 ? ` P${id + 1} ${this.video_list[id].title}` : '')
        return title.replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        return !p
            ? this.video.aid()
            : this.video_list[this.id(p)].id
    }

    bvid(p) {
        return !p
            ? this.video.bvid()
            : this.video_list[this.id(p)].bv_id
    }

    cid(p) {
        return !p
            ? this.video.cid()
            : this.video_list[this.id(p)].cid
    }
}

class Bangumi extends VideoBase {

    constructor(type, main_title, state) {
        super(type, main_title, state)
        this.epList = state.epList
        this.mediaInfo = state.mediaInfo
    }

    total() {
        return this.epList.length
    }

    title(p) {
        const ep = this.epList[this.id(p)]
        return (`${ep.titleFormat} ${ep.long_title}`)
    }

    filename(p) {
        const ep = this.epList[this.id(p)]
        return (`${this.main_title}：${ep.titleFormat} ${ep.long_title}`).replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        return this.epList[this.id(p)].aid
    }

    bvid(p) {
        return this.epList[this.id(p)].bvid
    }

    cid(p) {
        return this.epList[this.id(p)].cid
    }

    epid(p) {
        return this.epList[this.id(p)].id
    }

    need_vip(p) {
        return this.epList[this.id(p)].badge === '会员'
    }

    vip_need_pay(p) {
        return this.epList[this.id(p)].badge === '付费'
    }

    is_limited() {
        return !!this.mediaInfo.user_status.area_limit
    }
}

class Cheese extends VideoBase {

    constructor(type, main_title, state) {
        super(type, main_title, state)
        this.episodes = state.episodes
    }

    total() {
        return this.episodes.length
    }

    title(p) {
        return this.episodes[this.id(p)].title
    }

    filename(p) {
        return (`${this.main_title} P${this.p(p)} ${this.title(p)}`).replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        return this.episodes[this.id(p)].aid
    }

    cid(p) {
        return this.episodes[this.id(p)].cid
    }

    epid(p) {
        return this.episodes[this.id(p)].id
    }
}

export {
    VideoBase,
    Video,
    VideoList,
    Bangumi,
    Cheese
}
