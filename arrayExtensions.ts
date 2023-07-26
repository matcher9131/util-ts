export {};

declare global {
    interface Array<T> {
        /**
         * Returns the number of elements which satisfy the condition.
         * @param predicate A function to test each element for a condition.
         */
        count(predicate: (item: T) => boolean): number;

        /**
         * Returns a new array from which duplicated elements of the original array are removed.
         * The elements of new array are sorted in ascending order.
         */
        distinct(): T[];

        /**
         * Splits the original array into subarrays with specified number of elements and returns an iterable of them.
         * @param numElements Number of elements of each subarray.
         */
        divide(numElements: number): IterableIterator<T[]>;

        /**
         * Returns a new array from which the elements equal to an element of `itemToExclude` are removed.
         * @param itemsToExclude An array whose elements are removed from new array.
         */
        except(itemsToExclude: readonly T[]): T[];

        /**
         * Returns the first element of this array, or an `undefined` if this array is empty.
         */
        first(): T | undefined;

        /**
         * Returns the last element of this array, or an `undefined` if this array is empty.
         */
        last(): T | undefined;

        /**
         * Applies a function to each element of this array and returns the maximum resulting value.
         * Throws an error if this array is empty.
         * @param selector A transform function to apply to each element.
         */
        max(selector: (item: T) => number): number;

        /**
         * Applies a function to each element of this array and returns the minimum resulting value.
         * Throws an error if this array is empty.
         * @param selector A transform function to apply to each element.
         */
        min(selector: (item: T) => number): number;

        /**
         * Applies a function to each element of this array and returns the sum of resulting values.
         * @param selector A transform function to apply to each element.
         */
        sum(selector: (item: T) => number): number;

        /**
         * Merges two arrays into a new array by applying a specified function.
         * @param second The other array to merge.
         * @param selector A transform function which specifies how to merge elements of the two arrays.
         */
        zip<U, V>(
            second: U[] | readonly U[],
            selector: (firstItem: T, secondItem: U) => V,
        ): V[];
    }

    interface ReadonlyArray<T> {
        count(predicate: (item: T) => boolean): number;
        distinct(): T[];
        except(itemsToExclude: readonly T[]): T[];
        first(): T | undefined;
        last(): T | undefined;
        max(selector: (item: T) => number): number;
        min(selector: (item: T) => number): number;
        sum(selector: (item: T) => number): number;
    }
}

if (Array.prototype.count == null) {
    Object.defineProperty(Array, "count", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(
            this: Array<T>,
            predicate: (item: T) => boolean,
        ): number {
            return this.reduce(
                (count, item) => predicate(item) ? count + 1 : count,
                0,
            );
        },
    });
}

if (Array.prototype.distinct == null) {
    Object.defineProperty(Array, "distinct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(this: Array<T>): T[] {
            const set = new Set<T>(this);
            return [...set.values()];
        },
    });
}

if (Array.prototype.divide == null) {
    Object.defineProperty(Array, "divide", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function* <T>(
            this: Array<T>,
            numElements: number,
        ): IterableIterator<T[]> {
            let buffer: T[] = [];
            for (let i = 0; i < this.length; ++i) {
                buffer.push(this[i]);
                if ((i + 1) % numElements === 0) {
                    yield buffer;
                    buffer = [];
                }
            }
            if (buffer.length > 0) {
                yield buffer;
            }
        },
    });
}

if (Array.prototype.except == null) {
    Object.defineProperty(Array, "except", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(this: Array<T>, itemsToExclude: readonly T[]): T[] {
            return this.filter((item) => !itemsToExclude.includes(item));
        },
    });
}

if (Array.prototype.first == null) {
    Object.defineProperty(Array, "first", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(this: Array<T>): T | undefined {
            return this.length !== 0 ? this[0] : undefined;
        },
    });
}

if (Array.prototype.last == null) {
    Object.defineProperty(Array, "last", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(this: Array<T>): T | undefined {
            return this.length !== 0 ? this[this.length - 1] : undefined;
        },
    });
}

if (Array.prototype.max == null) {
    Object.defineProperty(Array, "max", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(
            this: Array<T>,
            selector: (item: T) => number,
        ): number {
            if (this.length === 0) throw Error("Array should not be empty.");
            return this.reduce((max, item) => {
                const newValue = selector(item);
                return newValue > max ? newValue : max;
            }, Number.NEGATIVE_INFINITY);
        },
    });
}

if (Array.prototype.min == null) {
    Object.defineProperty(Array, "min", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(
            this: Array<T>,
            selector: (item: T) => number,
        ): number {
            if (this.length === 0) throw Error("Array should not be empty.");
            return this.reduce((min, item) => {
                const newValue = selector(item);
                return newValue < min ? newValue : min;
            }, Number.POSITIVE_INFINITY);
        },
    });
}

if (Array.prototype.sum == null) {
    Object.defineProperty(Array, "sum", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T>(
            this: Array<T>,
            selector: (item: T) => number,
        ): number {
            return this.reduce((sum, item) => sum + selector(item), 0);
        },
    });
}

if (Array.prototype.zip == null) {
    Object.defineProperty(Array, "zip", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function <T, U, V>(
            this: Array<T>,
            second: U[] | readonly U[],
            selector: (firstItem: T, secondItem: U) => V,
        ): V[] {
            const iMax = (this.length < second.length)
                ? this.length
                : second.length;
            const r: V[] = [];
            for (let i = 0; i < iMax; ++i) {
                r.push(selector(this[i], second[i]));
            }
            return r;
        },
    });
}
