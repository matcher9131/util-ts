/**
 * Holds key-value pairs whose values are lists.
 */
export class ListMap<K, V> {
    private readonly map: Map<K, V[]>;

    constructor(iterable?: [K, V[]][]) {
        if (iterable == null) {
            this.map = new Map<K, V[]>();
        } else {
            this.map = new Map<K, V[]>(iterable);
        }
    }

    /**
     * Gets the list associated with `key`. Returns `undefined` if `ListMap` does not have `key`.
     * @param key A key of the values to get.
     */
    get(key: K): readonly V[] | undefined {
        return this.map.get(key);
    }

    /**
     * Add value to the list associated with `key`.
     * If no `key`, creates new empty list associated with `key` and adds `value` to it.
     * Returns this `ListMap` for chaining.
     * @param key A key associated with the list to which `value` is to be added.
     * @param value A value to be added to the list.
     */
    add(key: K, value: V): ListMap<K, V> {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key)!.push(value);
        return this;
    }

    /**
     * Returns an iterable of key and value pairs for every entry in `ListMap`.
     */
    entries(): IterableIterator<[K, V[]]> {
        return this.map.entries();
    }
}
