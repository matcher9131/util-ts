/**
 * Enumerates all combinations from a specified collection.
 * @param items A collection from which combinations are made.
 * @param count The number of elements of each combination.
 * @param isRepitision Enumerates combination with repetitions if true.
 */
export function* enumarteCombination<T>(
    items: readonly T[],
    count: number,
    isRepitision = false,
): IterableIterator<readonly T[]> {
    if (count < 0 || count > items.length) {
        throw Error(
            "'count' should be a non-negative integer and should not be more than 'items.length'.",
        );
    }

    function* enumCombin<T>(
        items: readonly T[],
        count: number,
        isRepitision = false,
    ): IterableIterator<readonly T[]> {
        if (count === 0) {
            yield [];
        } else {
            for (
                const { item, index } of items.map((item, index) => ({
                    item,
                    index,
                }))
            ) {
                for (
                    const restItems of enumCombin(
                        items.slice(
                            isRepitision ? index : index + 1,
                            items.length,
                        ),
                        count - 1,
                    )
                ) {
                    yield [item].concat(restItems);
                }
            }
        }
    }

    yield* enumCombin(items, count, isRepitision);
}

/**
 * Regards `args` as sets and create Cartesian product of them.
 * @param args Sets
 */
export function* cartesianProduct<T>(
    ...args: readonly T[][]
): IterableIterator<readonly T[]> {
    if (args.length === 0) {
        yield [];
    } else {
        const [first, ...rest] = args;
        for (const firstElement of first) {
            for (const restCombin of cartesianProduct(...rest)) {
                yield [firstElement].concat(restCombin);
            }
        }
    }
}
