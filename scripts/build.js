import { exec } from 'child_process'
import { readdirSync, statSync, existsSync, rmSync, mkdirSync, readFileSync } from 'fs'
import { join, resolve, basename } from 'path'
import { fileURLToPath } from 'url'
import { createJsonConfig } from './load.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')

// 并发限制
const MAX_CONCURRENT = 4

async function buildAll() {

    console.log('clean dist...')
    if (existsSync(DIST)) {
        rmSync(DIST, { recursive: true, force: true })
    }
    mkdirSync(DIST, { recursive: true })

    const dirs = readdirSync(ROOT)
        .map(dir => join(ROOT, dir))
        .filter(dir => statSync(dir).isDirectory())
        .filter(dir => !['node_modules', 'dist', 'scripts', '.git'].includes(basename(dir)))

    const projects = []
    for (const dir of dirs) {
        const pkgPath = join(dir, 'package.json')
        if (!existsSync(pkgPath)) continue

        let pkg
        try {
            const content = readFileSync(pkgPath, 'utf-8')
            pkg = JSON.parse(content)
        } catch (err) {
            console.error(`读取或解析 package.json 失败: ${pkgPath}`)
            continue
        }

        if (!pkg.scripts?.build || !pkg.main) {
            console.warn(`跳过项目（缺少 build 脚本或 main 字段）: ${pkg.name || basename(dir)}`)
            continue
        }

        projects.push({ dir, pkg, name: basename(dir) })
    }

    if (projects.length === 0) {
        console.log('无可构建的项目')
        return
    }

    console.log(`发现 ${projects.length} 个可构建项目\n`)


    const builtProjects = []
    const failedProjects = []
    const startTime = Date.now()

    // 控制并发数量
    for (let i = 0; i < projects.length; i += MAX_CONCURRENT) {
        const chunk = projects.slice(i, i + MAX_CONCURRENT)

        const chunkPromises = chunk.map(({ dir, pkg, name }) => {
            const startTime = Date.now()
            const projectLabel = `${name} - ${pkg.name}`
            console.log(`正在构建: ${projectLabel} ...`)

            return new Promise((resolve) => {
                exec('npm run build', { cwd: dir, stdio: 'inherit' }, (error) => {
                    const duration = ((Date.now() - startTime) / 1000).toFixed(1)
                    if (error) {
                        console.error(`构建失败: ${projectLabel} (耗时 ${duration}s)`)
                        failedProjects.push({ dir, pkg, name, error })
                    } else {
                        console.log(`构建成功: ${projectLabel} (耗时 ${duration}s)`)
                        builtProjects.push({ dir, pkg, name })
                    }
                    resolve()
                })
            })
        })

        await Promise.all(chunkPromises)
    }
    // 构建结果汇总
    console.log(`\n构建完成, 总数: ${projects.length}\n` +
        `成功: ${builtProjects.length}\n` +
        `失败: ${failedProjects.length}\n` +
        `耗时: ${((Date.now() - startTime) / 1000).toFixed(1)}s\n`)

    if (failedProjects.length > 0) {
        console.error('\n失败项目列表:')
        failedProjects.forEach(({ name, pkg }) => {
            console.error(`  - ${name}/${pkg.name}`)
        })
    }

    if (builtProjects.length > 0) {
        console.log('准备生成配置文件')
        await createJsonConfig(builtProjects)
        console.log('构建完成')
    } else {
        console.warn('没有项目需要构建')
        process.exit(1)
    }

    if (failedProjects.length > 0) {
        process.exit(1)
    }
}

// 执行
buildAll().catch(err => {
    console.error('构建脚本执行出错:', err)
    process.exit(1)
})
