// Templates describe the basename only; download handlers append the actual extension.
export function sanitizeFilename(value) {
    let name = String(value ?? '').replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, '_').trim()
    // Leave space for extensions and subtitle language suffixes (also on UTF-8 filesystems).
    let bytes = 0
    const encoder = new TextEncoder()
    name = Array.from(name).filter(char => {
        bytes += encoder.encode(char).length
        return bytes <= 180
    }).join('').replace(/[. ]+$/g, '')
    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name)) name = '_' + name
    return name
}

export function downloadFilename(vb, template, p) {
    const fallback = vb.filename(p)
    if (typeof template !== 'string' || !template.trim()) return fallback
    const fields = {
        default: () => fallback,
        title: () => vb.getName(),
        part: () => vb.title(p),
        p: () => vb.p(p),
        total: () => vb.total(),
        bvid: () => vb.bvid(p),
        aid: () => vb.aid(p),
        cid: () => vb.cid(p),
        epid: () => vb.epid(p)
    }
    const rendered = template.replace(/\{([a-z]+)(?::(0?[1-9]))?\}/g, (token, key, width) => {
        if (!Object.prototype.hasOwnProperty.call(fields, key)) return token
        if (width && !['p', 'total', 'aid', 'cid', 'epid'].includes(key)) return token
        const value = String(fields[key]() ?? '')
        return width && value ? value.padStart(Number(width), '0') : value
    })
    return sanitizeFilename(rendered) || sanitizeFilename(fallback) || 'video'
}
