/**
 * Holds key-value pairs whose values are used as counters.
 */
export class CountMap<T> {
    private readonly map: Map<T, number>;

    constructor();
    constructor(countMap: CountMap<T>);
    constructor(iterable: [T, number][]);
    constructor(arg?: CountMap<T> | [T, number][]) {
        if (arg == null) {
            this.map = new Map<T, number>();
        } else if (arg instanceof CountMap) {
            this.map = new Map(arg.map);
        } else {
            this.map = new Map<T, number>(arg);
        }
    }

    /**
     * Gets the counter value associated with `key`. Returns `0` if `CountMap` does not have `key`.
     * @param key A key of the value to get.
     */
    get(key: T): number {
        return this.map.get(key) ?? 0;
    }

    /**
     * Increases the counter value associated with `key`.
     * If `CountMap` does not have `key`, creates new counter value and initializes it by `steps`.
     * Returns this `CountMap` for chaining.
     * @param key A key of the value to increase.
     * @param steps Amount of increment. Considered `1` if not given.
     */
    increment(key: T, steps = 1): CountMap<T> {
        if (steps <= 0) throw new Error(`'steps' should be a positive number.`);
        const count = this.map.get(key);
        this.map.set(key, count ? count + steps : steps);
        return this;
    }

    /**
     * Increases the counter value by counting each element of array.
     * Returns this `CountMap` for chaining.
     * @param array A collection of items updating the counter values of `CountMap`.
     */
    increamentFromArray(array: T[] | readonly T[]): CountMap<T> {
        for (const item of array) {
            this.increment(item);
        }
        return this;
    }

    /**
     * Decreases the counter value associated with `key`.
     * Throws error when `key` is not found or new counter value is to be less than `0`.
     * Deletes `key` if the counter value is to be `0`.
     * Returns this `CountMap` for chaining.
     * @param key A key of the value to decrease.
     * @param steps Amount of decrement. Considered `1` if not given.
     */
    decrement(key: T, steps = 1): CountMap<T> {
        if (steps <= 0) throw new Error(`'steps' should be a positive number.`);
        const count = this.map.get(key);
        if (!count) throw new Error(`'key' is not found.`);
        const newCount = count - steps;
        if (newCount === 0) {
            this.map.delete(key);
        } else if (newCount < 0) {
            throw new Error(`'steps' is too big.`);
        } else {
            this.map.set(key, newCount);
        }
        return this;
    }

    /**
     * Returns the sum of all the counter values.
     */
    sum(): number {
        let sum = 0;
        for (const value of this.map.values()) {
            sum += value;
        }
        return sum;
    }

    /**
     * Returns an iterable of keys in `CountMap`.
     */
    keys(): IterableIterator<T> {
        return this.map.keys();
    }

    /**
     * Returns an iterable of counter values in `CountMap`.
     */
    values(): IterableIterator<number> {
        return this.map.values();
    }

    /**
     * Returns an iterable of key and value pairs for every entry in `CountMap`.
     */
    entries(): IterableIterator<[T, number]> {
        return this.map.entries();
    }

    /**
     * Returns a new `CountMap` which two `CountMap` are merged into.
     * This method does not change any counter values of this `CountMap`.
     * @param other
     */
    merge(other: CountMap<T>): CountMap<T> {
        const newMap = new CountMap<T>(this);
        for (const [key, value] of other.entries()) {
            newMap.increment(key, value);
        }
        return newMap;
    }

    /**
     * Returns the number of keys.
     */
    get size(): number {
        return this.map.size;
    }
}
