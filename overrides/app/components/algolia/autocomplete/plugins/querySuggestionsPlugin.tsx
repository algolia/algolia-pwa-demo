import React from 'react'
import {createQuerySuggestionsPlugin} from '@algolia/autocomplete-plugin-query-suggestions'

import {ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'

/**
 * An Autocomplete Plugin that provides query suggestion results from Algolia by using the official Algolia Query Suggestions plugin.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME,
  getSearchParams({ state }) {
    return {
      hitsPerPage: !state.query ? 0 : 10,
    };
  },
  transformSource({ source }) {
    return {
      ...source,
      templates: {
        ...source.templates,
        item({ item }) {
            return (
              <div className="aa-search-suggestions">
                <span>{item.objectID}</span>
              </div>
            );
        },
      },
    };
  },
});
