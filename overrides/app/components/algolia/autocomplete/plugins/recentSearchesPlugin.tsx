import {
  createLocalStorageRecentSearchesPlugin,
  search,
} from '@algolia/autocomplete-plugin-recent-searches';

/**
 * @module recentSearchesPlugin
 * @returns {Object} An instance of the recent searches plugin configured with local storage support.
 *
 * The plugin is configured with the following properties:
 * @param {string} key - The key under which recent searches are stored in the local storage. This helps in uniquely identifying the storage used for autocomplete data.
 *
 * The `search` function modifies the number of search results based on the presence of a query:
 * @function search
 * @param {Object} params - Parameters from the autocomplete library that include the current search query.
 * @returns {Promise<Object>} A promise that resolves to the search results, with a customized limit on the number of results.
 * If a query is present, the limit is set to 1; otherwise, it's set to 4, allowing for more general suggestions when there is no specific query.
 */
export const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'pwa-recent-searches',
  search(params) {
    return search({ ...params, limit: params.query ? 1 : 4 });
  },
});
