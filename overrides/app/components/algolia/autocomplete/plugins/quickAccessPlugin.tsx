/** @jsxRuntime classic */
/** @jsx React.createElement */
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { cx, hash } from '../utils';
import { QuickAccessHit } from '../types';

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

/**
 * QuickAccessItemProps interface.
 *
 * @interface QuickAccessItemProps
 * @property {QuickAccessHit} hit - The quick access hit object.
 * @property {(url: string) => void} navigate - The navigate function to handle clicks.
 */
type QuickAccessItemProps = {
  hit: QuickAccessHit;
  navigate: (url: string) => void;
};

/**
* QuickAccessItem component.
* @param {QuickAccessItemProps} props - The component props.
* @returns {React.ReactElement} The QuickAccessItem component.
*/
function QuickAccessItem({ hit, navigate }: QuickAccessItemProps) {

  function handleClick(ref) {
      navigate(ref);
  }

  return (
    <a
      key={hash(hit.title)}
      onClick={() => handleClick(hit.href)}
      className={cx('aa-ItemLink aa-QuickAccessItem', `aa-QuickAccessItem--${hit.template}`)}
    >
      <div className="aa-ItemContent">
        {hit.image && (
          <div className="aa-ItemPicture">
            <img src={hit.image} alt={hit.title} />
          </div>
        )}
        <div key={hash(hit.title)} className="aa-ItemContentBody">
          {hit.date && <div className="aa-ItemContentDate">{hit.date}</div>}
          <div className="aa-ItemContentTitle">{hit.title}</div>
          {hit.subtitle && (
            <div className="aa-ItemContentSubTitle">{hit.subtitle}</div>
          )}
          {hit.links && (
            <ul>
              {hit.links.map((link) => (
                <li className='quicklinks' key={hash(link.text)}>
                  <span className='quickAccessItemAnchor' onClick={() => handleClick(link.href)}>{link.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </a>
  );
}