/** @jsxRuntime classic */
/** @jsx React.createElement */
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import PopularItem from './components/PopularItem';

/**
 * Autocomplete plugin for popular search queries. It fetches popular queries from Algolia based on the user's query.
 * It also provides custom rendering for the popular queries.
 *
 * @type {AutocompletePlugin<PopularHit, {}>}
 * @property {Function} getSearchParams - Function to get search parameters.
 * @property {Function} transformSource - Function to transform the source.
 * @property {Object} renderer - Object with createElement, Fragment, and render functions.
 * @property {Object} templates - Object with header and item templates.
 */
export const popularPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME,
  getSearchParams() {
    return {
      query: '',
      hitsPerPage: 6,
    };
  },
  transformSource({ source }) {
    return {
      ...source,
      sourceId: 'popularPlugin',
      getItemInputValue({ item }) {
        return item.query;
      },
      onSelect({ setIsOpen }) {
        setIsOpen(true);
      },
      renderer: { createElement, Fragment, render: () => {} },
      templates: {
        header({ Fragment }) {
          return (
            <Fragment>
              <span className="aa-SourceHeaderTitle">Popular searches</span>
              <div className="aa-SourceHeaderLine" />
            </Fragment>
          );
        },
        item({ item }) {
          return <PopularItem hit={item} />;
        },
      },
    };
  },
});
