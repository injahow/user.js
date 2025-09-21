
import { fileURLToPath } from 'url'
import { join, resolve, basename } from 'path'
import { unlinkSync, existsSync, readFileSync, writeFileSync } from 'fs'

import { extractUserScriptHeader } from './utils.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')

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

/**
 * 生成 meta.json：聚合脚本的元信息
 * @param {Array<{ matches: string[], requires: string[] }>} scriptConfigs
 */
async function createMetaJson(scriptConfigs) {
    const metaPath = resolve(ROOT, 'scripts/meta.json')

    if (existsSync(metaPath)) {
        unlinkSync(metaPath)
        console.log(`clean old file: ${metaPath}`)
    }

    // 合并脚本元数据
    let mainConfig = null
    const mainConfigPath = resolve(ROOT, 'meta.config.json')
    if (existsSync(mainConfigPath)) {
        mainConfig = JSON.parse(readFileSync(mainConfigPath, 'utf-8'))
    } else {
        throw new Error('mainConfig not found:', mainConfigPath)
    }

    // 获取版本
    const rootPkgPath = resolve(ROOT, 'package.json')
    if (existsSync(rootPkgPath)) {
        const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'))
        mainConfig.version = rootPkg.version || mainConfig.version
    }

    // 去重
    const allMatches = new Set()
    const allRequires = new Set()
    scriptConfigs.forEach((config) => {
        config.matches?.forEach((m) => allMatches.add(m))
        config.requires?.forEach((r) => allRequires.add(r))
    })

    // 排序
    mainConfig.match = [...allMatches].sort()
    mainConfig.require = [...allRequires].sort()

    const metaContent = {
        main: ['==UserScript==', mainConfig, '==/UserScript=='],
        last: [
            '// @[ You can find all source codes in GitHub repo ]',
        ]
    }

    writeFileSync(metaPath, JSON.stringify(metaContent, null, 2), 'utf-8')
    console.log(`Created meta.json success, path: ${metaPath}`)
    console.log(`@match count : ${mainConfig.match.length}`)
    console.log(`@require count : ${mainConfig.require.length}`)
}

/**
 * 提取子脚本元数据，生成 config.json 和 meta.json
 */
async function createJsonConfig(projects) {

    const scriptConfigs = []

    for (const { dir, pkg, name } of projects) {
        const srcPath = join(dir, pkg.main)
        const outPath = join(DIST, basename(pkg.main))

        if (!existsSync(srcPath)) {
            console.warn(`output file not found: ${srcPath}`)
            continue
        }

        // 拷贝文件到 dist
        writeFileSync(outPath, readFileSync(srcPath))
        console.log(`copied: ${basename(pkg.main)}`)

        // 提取 Userscript 头部
        let header
        try {
            header = await extractUserScriptHeader(srcPath)
        } catch (err) {
            console.warn(`not found valid userscript header: ${name} , err: ${err.message}`)
            continue
        }

        // 解析元数据
        const lines = header.trim().split('\n')
        const config = {
            name: pkg.name,
            downloadURL: null,
            matches: [],
            requires: []
        }

        for (const line of lines) {
            const downloadURL = extractMetaValue(line, 'downloadURL')
            if (downloadURL) {
                config.downloadURL = downloadURL
            }

            const match = extractMetaValue(line, 'match')
            if (match) {
                config.matches.push(match)
            }

            const requireValue = extractMetaValue(line, 'require')
            if (requireValue) {
                config.requires.push(requireValue)
            }
        }

        if (!config.downloadURL) {
            console.warn(`not found @downloadURL: ${name}`)
            continue
        }

        scriptConfigs.push(config)
    }

    // 生成 config.json
    const configPath = resolve(ROOT, 'scripts/config.json')
    if (existsSync(configPath)) {
        unlinkSync(configPath)
        console.log(`clean old file: ${configPath}`)
    }
    writeFileSync(configPath, JSON.stringify(scriptConfigs, null, 2), 'utf-8')
    console.log(`Created scripts.json success, path: ${configPath}`)

    // 生成 meta.json
    await createMetaJson(scriptConfigs)
}

export {
    createJsonConfig
}
