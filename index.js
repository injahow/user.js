
import scriptConfigs from './scripts/config.json'
import { initLocal } from './scripts/runtime.js'

function start() {
    const url = location.href

    const matchedScripts = scriptConfigs.filter(config => {
        return config.matches.some(pattern => miniglob(url, pattern))
    })

    if (matchedScripts.length === 0) {
        console.log('[user.js] matchedScripts is empty')
        return
    }

    console.log(`[user.js] matchedScripts count: ${matchedScripts.length}`)
    initLocal(matchedScripts)
}


function miniglob(url, pattern) {
    // todo
    const regex = pattern
        .replace(/[\\^$+.?|()[\]{}]/g, '\\$&')  // 转义正则特殊字符，保留 *
        .replace(/\*/g, '.*')                   // 将 * 替换为 .*

    const regexp = new RegExp(`^${regex}$`, 'i')  // 忽略大小写
    return regexp.test(url)
}

console.log('[user.js] scriptConfigs:', scriptConfigs)
start()
