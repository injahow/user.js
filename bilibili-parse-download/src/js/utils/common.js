
/**
 * 获取文件并返回 Blob URL
 * @param {string} url - 文件 URL
 * @param {string} mimeType - 文件的 MIME 类型
 * @returns {Promise<string>} - BlobURL
 */
async function toBlobURL(url, mimeType) {
    console.log(`toBlobURL: Fetching ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
        const errorMsg = `toBlobURL: Failed to fetch ${url}: ${response.status} ${response.statusText}`
        console.error(errorMsg)
        throw new Error(errorMsg)
    }
    const buffer = await response.arrayBuffer()
    const blob = new Blob([buffer], { type: mimeType })
    const blobUrl = URL.createObjectURL(blob);
    console.log(`toBlobURL: Created Blob URL for ${url}`)
    return blobUrl
}

/**
 * 使用浏览器a标签下载 Blob URL
 * @param {string} blobUrl - Blob URL
 * @param {string} downloadname - 含后缀的文件名
 */
function downloadBlobURL(blobUrl, downloadname) {
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = downloadname
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
}

/**
 * 使用浏览器a标签下载 Blob 对象
 * @param {Blob} blob - Blob 对象
 * @param {string} downloadname - 含后缀的文件名
 */
function downloadBlob(blob, downloadname) {
    const blobUrl = URL.createObjectURL(blob)
    downloadBlobURL(blobUrl, downloadname)
}

/**
 * 下载文件
 * @param {string} url - 文件 URL
 * @returns {Promise<Uint8Array>} - 获取的文件数据
 */
async function fetchFile(url) {
    var resp = await fetch(url)
    var buffer = await resp.arrayBuffer()
    return new Uint8Array(buffer)
}

/**
 * 带进度下载文件
 * @param {string} url - 文件 URL
 * @param {Object} options - 配置选项
 * @param {Function} [options.onProgress] - 进度回调函数，接收 (loaded: number, total: number) 两个参数
 * @param {AbortSignal} [options.signal] - 可选的 AbortSignal，用于取消请求（来自 AbortController.signal）
 * @returns {Promise<Uint8Array>} 下载的数据
 */
async function fetchFileWithProgress(url, { onProgress, signal }) {
    const res = await fetch(url, {
        signal
    })

    if (!res.body) {
        throw new Error('URL下载失败: ' + url)
    }

    const contentLength = res.headers.get('content-length')
    const total = contentLength ? parseInt(contentLength, 10) : 0
    const reader = res.body.getReader()

    let loaded = 0
    const chunks = []

    while (true) {
        const { done, value } = await reader.read()

        if (value) {
            chunks.push(value)
            loaded += value.length
            // 调用进度回调
            if (onProgress) {
                onProgress(loaded, total)
            }
        }

        if (done) break
    }

    // 合并 chunk
    const dataArray = new Uint8Array(loaded)
    let pos = 0
    for (const chunk of chunks) {
        dataArray.set(chunk, pos)
        pos += chunk.length
    }

    return dataArray
}

/**
 * 将字节大小格式化为可读的字符串（自动选择单位）
 * @param {number} bytes - 字节数
 * @param {number} [decimalPlaces=2] - 小数位数
 * @returns {string} 格式化后的大小，如 "1.23 GB"
 */
function prettyBytes(bytes, decimalPlaces = 2) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    // 保留指定小数位
    const formatted = size.toFixed(decimalPlaces);
    return `${formatted} ${units[unitIndex]}`;
}

export {
    toBlobURL,
    downloadBlob,
    downloadBlobURL,
    fetchFile,
    fetchFileWithProgress,
    prettyBytes
}
