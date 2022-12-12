import { _ajax } from './ajax'

class RuntimeLib {

    constructor(config) {
        this.config = config
        this.moduleAsync
        this.anyResolved = false
    }

    getModulePromise() {
        const { urls, getModule } = this.config
        const errs = []

        return new Promise((resolve, reject) => {
            let i = 0
            urls.forEach(url => { // 延时并发
                setTimeout(async () => {
                    try {
                        if (this.anyResolved) return
                        console.log(`[Runtime Library] Start download from ${url}`)
                        const code = await _ajax({
                            url,
                            type: 'GET',
                            dataType: 'text',
                            cache: true
                        })
                        if (this.anyResolved) return
                        this.anyResolved = true
                        console.log(`[Runtime Library] Downloaded from ${url} , length = ${code.length}`);
                        (function runEval() {
                            return eval(code)
                        }).bind(window)()
                        resolve(getModule(window))
                    } catch (err) {
                        if (this.anyResolved) return
                        errs.push({ url, err })
                        if (--i === 0) {
                            console.error(errs)
                            reject(errs)
                        }
                    }
                }, i++ * 1000)
            })
        })
    }
}

const cdn_map = {
    jsdelivr: (name, ver, filename) =>
        `https://cdn.jsdelivr.net/npm/${name}@${ver}/dist/${filename}`,
    cloudflare: (name, ver, filename) =>
        `https://cdnjs.cloudflare.com/ajax/libs/${name}/${ver}/${filename}`,
    bootcdn: (name, ver, filename) =>
        `https://cdn.bootcdn.net/ajax/libs/${name}/${ver}/${filename}`,
    staticfile: (name, ver, filename) =>
        `https://cdn.staticfile.org/${name}/${ver}/${filename}`
}

const urls = ({ name, ver, filename, cdn_keys }) => {
    cdn_keys = cdn_keys ? cdn_keys.filter(key => key in cdn_map) : Object.keys(cdn_map)
    return cdn_keys.map(k => cdn_map[k](name, ver, filename))
}

const init = (name, ver, filename, getModule) => {
    new RuntimeLib({
        urls: urls({ name, ver, filename }), getModule
    }).getModulePromise().then(null)
}

// 伪同步
export let JSZip
init('jszip', '3.10.0', 'jszip.min.js', w => JSZip = w.JSZip)
export let flvjs
init('flv.js', '1.6.2', 'flv.min.js', w => flvjs = w.flvjs)
export let DPlayer
init('dplayer', '1.26.0', 'DPlayer.min.js', w => DPlayer = w.DPlayer)
