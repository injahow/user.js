
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

const MAX_HEADER_START_BYTES = 1024 * 32  // 头部查找范围 32KB
const MAX_HEADER_TOTAL_BYTES = 1024 * 16  // 头部大小限制 16KB
const MAX_LINE_LENGTH = 1024 * 2          // 单行查询范围 2KB

/**
 * 流式提取 Userscript 头部
 */
async function extractUserScriptHeader(filePath) {
    let header = ''
    let inHeader = false
    let foundEnd = false
    let totalBytes = 0
    const stream = createReadStream(filePath, 'utf8')
    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity,
    })
    try {
        for await (const line of rl) {
            const lineBytes = Buffer.byteLength(line, 'utf8')
            // 未进入头部，限制总字节数
            if (!inHeader) {
                totalBytes += lineBytes + 1
                if (totalBytes > MAX_HEADER_START_BYTES) {
                    throw new Error(`超过 ${MAX_HEADER_START_BYTES / 1024}KB 仍未找到 // ==UserScript==，可能不是 Userscript`)
                }
            }

            // 检查单行长度
            if (line.length > MAX_LINE_LENGTH) {
                throw new Error(`单行过长（>${MAX_LINE_LENGTH} 字符），疑似非脚本文件`)
            }

            const trimmed = line.trim()
            // 找到头部起始
            if (trimmed === '// ==UserScript==') {
                inHeader = true
                header = line + '\n'
                totalBytes = Buffer.byteLength(header, 'utf8')
                continue
            }

            // 在头部中，继续收集
            if (inHeader) {
                const newHeader = header + line + '\n'
                const newTotalBytes = Buffer.byteLength(newHeader, 'utf8')
                // 检查总头部大小
                if (newTotalBytes > MAX_HEADER_TOTAL_BYTES) {
                    throw new Error(`Userscript 头部超过 ${MAX_HEADER_TOTAL_BYTES / 1024}KB 限制`)
                }

                header = newHeader

                if (trimmed === '// ==/UserScript==') {
                    foundEnd = true
                    break
                }
            }
        }
    } catch (err) {
        stream.destroy()
        throw err
    } finally {
        rl.removeAllListeners()
        stream.destroy()
    }

    if (!inHeader) {
        throw new Error('未找到 // ==UserScript== 起始标记')
    }

    if (!foundEnd) {
        throw new Error('未找到 // ==/UserScript== 结束标记')
    }

    return header.trimEnd()
}


/**
 * 从一行中提取 @key 的值，支持 // 后任意空白（空格/tabs）
 * @param {string} line - 如 "//   @match  https://xxx.com/abc*  "
 * @param {string} key  - 如 "match"
 * @returns {string|null}
 */
function extractMetaValue(line, key) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('//')) return null
    const atKey = `@${key}`
    const atKeyIndex = trimmed.indexOf(atKey)
    if (atKeyIndex < 2) return null
    const between = trimmed.slice(2, atKeyIndex).trim()
    if (between !== '') return null
    const valueStart = atKeyIndex + atKey.length
    const value = trimmed.slice(valueStart).trim()
    return value || null
}

export {
    extractUserScriptHeader,
    extractMetaValue,
}
