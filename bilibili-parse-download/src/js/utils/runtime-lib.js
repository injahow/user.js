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
        if (!urls || !urls.length) {
            return Promise.reject(new Error('No urls provided'))
        }

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
                        console.log(`[Runtime Library] Downloaded from ${url} , length = ${code.length}`)
                        this.anyResolved = true
                        resolve(code)
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

// for unpkg & jsdelivr
const filename_npm_mapping = {
    'jszip.min.js': 'dist/jszip.min.js',
    'flv.min.js': 'dist/flv.min.js',
    'DPlayer.min.js': 'dist/DPlayer.min.js'
}
const cdn_support_mapping = {
    '@ffmpeg/ffmpeg': ['unpkg', 'jsdelivr']
}

const cdn_map = {
    cloudflare: (name, ver, filename) => {
        return `https://cdnjs.cloudflare.com/ajax/libs/${name}/${ver}/${filename}`
    },
    unpkg: (name, ver, filename) => {
        filename = filename_npm_mapping[filename] || filename
        return `https://unpkg.com/${name}@${ver}/${filename}`
    },
    jsdelivr: (name, ver, filename) => {
        filename = filename_npm_mapping[filename] || filename
        return `https://cdn.jsdelivr.net/npm/${name}@${ver}/${filename}`
    },
    staticfile: (name, ver, filename) => {
        return `https://cdn.staticfile.org/${name}/${ver}/${filename}`
    },
    bootcdn: (name, ver, filename) => {
        return `https://cdn.bootcdn.net/ajax/libs/${name}/${ver}/${filename}`
    }
}

const urls = ({ name, ver, filename, cdn_keys }) => {
    let support = cdn_support_mapping[name]
    if (support) {
        cdn_keys = cdn_keys ? cdn_keys.filter(key => key in cdn_map && support.includes(key)) : support.filter(key => key in cdn_map)
    } else {
        cdn_keys = cdn_keys ? cdn_keys.filter(key => key in cdn_map) : Object.keys(cdn_map)
    }
    return cdn_keys.map(k => cdn_map[k](name, ver, filename))
}

// 使用iframe异步加载，隔离window
const runtime_div = document.createElement('div')
runtime_div.id = 'bp_runtime_div'
runtime_div.style.display = 'none'
if (!document.getElementById(runtime_div.id)) {
    document.body.appendChild(runtime_div)
}

const iframeInvoke = (scripts, getModules) => {
    console.log('[Runtime Library] iframe invoke scripts, size =', scripts.length)
    // ! html
    const scriptTags = scripts.map(code => `<script>${code}</script>`).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Runtime Library</title></head><body>${scriptTags}</body></html>`
    const blobUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
    const iframe = document.createElement('iframe')
    const clearIframe = () => {
        clearTimeout(timeoutId)
        URL.revokeObjectURL(blobUrl)
        // iframe.remove()
    }
    const timeoutId = setTimeout(() => { // 超时处理
        console.error('[Runtime Library] Script loading timed out');
        clearIframe();
    }, 10000)
    iframe.src = blobUrl
    iframe.onload = () => {
        console.log('[Runtime Library] Script loaded in iframe')
        for (const getModule of getModules) {
            try {
                getModule(iframe.contentWindow)
            } catch (err) {
                console.error('[Runtime Library] Error in getModule:', err)
            }
        }
        clearIframe()
    }
    iframe.onerror = () => {
        console.error('[Runtime Library] Failed to load script in iframe')
        clearIframe()
    }
    runtime_div.appendChild(iframe)
}

let count = 0
const scripts = [], getModules = []
const initIframe = (name, ver, filename, getModule) => {
    count++
    new RuntimeLib({
        urls: urls({ name, ver, filename }), getModule
    }).getModulePromise().then(script => {
        scripts.push(script)
        getModules.push(getModule)
    }).catch(err => {
        console.error(`[Runtime Library] Failed to load ${name} from CDN`, err)
    }).finally(() => {
        if (--count === 0) {
            iframeInvoke(scripts, getModules)
            console.log('[Runtime Library] iframe invoke complete')
        }
    })
}

const initLocal = (name, ver, filename, getModule, handleScript) => {
    handleScript = handleScript || (script => script)
    try {
        (async () => {
            let script = await new RuntimeLib({
                urls: urls({ name, ver, filename }), getModule
            }).getModulePromise()
            const blob = new Blob([await handleScript(script)], { type: 'text/javascript' })
            const blob_url = URL.createObjectURL(blob)
            const script_tag = document.createElement('script')
            script_tag.src = blob_url
            script_tag.onload = () => {
                console.log(`[Runtime Library] Loaded ${name} from local`)
                getModule(window)
                URL.revokeObjectURL(blob_url)
            }
            script_tag.onerror = () => {
                console.error(`[Runtime Library] Failed to load ${name} from local`)
                URL.revokeObjectURL(blob_url)
            }
            runtime_div.appendChild(script_tag)
        })()
    } catch (err) {
        console.error(`[Runtime Library] Failed to load ${name} from local`, err)
    }
}

export let JSZip
initIframe('jszip', '3.10.0', 'jszip.min.js', w => JSZip = w.JSZip)
export let flvjs
initLocal('flv.js', '1.6.2', 'flv.min.js', w => flvjs = w.flvjs)
export let DPlayer
initLocal('dplayer', '1.26.0', 'DPlayer.min.js',
    w => DPlayer = w.DPlayer,
    script => script.replace('"About author"', '"About DIYgod"')
)
export let QRCode
initIframe('qrcodejs', '1.0.0', 'qrcode.min.js', w => QRCode = w.QRCode)
export let md5
initIframe('blueimp-md5', '2.19.0', 'js/md5.min.js', w => md5 = w.md5)
export let FFmpegWASM
initLocal('@ffmpeg/ffmpeg', '0.12.15', 'dist/umd/ffmpeg.js',
    w => FFmpegWASM = w.FFmpegWASM,
    script => script.replace('new URL(e.p+e.u(814),e.b)', `r.workerLoadURL`)
)
