
class Store {
    constructor() {
        this.prefix = 'bp_'
    }

    get(key) {
        return localStorage.getItem(this.prefix + (key || '')) || ''
    }

    set(key, value) {
        return localStorage.setItem(this.prefix + (key || ''), value)
    }
}

export const store = new Store()
