
class CacheFactory {

    static map = {}

    static set(name, cache) {
        CacheFactory.map[name] = cache
    }

    static get(name = 'default') {
        let cache = CacheFactory.map[name]
        if (cache instanceof Cache) {
            return cache
        }
        cache = new Cache()
        CacheFactory.set(name, cache)
        return cache
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
