
class CacheFactory {

    static map = {}

    static get(name = 'default') {
        let cache = CacheFactory.map[name]
        if (cache instanceof Cache) {
            return cache
        }
        cache = new Cache()
        CacheFactory.map[name] = cache
        return cache
    }

    static setValue(key = '', value) {
        let [cacheName, cacheKey] = key.split('.', 2)
        if (!cacheName || !cacheKey) {
            return
        }
        const cache = CacheFactory.get(cacheName)
        if (cache instanceof Cache) {
            cache.set(cacheKey, value)
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
        this.value = {}
    }

    get(key = '') {
        return this.value[key]
    }

    set(key = '', value) {
        this.value[key] = value
    }

    clear() {
        this.value = {}
    }
}

export default CacheFactory
