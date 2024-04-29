import {
  AutocompletePlugin,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_ARTICLES_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { ArticleHit } from '../types';

/**
 * An Autocomplete Plugin that provides article suggestions from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
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

/**
 * Props for the `ArticleItem` component.
 * @typedef {Object} ArticleItemProps
 * @property {ArticleHit} hit - The article data to be displayed.
 */
type ArticleItemProps = {
  hit: ArticleHit;
};

/**
 * Component to render an individual article item.
 * This component displays a clickable article link, which includes an image,
 * the article's title, and a brief description truncated to 25 characters. 
 * It is designed to be used within the autocomplete suggestions list.
 *
 * @param {ArticleItemProps} props - The props for the article item component.
 * @returns {React.ReactElement} The JSX element representing the article item.
 */
function ArticleItem({ hit }: ArticleItemProps) {
  return (
    <a key={hit.objectID} href="#" className="aa-ItemLink aa-ArticleItem">
      <div className="aa-ItemContent">
        <div className="aa-ItemPicture">
          <img src={hit.image} alt={hit.name} />
        </div>

        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">{hit.name}</div>
          {hit.description && (
            <div className="aa-ItemContentDate">
              {hit.description.substring(0, 125) + '...'}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}