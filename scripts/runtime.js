/**
 * 动态加载脚本 fetch
 * @param {string} url
 * @returns {Promise<string|null>} 成功返回源码，失败返回 null
 */
async function tryFetchScript(url) {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)
        const response = await fetch(url, { signal: controller.signal })
        clearTimeout(timeoutId)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return await response.text()
    } catch (err) {
        console.warn(`[Runtime] Fetch err: ${url}`, err)
        return null
    }
}

/**
 * 动态注入 <script> 返回 Promise
 * @param {string} src
 * @returns {Promise<void>}
 */
function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => {
            console.log(`[Runtime] inject success: ${src}`)
            resolve()
        }
        script.onerror = () => reject(new Error(`Failed to load ${src}`))
        document.head.appendChild(script)
    })
}

/**
 * 执行单个用户脚本
 * @param {Array<string>} requires
 * @param {string} mainCode
 * @param {string} mainURL
 */
async function executeUserScriptWithFallback(requires, mainCode, mainURL) {

    const fetchPromises = requires.map(url => tryFetchScript(url))
    const requireCodes = await Promise.all(fetchPromises)

    // fetch成功，合并执行
    if (requireCodes.every(code => code !== null)) {
        const allCode = requireCodes.join('\n') + `\n${mainCode}`
        try {
            const run = new Function('unsafeWindow', `with (unsafeWindow) {\n${allCode}\n}`)
            run(unsafeWindow)
            console.log(`[Runtime] execute (fetch): ${mainURL}`)
            return
        } catch (e) {
            console.error(`[Runtime] execute (fetch) err: ${mainURL}`, e)
        }
    }

    // fetch失败，拆分执行(html)
    console.warn(`[Runtime] user script html fallback: ${mainURL}`)
    try {
        // 依赖
        await Promise.all(
            requires.map(url =>
                injectScript(url).catch(err => {
                    console.error(`[Runtime] inject script html err: ${url}`, err)
                })
            )
        )
        // 主脚本
        const run = new Function('unsafeWindow', `with (unsafeWindow) {\n${mainCode}\n}`)
        run(unsafeWindow)
        console.log(`[Runtime] loaded script, url: ${mainURL}`)
    } catch (e) {
        console.error(`[Runtime] load script, url: ${mainURL}, err: `, e)
    }
}

/**
 * 初始化已匹配的脚本列表
 */
async function initLocal(datas) {
    if (!Array.isArray(datas) || datas.length === 0) {
        console.log('[Runtime] no scripts matched')
        return
    }

    console.log(`[Runtime] start loading ${datas.length} scripts`)
    for (const { name, downloadURL, requires = [] } of datas) {
        try {
            console.log(`[Runtime] loading ${name} -> ${downloadURL}`)
            const mainCode = await tryFetchScript(downloadURL)
            if (!mainCode) {
                console.error(`[Runtime] fetch err pass, url: ${downloadURL}`)
                continue
            }
            await executeUserScriptWithFallback(requires, mainCode, downloadURL)
        } catch (err) {
            console.error(`[Runtime] init script ${name}, err: `, err)
        }
    }
}

export {
    initLocal
}
