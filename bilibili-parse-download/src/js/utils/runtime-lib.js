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
        const promises = urls.map(url => {
            return {
                url, promise: _ajax({
                    url,
                    type: 'GET',
                    dataType: 'text',
                    cache: true,
                    error: () => null
                })
            }
        })
        let len = promises.length

        return new Promise((resolve, reject) => {
            if (this.moduleAsync) {
                resolve(getModule(window))
            }
            let i = 0
            promises.forEach(({ url, promise }) => { // 延时并发
                try {
                    setTimeout(() => {
                        this.moduleAsync = (async () => {
                            if (this.anyResolved) return
                            console.log(`[Runtime Library] Start download from ${url}`);
                            const code = await promise
                            if (!code || this.anyResolved) return
                            this.anyResolved = true
                            console.log(`[Runtime Library] Downloaded from ${url} , length = ${code.length}`);
                            (function runEval() {
                                return eval(code)
                            }).bind(window)()
                            resolve(getModule(window))

                        })() // = window.xxx
                    }, i++ * 1000)
                } catch (err) {
                    if (this.anyResolved) return
                    errs.push(err)
                    if (--len === 0) {
                        console.error(errs)
                        reject(errs)
                    }
                }
            })
        })
    }
}

export let JSZip // 伪同步
new RuntimeLib({
    urls: [
        'https://cdn.jsdelivr.net/npm/jszip@3.10.0/dist/jszip.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js',
        'https://cdn.bootcdn.net/ajax/libs/jszip/3.10.0/jszip.min.js',
        'https://cdn.staticfile.org/jszip/3.10.0/jszip.min.js'
    ],
    getModule: window => window.JSZip
}).getModulePromise().then(module => JSZip = module)

export let flvjs
new RuntimeLib({
    urls: [
        'https://cdn.jsdelivr.net/npm/flv.js@1.6.2/dist/flv.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/flv.js/1.6.2/flv.min.js',
        'https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.min.js',
        'https://cdn.staticfile.org/flv.js/1.6.2/flv.min.js'
    ],
    getModule: window => window.flvjs
}).getModulePromise().then(module => flvjs = module)

export let DPlayer
new RuntimeLib({
    urls: [
        'https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.26.0/DPlayer.min.js',
        'https://cdn.bootcdn.net/ajax/libs/dplayer/1.26.0/DPlayer.min.js',
        'https://cdn.staticfile.org/dplayer/1.26.0/DPlayer.min.js'
    ],
    getModule: window => window.DPlayer
}).getModulePromise().then(module => DPlayer = module)
