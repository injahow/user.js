
class CacheFactory {

    static map = {}

    static set(name, cache) {
        CacheFactory.map[name] = cache
    }

    static get(name = 'default') {
        const cache = CacheFactory.map[name]
        if (cache instanceof Cache) {
            return cache
        }
        return new Cache(name)
    }

}

class Cache {

    constructor(name = 'default') {
        CacheFactory.set(name, this)
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
