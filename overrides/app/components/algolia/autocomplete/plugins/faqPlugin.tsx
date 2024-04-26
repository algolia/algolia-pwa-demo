/**
 * This module configures an autocomplete plugin for FAQ searches using Algolia.
 * It integrates with React components to render the search results.
 * 
 * @module AutocompleteFaq
 */

import { AutocompletePlugin, getAlgoliaResults } from '@algolia/autocomplete-js';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_FAQ_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { FaqHit } from '../types';
import FaqItem from './components/FaqItem';

/**
 * Represents an autocomplete plugin for searching FAQs.
 * This plugin configures the data source for FAQ queries
 * and provides custom rendering for the search results.
 * 
 * @type {AutocompletePlugin<FaqHit, {}>}
 */
export const faqPlugin: AutocompletePlugin<FaqHit, {}> = {
  getSources({ query }) {
    if (!query) {
      return [{
        sourceId: 'faqEmpty',
        getItems() {
          return Promise.resolve([]);
        },
        templates: {
          item() {
            return <div>Type to search FAQ</div>;
          },
        },
      }];
    }
    return [
      {
        sourceId: 'faqPlugin',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [{ indexName: ALGOLIA_FAQ_INDEX_NAME, query, params: { hitsPerPage: 1 } }],
          });
        },
        getItemInputValue({ item }) {
          return item.title;
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          item({ item, components }) {
            return <FaqItem hit={item} components={components} />;
          },
        },
      },
    ];
  },
};
