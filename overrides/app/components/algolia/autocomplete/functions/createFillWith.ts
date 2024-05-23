import { AutocompleteReshapeFunction } from '../types/AutocompleteReshapeFunction';

import { normalizeReshapeSources } from './normalizeReshapeSources';

/**
 * @typedef {Object} createFillWithOptions
 * @property {string} mainSourceId - The ID of the main source.
 * @property {number} limit - The maximum number of items to include in the result.
 */
type createFillWithOptions = {
  mainSourceId: string;
  limit: number;
};

/**
 * Creates a reshape function that computes the total number of source items and
 * limits the provided main source number of items until it reaches the provided limit.
 *
 * @param {createFillWithOptions} options - The options for the reshape function.
 * @param {string} options.mainSourceId - The ID of the main source.
 * @param {number} options.limit - The maximum number of items to include in the result.
 * @returns {AutocompleteReshapeFunction} The reshape function.
 */
export const createFillWith: AutocompleteReshapeFunction<
  createFillWithOptions
> = ({ mainSourceId, limit }) => {
  return function runUniqBy(...rawSources) {
    const originalSources = normalizeReshapeSources(rawSources);
    const otherSources = originalSources.filter(
      (s) => s.sourceId !== mainSourceId
    );

    // Compute the total number of items per source.
    let totalItemNb = 0;
    otherSources.forEach((source) => {
      totalItemNb += source.getItems().length;
    });

    return originalSources.map((source) => {
      let transformedSource = source;

      // Limit the main source items length based on the provided limit and
      // the computed total number of items.
      if (source.sourceId === mainSourceId) {
        transformedSource = {
          ...source,
          getItems() {
            return source.getItems().slice(0, Math.max(limit - totalItemNb, 0));
          },
        };
      }

      return transformedSource;
    });
  };
};
