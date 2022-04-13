
import { video } from './utils/video'

class User {
    constructor() {
        this.is_login = false
        this.vip_status = 0
        this.mid = ''
        this.uname = ''
        this.has_init = false
        this.lazyInit()
    }

    needReplace() {
        return !this.is_login || (!this.vip_status && video.base().need_vip());
    }

    lazyInit(last_init) {
        if (!this.has_init) {
            if (window.__BILI_USER_INFO__) {
                this.is_login = window.__BILI_USER_INFO__.isLogin;
                this.vip_status = window.__BILI_USER_INFO__.vipStatus;
                this.mid = window.__BILI_USER_INFO__.mid || '';
                this.uname = window.__BILI_USER_INFO__.uname || '';
            } else if (window.__BiliUser__) {
                this.is_login = window.__BiliUser__.isLogin;
                if (window.__BiliUser__.cache) {
                    this.vip_status = window.__BiliUser__.cache.data.vipStatus;
                    this.mid = window.__BiliUser__.cache.data.mid || '';
                    this.uname = window.__BiliUser__.cache.data.uname || '';
                } else {
                    this.vip_status = 0;
                    this.mid = '';
                    this.uname = '';
                }
            }
            this.has_init = last_init;
        }
    }
}

export const user = new User()
