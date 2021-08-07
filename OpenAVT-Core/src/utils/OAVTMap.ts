/**
 * OpenAVT map class.
 */
export class OAVTMap<K, V> {
    private _values: {[key: string]: V} = {}
    private _keys: {[key: string]: K} = {}

    constructor() {}

    set(key: K, value: V) {
        if (typeof key.toString == "function") {
            this._values[key.toString()] = value
            this._keys[key.toString()] = key
        }
    }

    get(key: K): V {
        if (typeof key.toString == "function") {
            let v = this._values[key.toString()]
            return v == undefined ? null : v
        }
        else {
            return null
        }
    }

    del(key: K) {
        if (typeof key.toString == "function") {
            delete this._values[key.toString()]
            delete this._keys[key.toString()]
        }
    }

    dic(): {[key: string]: V} {
        return this._values
    }

    iter(func: {(k: K, v: V): void}) {
        Object.keys(this._values).forEach(key => {
            let v = this._values[key]
            let k = this._keys[key]
            func(k, v)
        })
    }
}