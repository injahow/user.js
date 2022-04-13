
const getBanner = meta => `${meta.main.map(e => {
    if (typeof e === 'object') {
        return Object.entries(e).map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(item => `// @${key.padEnd(14, ' ')}${item}`).join('\n')
            }
            return `// @${key.padEnd(14, ' ')}${value}`
        }).join('\n')
    }
    return `// ${e}`
}).join('\n')}\n${meta.last.join('\n')}`

module.exports = {
    getBanner
}
