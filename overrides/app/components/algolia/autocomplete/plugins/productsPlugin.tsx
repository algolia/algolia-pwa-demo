/** @jsxRuntime classic */
/** @jsx React.createElement */

import {
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { ProductHit } from '../types';
import ProductItem from './components/ProductItem';

/**
 * Creates a products plugin factory function.
 * @param {function} navigate - The navigation function.
 * @param {Object} currency - The currency object.
 * @returns {Object} The products plugin factory object.
 */
export const productsPluginFactory = (navigate, currency) => ({
  getSources({ query }) {
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'productsPlugin',
        getItems({ setContext }) {
          return getAlgoliaResults<ProductHit>({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                query,
                params: {
                  hitsPerPage: 4,
                },
              },
            ],
            transformResponse({ hits, results }) {
              setContext({
                nbProducts: (results[0] as SearchResponse<ProductHit>).nbHits,
              });

              return hits;
            },
          });
        },
        onSelect({ setIsOpen }) {
          setIsOpen(true);
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          header({ state, Fragment }) {
            return (
              <Fragment>
                <div className="aa-SourceHeaderTitle">
                  Products for {state.query}
                </div>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return <ProductItem hit={item} components={components} navigate={navigate} currency={currency} />;
          },
          footer({ state }) {
            return (
              state.context.nbProducts > 4 && (
                <div style={{ textAlign: 'center' }}>
                  <a
                    onClick={() => navigate('/search?q=' + state.query)}
                    className="aa-SeeAllBtn"
                  >
                    See All Products ({state.context.nbProducts})
                  </a>
                </div>
              )
            );
          },
        },
      },
    ];
  },
});