
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
 * @param {Function} onProgress - 回调函数，参数: (loaded, total)
 * @returns {Promise<Uint8Array>} 下载的数据
 */
async function fetchFileWithProgress(url, onProgress) {
    const res = await fetch(url)

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

export {
    toBlobURL,
    fetchFile,
    fetchFileWithProgress
}
