/** @jsxRuntime classic */
/** @jsx React.createElement */
import { AutocompletePlugin, getAlgoliaFacets } from '@algolia/autocomplete-js';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { BrandHit } from '../types';
import BrandItem from './components/BrandItem';

/**
 * Autocomplete plugin for brand search. It fetches brands from Algolia based on the user's query.
 * It also provides custom rendering for the brands.
 *
 * @type {AutocompletePlugin<BrandHit, {}>}
 * @property {Function} getSources - Function to get sources based on the user's query.
 * @property {Function} getItems - Function to get Algolia facets.
 * @property {Function} getItemInputValue - Function to get the input value for an item.
 * @property {Object} renderer - Object with createElement, Fragment, and render functions.
 * @property {Object} templates - Object with item template.
 */
export const brandsPlugin: AutocompletePlugin<BrandHit, {}> = {
  getSources({ query }) {
    if (!query) {
      return [];
    }
    return [
      {
        sourceId: 'brandsPlugin',
        getItems() {
          return getAlgoliaFacets({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                facet: 'brand',
                params: {
                  facetQuery: query,
                  maxFacetHits: 2,
                },
              },
            ],
          });
        },
        getItemInputValue({ item }) {
          return item.label;
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          item({ item, components }) {
            return <BrandItem hit={item} components={components} />;
          },
        },
      },
    ];
  },
};