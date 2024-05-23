import {
  AutocompleteReshapeSource,
  BaseItem,
} from '@algolia/autocomplete-core';

import { AutocompleteReshapeFunction } from '../types/AutocompleteReshapeFunction';

import { normalizeReshapeSources } from './normalizeReshapeSources';

/**
 * @typedef {Object} UniqByPredicate
 * @property {AutocompleteReshapeSource<TItem>} source - The source object.
 * @property {TItem} item - The item object.
 * @template TItem
 */
type UniqByPredicate<TItem extends BaseItem> = (params: {
  source: AutocompleteReshapeSource<TItem>;
  item: TItem;
}) => TItem;

/**
 * Creates a reshape function that filters out duplicate items across sources based on a predicate function.
 * @function
 * @template TItem
 * @param {UniqByPredicate<TItem>} predicate - The predicate function used to determine uniqueness.
 * @returns {AutocompleteReshapeFunction<UniqByPredicate<TItem>>} - The reshape function.
 */
export const uniqBy: AutocompleteReshapeFunction<UniqByPredicate<any>> = <
  TItem extends BaseItem
>(
  predicate: UniqByPredicate<any>
) => {
  /**
   * The reshape function that filters out duplicate items across sources.
   * @function
   * @param {...AutocompleteReshapeSource<TItem>} rawSources - The sources to filter.
   * @returns {AutocompleteReshapeSource<TItem>[]} - The filtered sources.
   */
  return function runUniqBy(...rawSources) {
    const sources = normalizeReshapeSources(rawSources);
    const seen = new Set<TItem>();

    return sources.map((source) => {
      const items = source.getItems().filter((item) => {
        const appliedItem = predicate({ source, item });
        const hasSeen = seen.has(appliedItem);

        seen.add(appliedItem);

        return !hasSeen;
      });

      return {
        ...source,
        getItems() {
          return items;
        },
      };
    });
  };
};
