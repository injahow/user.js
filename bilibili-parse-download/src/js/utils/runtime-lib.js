import { ajax } from "./ajax"

class RuntimeLib {

    constructor(config) {
        this.config = config
        this.moduleAsync
    }

    getModulePromise() {
        return new Promise((resolve, reject) => {
            try {
                const { url, getModule } = this.config
                if (!this.moduleAsync) {
                    this.moduleAsync = (async () => {
                        console.log(`[Runtime Library] Start download from ${url}`)
                        const code = await ajax({ url, type: 'GET', dataType: 'text' })
                        console.log(`[Runtime Library] Downloaded from ${url} , length = ${code.length}`);
                        (function runEval() {
                            return eval(code)
                        }).bind(window)()
                        return getModule(window)
                    })() // = window.xxx
                }
                const library = this.moduleAsync
                resolve(library)
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }
}

export let JSZip // 伪同步
new RuntimeLib({
    url: 'https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js',
    getModule: window => window.JSZip
}).getModulePromise().then(module => JSZip = module)
