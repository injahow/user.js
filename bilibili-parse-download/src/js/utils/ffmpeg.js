import { Message } from '../ui/message';
import { FFmpegWASM } from './runtime-lib';
import { fetchFileWithProgress, toBlobURL } from './common';

/**
 * 使用 ffmpeg.wasm 合成视频
 * @param {string} videoUrl - 视频 URL
 * @param {string} audioUrl - 音频 URL
 * @param {function} showProgress - 进度回调函数
 */
async function mergeVideoAndAudio(videoUrl, audioUrl, showProgress) {

    if (!videoUrl || videoUrl === '#') {
        Message.warning('视频地址为空')
        return
    }

    if (!audioUrl || audioUrl === '#') {
        Message.warning('音频地址为空')
        return
    }

    showProgress = showProgress || ((data) => {
        console.log('[ffmpeg] Progress: ', data)
    })

    showProgress({
        message: '正在初始化FFmpeg'
    })
    const ffmpeg = new FFmpegWASM.FFmpeg()

    const load = async () => {
        let tryMultiThread = true
        // const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
        const baseFFmpegUrl = 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd'
        const baseCoreUrl = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd'
        const baseCoreMTUrl = 'https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/umd'
        ffmpeg.on('log', ({ message }) => {
            console.log('[ffmpeg]', message)
        })

        if (tryMultiThread && window.crossOriginIsolated) {
            console.log('[ffmpeg] 多线程模式')
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseCoreMTUrl}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseCoreMTUrl}/ffmpeg-core.wasm`, 'application/wasm'),
                workerURL: await toBlobURL(`${baseCoreMTUrl}/ffmpeg-core.worker.js`, 'application/javascript'),
                workerLoadURL: await toBlobURL(`${baseFFmpegUrl}/814.ffmpeg.js`, 'text/javascript')
            })
        } else {
            console.log('[ffmpeg] 单线程模式')
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseCoreUrl}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseCoreUrl}/ffmpeg-core.wasm`, 'application/wasm'),
                workerLoadURL: await toBlobURL(`${baseFFmpegUrl}/814.ffmpeg.js`, 'text/javascript')
            })
        }
    }

    await load()

    try {
        showProgress({
            message: '准备下载视频和音频'
        })
        // 统一显示总进度
        let [videoLoaded, audioLoaded, videoTotal, audioTotal] = [
            0, 0, 0, 0
        ]
        const updateProgress = () => {
            const totalBytes = videoTotal + audioTotal;
            const loadedBytes = videoLoaded + audioLoaded;
            const overallPercent = totalBytes > 0 ? Math.floor((loadedBytes / totalBytes) * 100) : 0

            const msg = `
                下载进度: ${overallPercent}% </br>
                视频: ${Math.floor(videoLoaded / (1024 * 1024))}MB / ${Math.floor(videoTotal / (1024 * 1024))}MB </br>
                音频: ${Math.floor(audioLoaded / (1024 * 1024))}MB / ${Math.floor(audioTotal / (1024 * 1024))}MB </br>
            `.trim().replace(/\n\s*/g, '\n');

            showProgress({
                message: msg
            })
        }
        // 并行发起下载任务
        const [videoData, audioData] = await Promise.all([
            fetchFileWithProgress(videoUrl, (loaded, total) => {
                videoLoaded = loaded;
                videoTotal = total;
                updateProgress();
            }),
            fetchFileWithProgress(audioUrl, (loaded, total) => {
                audioLoaded = loaded;
                audioTotal = total;
                updateProgress();
            })
        ])

        // 写入文件
        await ffmpeg.writeFile('video.m4s', videoData)
        await ffmpeg.writeFile('audio.m4s', audioData)

        showProgress({
            message: '正在合并视频和音频'
        })
        await ffmpeg.exec(['-i', 'video.m4s', '-i', 'audio.m4s', '-c', 'copy', 'output.mp4'])

        showProgress({
            message: '合并成功，请等待浏览器保存文件'
        })
        const mergedData = await ffmpeg.readFile('output.mp4')

        return Promise.resolve(new Blob([mergedData.buffer], { type: 'video/mp4' }))
    } catch (error) {
        console.error('Error merging streams:', error)
        return Promise.reject(error)
    }
}

export const ffmpeg = {
    mergeVideoAndAudio
}
