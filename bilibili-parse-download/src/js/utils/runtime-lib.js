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

const cdn_map = {
    cloudflare: (name, ver, filename) =>
        `https://cdnjs.cloudflare.com/ajax/libs/${name}/${ver}/${filename}`,
    bootcdn: (name, ver, filename) =>
        `https://cdn.bootcdn.net/ajax/libs/${name}/${ver}/${filename}`,
    jsdelivr: (name, ver, filename) =>
        `https://cdn.jsdelivr.net/npm/${name}@${ver}/${filename}`,
    staticfile: (name, ver, filename) =>
        `https://cdn.staticfile.org/${name}/${ver}/${filename}`
}

const urls = ({ name, ver, filename, cdn_keys }) => {
    cdn_keys = cdn_keys ? cdn_keys.filter(key => key in cdn_map) : Object.keys(cdn_map)
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
        iframe.remove()
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
    new RuntimeLib({
        urls: urls({ name, ver, filename }), getModule
    }).getModulePromise().then(script => {
        const blob = new Blob([handleScript(script)], { type: 'text/javascript' })
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
    }).catch(err => {
        console.error(`[Runtime Library] Failed to load ${name} from local`, err)
    })
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
