/** @jsxRuntime classic */
/** @jsx React.createElement */
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import QuickAccessItem from './components/QuickAccessItem';


/**
 * Factory function to create a quick access plugin for Algolia Autocomplete.
 * @param {Function} navigate - A function to navigate to a specific item.
 * @returns {Object} An object containing the plugin definition.
 */
export const quickAccessPluginFactory = (navigate) => ({
  getSources({ query }) {
    if (query) {
      return [];
    }
    return [
      {
        sourceId: 'quickAccessPlugin',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                query,
                params: {
                  hitsPerPage: 0,
                  ruleContexts: ['quickAccess'],
                },
              },
            ],
            transformResponse({ results }) {
              return (results as SearchResponse[])?.[0].userData?.[0]?.items || [];
            },
          });
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          header({ Fragment }) {
            return (
              <Fragment>
                <span className="aa-SourceHeaderTitle">Quick access</span>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item }) {
            return <QuickAccessItem hit={item} navigate={navigate} />;
          },
        },
      },
    ];
  },
});
