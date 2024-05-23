
/**
 * Intersperses an array with a separator element.
 *
 * @template TItem The type of the items in the array.
 * @template TSeparator The type of the separator element.
 *
 * @param {TItem[]} arr The array to intersperse.
 * @param {TSeparator} separator The separator element to insert between each item.
 * @returns {(TItem | TSeparator)[]} A new array with the separator interspersed between each item.
 *
 * @example
 * const arr = [1, 2, 3];
 * const separator = ',';
 * const result = intersperse(arr, separator);
 * // result = [1, ',', 2, ',', 3]
 */export function intersperse<TItem, TSeparator>(
  arr: TItem[],
  separator: TSeparator
) {
  return arr.reduce((acc, curr) => [...acc, curr, separator], []).slice(0, -1);
}
