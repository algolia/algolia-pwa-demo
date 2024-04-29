/** @jsxRuntime classic */
/** @jsx React.createElement */
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { PopularHit } from '../types';
import { SearchIcon } from '../components';

/**
 * Represents the props for the PopularItem component.
 *
 * @typedef {Object} PopularItemProps
 * @property {PopularHit} hit - The popular hit object.
 */
type PopularItemProps = {
  hit: PopularHit;
};

/**
 * PopularItem component. It renders a popular item with a search icon and the query.
 *
 * @param {PopularItemProps} props - The props for the PopularItem component.
 * @param {PopularHit} props.hit - The popular hit object.
 * @returns {JSX.Element} The PopularItem component.
 */
function PopularItem({ hit }: PopularItemProps) {
  return (
    <div key={hit.objectID} className="aa-ItemWrapper">
      <div className="aa-ItemIcon aa-ItemIcon--noBorder">
        <SearchIcon />
      </div>
      <div className="aa-ItemContent">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">{hit.query}</div>
        </div>
      </div>
    </div>
  );
}

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
