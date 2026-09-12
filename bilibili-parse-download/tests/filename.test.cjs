const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const vm = require('node:vm')

const ready = (async () => {
    const module = new vm.SourceTextModule(readFileSync(resolve(__dirname, '../src/js/utils/filename.js'), 'utf8'))
    await module.link(() => { throw new Error('Unexpected import') })
    await module.evaluate()
    return module.namespace
})()
const vb = {
    filename: p => `课程 P${p || 2}`,
    getName: () => '课程', title: p => `第${p || 2}讲`,
    p: p => p || 2, total: () => 12,
    bvid: p => `BV${p || 2}`, aid: () => 123,
    cid: p => 100 + (p || 2), epid: () => undefined
}

test('default names remain compatible and batch metadata follows requested parts', async () => {
    const { downloadFilename } = await ready
    assert.equal(downloadFilename(vb, ''), '课程 P2')
    assert.equal(downloadFilename(vb, '  ', 3), '课程 P3')
    for (const p of [3, 1, 2]) {
        assert.equal(downloadFilename(vb, '{title} P{p:03} {part} [{bvid}-{cid}]', p),
            `课程 P00${p} 第${p}讲 [BV${p}-${100 + p}]`)
    }
    assert.equal(downloadFilename(vb, '{default} {total} {aid} {epid}'), '课程 P2 12 123')
})

test('missing values, unknown tokens and empty output have predictable fallbacks', async () => {
    const { downloadFilename } = await ready
    assert.equal(downloadFilename(vb, '{epid}'), '课程 P2')
    assert.equal(downloadFilename(vb, '{unknown}'), '{unknown}')
    assert.equal(downloadFilename(vb, '{title}', 1), '课程')
    assert.equal(downloadFilename({ ...vb, getName: () => '{cid}' }, '{title}'), '{cid}')
})

test('custom basenames cannot introduce directories or invalid Windows filenames', async () => {
    const { sanitizeFilename } = await ready
    assert.equal(sanitizeFilename('../a\\b:c*?"<>|\n'), '.._a_b_c_______')
    assert.equal(sanitizeFilename('CON.txt'), '_CON.txt')
    assert.equal(sanitizeFilename('hello.  '), 'hello')
    assert.equal(sanitizeFilename('..'), '')
    const name = sanitizeFilename('课😀'.repeat(100))
    assert.ok(Buffer.byteLength(name) <= 180)
    assert.ok(!name.includes('\ufffd'))
})
