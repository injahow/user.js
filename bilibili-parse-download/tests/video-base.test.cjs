const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const vm = require('node:vm')

// Load the browser ES module without pulling in jQuery or browser UI dependencies.
const videoModule = new vm.SourceTextModule(readFileSync(resolve(__dirname, '../src/js/utils/video-base.js'), 'utf8'))
const ready = (async () => {
    await videoModule.link(specifier => new vm.SourceTextModule(
        specifier === './cache'
            ? 'export default {}'
            : 'export function _ajax() { throw new Error("Unexpected network request") }'
    ))
    await videoModule.evaluate()
    return videoModule.namespace.Video
})()

function state() {
    return {
        p: 2,
        cid: 39419840410,
        aid: 123,
        bvid: 'BV-test',
        videoData: {
            pages: [
                { cid: 39419839791, part: '入门指南' },
                { cid: 39419840410, part: '01-Agent基本概念' },
                { cid: 39419840664, part: '02-Agent的分类' }
            ]
        }
    }
}

test('batch parts keep their own CID and matching title while another part is playing', async () => {
    const Video = await ready
    const data = state()
    const video = new Video('课程', data)
    for (const p of [3, 1, 2]) {
        assert.equal(video.cid(p), data.videoData.pages[p - 1].cid)
        assert.equal(video.title(p), data.videoData.pages[p - 1].part)
        assert.equal(video.bvid(p), data.bvid)
        assert.equal(video.cid(String(p)), video.cid(p))
    }
})

test('current-video calls retain the playing CID even if state.p is stale', async () => {
    const Video = await ready
    const data = state()
    data.p = 1
    const video = new Video('课程', data)
    assert.equal(video.cid(), data.cid)
    assert.equal(video.cid(0), data.cid)
})

test('current-video calls fall back to the current page when state.cid is absent', async () => {
    const Video = await ready
    const data = state()
    delete data.cid
    assert.equal(new Video('课程', data).cid(), data.videoData.pages[1].cid)
})

test('single-part videos still resolve correctly', async () => {
    const Video = await ready
    const data = state()
    data.p = 1
    data.videoData.pages = [data.videoData.pages[1]]
    const video = new Video('单视频', data)
    assert.equal(video.cid(), data.cid)
    assert.equal(video.cid(1), data.cid)
})

test('collections retain the selected episode and part CID', async () => {
    const Video = await ready
    const data = state()
    data.sections = [{ episodes: [
        { aid: 456, bvid: 'BV-other', title: '合集视频', pages: [
            { cid: 111, part: '上' }, { cid: 222, part: '下' }
        ] }
    ] }]
    const video = new Video('合集', data)
    assert.equal(video.cid(1), 111)
    assert.equal(video.cid(2), 222)
    assert.equal(video.bvid(2), 'BV-other')
    assert.equal(video.cid(), data.cid)
})
