
const config = {
    base_api: 'https://api.injahow.cn/bparse/',
    request_type: 'auto',
    format: 'flv',
    host_key: '0',
    replace_force: '0',
    auth: '0',
    download_type: 'web',
    rpc_domain: 'http://localhost',
    rpc_port: '16800',
    rpc_token: '',
    rpc_dir: 'D:/',
    ariang_host: 'http://ariang.injahow.com/',
    auto_download: '0',
    danmaku_speed: '15',
    danmaku_fontsize: '22'
}

const hostMap = {
    '0': '关闭',
    ks3: 'upos-sz-mirrorks3.bilivideo.com',
    ks3b: 'upos-sz-mirrorks3b.bilivideo.com',
    ks3c: 'upos-sz-mirrorks3c.bilivideo.com',
    ks32: 'upos-sz-mirrorks32.bilivideo.com',
    kodo: 'upos-sz-mirrorkodo.bilivideo.com',
    kodob: 'upos-sz-mirrorkodob.bilivideo.com',
    cos: 'upos-sz-mirrorcos.bilivideo.com',
    cosb: 'upos-sz-mirrorcosb.bilivideo.com',
    bos: 'upos-sz-mirrorbos.bilivideo.com',
    wcs: 'upos-sz-mirrorwcs.bilivideo.com',
    wcsb: 'upos-sz-mirrorwcsb.bilivideo.com',
    /* 不限CROS, 限制UA */
    hw: 'upos-sz-mirrorhw.bilivideo.com',
    hwb: 'upos-sz-mirrorhwb.bilivideo.com',
    upbda2: 'upos-sz-upcdnbda2.bilivideo.com',
    upws: 'upos-sz-upcdnws.bilivideo.com',
    uptx: 'upos-sz-upcdntx.bilivideo.com',
    uphw: 'upos-sz-upcdnhw.bilivideo.com',
    js: 'upos-tf-all-js.bilivideo.com',
    hk: 'cn-hk-eq-bcache-01.bilivideo.com',
    akamai: 'upos-hz-mirrorakam.akamaized.net'
}

export {
    config,
    hostMap
}
