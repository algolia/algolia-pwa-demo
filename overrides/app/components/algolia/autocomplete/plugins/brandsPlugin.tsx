/** @jsxRuntime classic */
/** @jsx React.createElement */
import { AutocompletePlugin, getAlgoliaFacets } from '@algolia/autocomplete-js';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { BrandHit } from './../types';
import { TagIcon } from '../components';
import { AutocompleteComponents } from '@algolia/autocomplete-js';

/**
 * An Autocomplete Plugin that provides brand results from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
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


/**
 * Props for the BrandItem component.
 * @typedef {Object} BrandItemProps
 * @property {BrandHit} hit - The brand hit object containing brand data.
 * @property {AutocompleteComponents} components - Autocomplete components provided by the Algolia library.
 */
type BrandItemProps = {
  hit: BrandHit;
  components: AutocompleteComponents;
};

/**
* Renders a single brand item within the autocomplete results.
*
* @param {BrandItemProps} props - The component props.
* @returns {JSX.Element} - The rendered brand item element.
*/
function BrandItem({ hit, components }: BrandItemProps) {
  return (
    <div key={hit.objectID} className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <TagIcon />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.ReverseHighlight hit={hit} attribute="label" />
          </div>
        </div>
      </div>
    </div>
  );
}
