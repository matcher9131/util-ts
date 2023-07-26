/**
 * Splits a string into substrings with a specified separator and parses them into `number`s.
 * The substrings which do not represent numbers are converted to 'NaN's.
 * @param s A string is to be split.
 * @param separator A string to be used as partitions in separating the string.
 */
export function splitToIntegers(s: string, separator?: string): number[] {
    return s.split(separator ?? ",").map((split) => parseInt(split, 10));
}
