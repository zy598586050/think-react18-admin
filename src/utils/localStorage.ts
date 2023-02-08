import config from "@/config"
export default {
    getStroage() {
        return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
    },
    setItem(key: string, val: string) {
        let storage = this.getStroage()
        storage[key] = val
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },
    getItem(key: string) {
        return this.getStroage()[key]
    },
    clearItem(key: string) {
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },
    clearAll() {
        window.localStorage.clear()
    }
}