import {
  createLocalStorageRecentSearchesPlugin,
  search,
} from '@algolia/autocomplete-plugin-recent-searches';

/**
 * An Autocomplete Plugin that provides query suggestion results from Algolia by using the official Algolia Recent Searches plugin.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'pwa-recent-searches',
  search(params) {
    return search({ ...params, limit: params.query ? 1 : 4 });
  },
});
