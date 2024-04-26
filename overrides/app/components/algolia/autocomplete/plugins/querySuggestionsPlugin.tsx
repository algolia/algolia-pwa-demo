import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import { ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';


/**
 * Creates a query suggestions plugin for Algolia Autocomplete.
 * This plugin provides query suggestions based on the user's input.
 * @param {QuerySuggestionsPluginOptions} options - The options for the plugin.
 * @returns {import('@algolia/autocomplete-core').AutocompletePlugin} The query suggestions plugin.
 */
export const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME,
  getSearchParams({ state }) {
    return {
      hitsPerPage: !state.query ? 0 : 10,
    };
  }
});
