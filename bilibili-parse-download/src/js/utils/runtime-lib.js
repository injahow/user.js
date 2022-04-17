import { ajax } from "./ajax"

class RuntimeLib {

    constructor(config) {
        this.config = config
        this.modulePromise
    }

    getModuleAsync() {
        return new Promise((resolve, reject) => {
            try {
                const { url, getModule } = this.config
                if (!this.modulePromise) {
                    this.modulePromise = (async () => {
                        console.log(`[Runtime Library] Start download from ${url}`)
                        const code = await ajax({ url, dataType: 'text' })
                        console.log(`[Runtime Library] Downloaded from ${url} , length = ${code.length}`);
                        (function runEval() {
                            return eval(code)
                        }).bind(window)()
                        return getModule(window)
                    })() // = window.xxx
                }
                const library = this.modulePromise
                return resolve(library)
            } catch (error) {
                reject(error)
                throw error
            }
        })
    }
}

export const JSZipAsync = new RuntimeLib({
    url: 'https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js',
    getModule: window => window.JSZip,
}).getModuleAsync() // eval -> window.xxx
export const JSZip = window.JSZip // 伪同步
