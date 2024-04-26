/** @jsxRuntime classic */
/** @jsx React.createElement */

import { AutocompleteComponents, AutocompletePlugin, getAlgoliaFacets } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useState } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import PopularCategoryItem from './components/PopularCategoryItem';
import { PopularCategoryHit } from '../types';

/**
 * An Autocomplete plugin for displaying popular categories.
 * @type {AutocompletePlugin<PopularCategoryHit, {}>}
 */
export const popularCategoriesPlugin: AutocompletePlugin<PopularCategoryHit, {}> = {
  getSources() {
    return [
      {
        sourceId: 'popularCategoriesPlugin',
        getItems() {
          return getAlgoliaFacets({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                facet: '__primary_category.0',
                params: {
                  facetQuery: '',
                  maxFacetHits: 6,
                },
              },
            ],
          });
        },
        getItemInputValue({ item }) {
          return item.label;
        },
        onSelect({ setIsOpen }) {
          setIsOpen(true);
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          header({ Fragment }) {
            return (
              <Fragment>
                <span className="aa-SourceHeaderTitle">Popular categories</span>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            if (!item || !components) {
              return null;
            }

            return <PopularCategoryItem hit={item} components={components} />;
          },
        },
      },
    ];
  },
};