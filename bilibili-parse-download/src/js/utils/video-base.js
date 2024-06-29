import CacheFactory from "./cache"
import { _ajax } from "./ajax"

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
        const sections = state.sections || []
        this.video_list = [] // todo
        if (!sections.length > 0) {
            return
        }
        // ? 集合视频 pageSize = 1
        let new_page = 1, i = 1
        for (const section of sections) {
            const eplist = section.episodes || []
            for (const ep of eplist) {
                this.video_list.push(ep)
                if (state.videoData.bvid == ep.bvid) {
                    new_page = i
                }
                i++
            }
        }
        // 处理集合p
        this.page = new_page
    }

    total() {
        if (this.video_list.length > 0) {
            return this.video_list.length
        }
        return this.state.videoData.pages.length
    }

    title(p) {
        const id = this.id(p)
        if (this.video_list.length > 0) {
            return this.video_list[id].title
        }
        return this.state.videoData.pages[id].part
    }

    filename(p) {
        if (this.video_list.length > 0) {
            return this.title(p).replace(/[\/\\:*?"<>|]+/g, '')
        }
        const id = this.id(p)
        const title = this.main_title + (this.total() > 1 ? ` P${id + 1} ${this.state.videoData.pages[id].part || ''}` : '')
        return title.replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        if (this.video_list.length > 0) {
            return this.video_list[this.id(p)].aid
        }
        return this.state.videoData.aid
    }

    bvid(p) {
        if (this.video_list.length > 0) {
            return this.video_list[this.id(p)].bvid
        }
        return this.state.videoData.bvid
    }

    cid(p) {
        if (this.video_list.length > 0) {
            return this.video_list[this.id(p)].cid
        }
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

class VideoFestival extends VideoBase {

    constructor(main_title, state) {
        super('video', main_title, state)
        this.video_info = state.videoInfo
        this.video_list = state.sectionEpisodes || []
    }

    total() {
        return this.video_list.length
    }

    title(p) {
        return !p
            ? this.video_info.title
            : this.video_list[this.id(p)].title
    }

    filename(p) {
        let title
        if (!p) {
            title = this.video_info.title
        } else {
            const id = this.id(p)
            title = this.main_title + (this.total() > 1 ? ` P${id + 1} ${this.video_list[id].title}` : '')
        }
        return title.replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        return !p
            ? this.video_info.aid
            : this.video_list[this.id(p)].id
    }

    bvid(p) {
        return !p
            ? this.video_info.bvid
            : this.video_list[this.id(p)].bvid
    }

    cid(p) {
        return !p
            ? this.video_info.cid
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
        this.isEpMap = state.isEpMap
        // this.mediaInfo = state.mediaInfo
    }

    static build() {
        // ! state: {p, mediaInfo, epList, epId, epMap, epInfo}
        const bangumiCache = CacheFactory.get('Bangumi')

        if (location.href == bangumiCache.get('href') && !!bangumiCache.get('build')) {
            return bangumiCache.get('build')
        }
        bangumiCache.set('build', null)

        let main_title, sid, epid, epMap = {}
        const pathname = location.pathname.toLowerCase()
        if (pathname.startsWith('/bangumi/play/ss')) {
            sid = location.pathname.match(/ss(\d+)/)
            sid = parseInt(sid[1])
        } else if (pathname.startsWith('/bangumi/play/ep')) {
            epid = location.pathname.match(/ep(\d+)/)
            epid = parseInt(epid[1])
        }

        sid = sid || ''
        epid = epid || ''

        try {
            console.log('location sid:', sid, 'epid:', epid)
            const page_data = JSON.parse($('.toolbar').attr('mr-show'))
            main_title = page_data.msg.title
            sid = sid || page_data.msg.season_id
            epid = epid || page_data.msg.ep_id
            console.log('mr-show get sid:', sid, 'epid:', epid)
        } catch {
            console.warn('mr-show get err')
        }

        if (sid != bangumiCache.get('sid')) {
            bangumiCache.set('sid', sid)
            bangumiCache.set('epid', '')
            bangumiCache.set('hasData', false)
        }

        if (!!sid && !epid) {
            _ajax({
                url: `https://api.bilibili.com/pgc/player/web/v2/playurl?support_multi_audio=true&qn=80&fnver=0&fnval=4048&fourk=1&gaia_source=&from_client=BROWSER&is_main_page=true&need_fragment=true&season_id=${sid}&isGaiaAvoided=false&voice_balance=1&drm_tech_type=2`,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
            }).then(res => {
                if (res && !res.code) {
                    bangumiCache.set('epid', res.result.view_info.report.ep_id)
                }
            })
        }

        if (bangumiCache.get('lock')) {
            throw 'bangumiCache request waiting !'
        }
        bangumiCache.set('lock', true)
        _ajax({
            type: 'GET',
            url: `https://api.bilibili.com/pgc/view/web/ep/list?season_id=${sid}&ep_id=${epid}`,
            dataType: 'json',
            cache: true
        }).then(res => {
            if (res && !res.code) {
                bangumiCache.set('hasData', true)
                bangumiCache.set('episodes', res.result.episodes)
                bangumiCache.set('section', res.result.section || [])
            }
        }).finally(() => {
            bangumiCache.set('lock', false)
        })

        bangumiCache.set('href', location.href)

        if (!epid && !bangumiCache.get('epid')) {
            throw 'epid not found !'
        }

        if (!bangumiCache.get('hasData')) {
            throw 'bangumiCache no data !'
        }

        const episodes = bangumiCache.get('episodes') || []
        episodes.sort((a, b) => {
            return a.badge_type - b.badge_type
        })

        const isEpMap = {}
        for (const ep of episodes) {
            if (ep.badge_type == 0) {
                isEpMap[ep.id] = true
            }
        }

        const section = bangumiCache.get('section') || []
        for (const item of section) {
            if (!item.episodes) {
                continue
            }
            for (const ep of item.episodes) {
                episodes.push(ep)
            }
        }

        epid = epid || bangumiCache.get('epid')

        let _id = 0
        for (let i = 0; i < episodes.length; i++) {
            if (episodes[i].badge_type == 1) {
                episodes[i].title += '预告'
            }
            epMap[episodes[i].id] = episodes[i]
            if (episodes[i].id == epid) {
                _id = i
            }
        }

        const state = {
            p: _id + 1,
            epId: epid,
            epList: episodes,
            isEpMap,
            epMap,
            epInfo: epMap[epid]
        }

        const bangumi = new Bangumi(main_title, state)
        bangumiCache.set('build', bangumi)

        return bangumi
    }

    total() {
        return this.epList.length
    }

    getEpisode(p) {
        return p
            ? this.epList[this.id(p)]
            : this.epMap[this.epId] || this.epInfo || {}
    }

    getTotalPadLen() {
        let n = this.total(), len = 1
        while (n >= 1) {
            n = n / 10
            len++
        }
        return len
    }

    title(p) {
        p = p || 1
        const ep = this.getEpisode(p)
        let title
        if (this.isEpMap[ep.id]) {
            title = `${this.main_title} EP${('' + p).padStart(this.getTotalPadLen(), '0')} ${ep.long_title}`
        } else { // title long_title 可能不准确
            title = ep.share_copy.split('》', 2)
            if (title.length > 1) {
                title = `${this.main_title} ${title[1]}`
            } else {
                title = `${this.main_title} ${ep.title} ${ep.long_title}`
            }
        }

        return title.replaceAll('undefined', '').trim()
    }

    filename(p) {
        p = p || 1
        return this.title(p).replace(/[\/\\:*?"<>|]+/g, '')
    }

    aid(p) {
        const ep = this.getEpisode(p)

        return ep.aid
    }

    bvid(p) {
        const ep = this.getEpisode(p)

        return ep.bvid
    }

    cid(p) {
        const ep = this.getEpisode(p)

        return ep.cid
    }

    epid(p) {
        const ep = this.getEpisode(p)

        return ep.id
    }

    needVip(p) {
        const ep = this.getEpisode(p)

        return ep.badge === '会员'
    }

    vipNeedPay(p) {
        const ep = this.getEpisode(p)

        return ep.badge === '付费'
    }

    isLimited() {
        // todo
        return false
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
        return (`${this.main_title} EP${this.p(p)} ${this.title(p)}`).replace(/[\/\\:*?"<>|]+/g, '')
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
    VideoFestival,
    Bangumi,
    Cheese
}
