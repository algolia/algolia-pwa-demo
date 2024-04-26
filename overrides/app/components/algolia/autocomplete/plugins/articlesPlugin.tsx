import {
  AutocompletePlugin,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_ARTICLES_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { ArticleHit } from '../types';
import ArticleItem from './components/ArticleItem';

/**
 * An Autocomplete Plugin that provides article suggestions from Algolia.
 * This plugin fetches articles based on the user's query. If the query is empty, it returns no suggestions.
 * The search results include a maximum of 2 hits per page. It also provides a custom renderer for the article
 * items and includes a header and footer for the suggestion list.
 *
 * @module articlesPlugin
 * @type {AutocompletePlugin<ArticleHit, {}>}
 */
export const articlesPlugin: AutocompletePlugin<ArticleHit, {}> = {
  getSources({ query }) {
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'articlesPlugin',
        getItems({ setContext }) {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_ARTICLES_INDEX_NAME,
                query,
                params: {
                  hitsPerPage: 2,
                },
              },
            ],
            transformResponse({ hits, results }) {
              setContext({
                nbArticles: (results[0] as SearchResponse<ArticleHit>).nbHits,
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
          header() {
            return (
              <div>
                <span className="aa-SourceHeaderTitle">Articles</span>
                <div className="aa-SourceHeaderLine" />
              </div>
            );
          },
          item({ item }) {
            return <ArticleItem hit={item} />;
          },
          footer({ state }) {
            return (
              // @TODO: Add a link to the articles page when instantsearch is ready
              state.context.nbArticles > 2 && (
                <div style={{ textAlign: 'center' }}>
                  <a
                    href="https://example.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="aa-SeeAllLink"
                  >
                    See All Articles ({state.context.nbArticles})
                  </a>
                </div>
              )
            );
          },
        },
      },
    ];
  },
};
