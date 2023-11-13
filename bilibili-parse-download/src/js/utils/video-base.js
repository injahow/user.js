
const clazzMap = {}

class VideoBase {

    constructor(video_type, main_title, state) {
        if (!(this.constructor.name in clazzMap)) {
            clazzMap[this.constructor.name] = this.constructor
        }
        this.video_type = video_type || 'video'
        this.main_title = main_title || ''
        this.state = state
        // ! state.p
        this.page = state && parseInt(state.p) || 1
    }

    getVideo(p) {
        const clazz = clazzMap[this.constructor.name]
        return Object.fromEntries(
            Object.getOwnPropertyNames(VideoBase.prototype)
                .filter(name => !['constructor', 'getVideo'].includes(name))
                .map(key => [key, clazz.prototype[key].call(this, p)])
        )
    }

    type() {
        return this.video_type
    }

    p(p) {
        p = parseInt(p) || 0
        return p > 0 && p <= this.total() ? p : this.page
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

    needVip() {
        return false
    }

    vipNeedPay() {
        return false
    }

    isLimited() {
        return false
    }
}

class Video extends VideoBase {

    constructor(main_title, state) {
        super('video', main_title, state)
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
        return this.state.videoData.pages[this.id(p)].cid
    }
}

class VideoList extends VideoBase {

    constructor(main_title, state) {
        super('video', main_title, state)
        this.video = new Video(state.videoData.title, state)
        this.resourceList = state.resourceList || []
        const video_list = []
        for (const video of this.resourceList) {
            let i = 0, length = video.pages && video.pages.length || 0
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

    constructor(main_title, state) {
        super('bangumi', main_title, state)
        this.epInfo = state.epInfo
        this.epList = state.epList
        this.epId = state.epId
        this.epMap = state.epMap
        this.mediaInfo = state.mediaInfo
    }

    static build() {
        // ! state: {p, mediaInfo, epList, epId, epMap}
        if (!!window.__INITIAL_STATE__) {
            // old
            const state = window.__INITIAL_STATE__
            const main_title = state.mediaInfo.season_title
            state.p = state.epInfo.i + 1

            return new Bangumi(main_title, state)
        }

        // new
        const queries = window.__NEXT_DATA__.props.pageProps.dehydratedState.queries
        let mediaInfo, historyEpId, epMap
        try { // todo
            mediaInfo = queries[0].state.data.mediaInfo
            epMap = queries[0].state.data.epMap
            historyEpId = queries[1].state.data.userInfo.history.epId
        } catch (e) {
            mediaInfo = queries[0].state.data.seasonInfo.mediaInfo
            const { sectionsMap } = queries[0].state.data.seasonInfo
            epMap = {}
            mediaInfo.episodes.forEach(epInfo => {
                epMap[epInfo.id] = epInfo
            })
            Object.entries(sectionsMap).forEach(([sid, sectionInfo]) => {
                sectionInfo.epList.forEach(epInfo => {
                    epMap[epInfo.id] = epInfo
                })
            })
            historyEpId = queries[0].state.data.userInfo.userInfo.history.epId
        }

        const { season_title: main_title, episodes } = mediaInfo

        let epid
        if (location.pathname.startsWith('/bangumi/play/ss')) {
            epid = parseInt(historyEpId)
            if (epid < 0) {
                epid = episodes[0].id
            }
        } else {
            epid = location.pathname.match(/ep(\d+)/)
            epid = epid ? parseInt(epid[1]) : episodes[0].id
        }

        let _id = 0
        for (let i = 0; i < episodes.length; i++) {
            if (episodes[i].id == epid) {
                _id = i
                break
            }
        }

        const state = {
            p: _id + 1,
            epId: epid,
            epList: episodes,
            mediaInfo: mediaInfo,
            epMap: epMap
        }

        return new Bangumi(main_title, state)
    }

    total() {
        return this.epList.length
    }

    title(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return (`${ep.titleFormat} ${ep.long_title}`)
    }

    filename(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return (`${this.main_title}：${ep.titleFormat} ${ep.long_title}`).replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.aid
    }

    bvid(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.bvid
    }

    cid(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.cid
    }

    epid(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.id
    }

    needVip(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.badge === '会员'
    }

    vipNeedPay(p) {
        let ep = p
            ? this.epList[this.id(p)]
            : this.epMap && this.epId
                ? this.epMap[this.epId]
                : this.epInfo
        return ep.badge === '付费'
    }

    isLimited() {
        return !!this.mediaInfo.user_status.area_limit
    }
}

class Cheese extends VideoBase {

    constructor(main_title, state) {
        super('cheese', main_title, state)
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
