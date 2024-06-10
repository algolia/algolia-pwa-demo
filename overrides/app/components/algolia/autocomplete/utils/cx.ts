/**
 * Concatenates CSS class names into a single string, filtering out falsy values.
 *
 * @param classNames - An array of strings, numbers, booleans, undefined, or null values representing CSS class names.
 * @returns A string containing the concatenated class names, separated by spaces. Falsy values are ignored.
 *
 * @example
 * // Returns "class1 class2"
 * cx('class1', 'class2');
 *
 * @example
 * // Returns "class1 class3" (ignores false and undefined)
 * cx('class1', false, 'class2', undefined, 'class3');
 */
export function cx(...classNames: Array<string | number | boolean | undefined | null>) {
    return classNames.filter(Boolean).join(' ')
}
