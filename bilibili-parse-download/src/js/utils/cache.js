
class CacheFactory {

    static map = {}

    static get(name = 'default') {
        let cache = new Cache() // for code
        if (CacheFactory.map[name] instanceof Cache) {
            cache = CacheFactory.map[name]
        } else {
            CacheFactory.map[name] = cache
        }
        return cache
    }

    static setValue(key = '', value) {
        const [cacheName, cacheKey] = key.split('.', 2)
        if (!cacheName || !cacheKey) {
            return
        }
        const cache = CacheFactory.get(cacheName)
        if (cache instanceof Cache) {
            cache.set(cacheKey, value)
        }
    }

    static getValue(key = '') {
        const [cacheName, cacheKey] = key.split('.', 2)
        if (!cacheName || !cacheKey) {
            return null
        }
        const cache = CacheFactory.get(cacheName)
        if (cache instanceof Cache) {
            return cache.get(cacheKey)
        }
    }

    static clear(name) {
        if (name) {
            CacheFactory.get(name).clear()
            return
        }
        CacheFactory.map = {}
    }

}

class Cache {

    constructor() {
        this.data = {}
    }

    get(key = '') {
        return this.data[key]
    }

    set(key = '', value) {
        this.data[key] = value
    }

    clear() {
        this.data = {}
    }
}

export default CacheFactory
