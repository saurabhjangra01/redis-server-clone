class DataStore {
    constructor() {
        this.store = {};
    }

    set(key, value) {
        this.store[key] = value;
    }

    get(key) {
        return this.store[key];
    }

    exists(key) {
        return key in this.store;
    }
}

module.exports = DataStore;
