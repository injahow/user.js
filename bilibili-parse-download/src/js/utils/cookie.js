
function getCookie(cookieName) {
    const cookieList = document.cookie.split(';')
    for (let i = 0; i < cookieList.length; ++i) {
        const arr = cookieList[i].split('=')
        if (cookieName === arr[0].trim()) {
            return arr[1]
        }
    }
    return null
}

export {
    getCookie
}
