import { AutocompleteComponents, AutocompletePlugin, getAlgoliaResults } from '@algolia/autocomplete-js';
import React, { createElement, Fragment } from 'react';
import { GridIcon } from '../components';
import { ALGOLIA_CATEGORY_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { CategoryHit } from '../types';

/**
 * CategoryItem component. It renders a category item with a grid icon and the category name.
 *
 * @param {CategoryItemProps} props - The props for the CategoryItem component.
 * @param {CategoryHit} props.hit - The category hit object.
 * @param {AutocompleteComponents} props.components - The autocomplete components.
 * @returns {JSX.Element} The CategoryItem component.
 */
function CategoryItem({ hit, components }: CategoryItemProps) {
    return (
        <div key={hit.objectID} className="aa-ItemWrapper aa-CategoryItem">
          <div className="aa-ItemContent">
            <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                <GridIcon />
            </div>
            <div className="aa-ItemContentBody">
              <div className="aa-ItemContentTitle">
                <components.ReverseHighlight
                    hit={hit}
                    attribute='name'
                />
              </div>
            </div>
          </div>
        </div>
    );
}

/**
 * An Autocomplete Plugin that provides category results from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const categoriesPlugin: AutocompletePlugin<CategoryHit, {}> = {
    getSources({ query }) {
        if (!query) {
          return [];
        }

        return [
          {
            sourceId: 'categoriesPlugin',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: ALGOLIA_CATEGORY_INDEX_NAME,
                    query,
                    params: {
                      hitsPerPage: 3,
                    },
                  },
                ],
              });
            },
            getItemInputValue({ item }) {
              if (item && item.categories && item.categories.length > 0) {
                return item.categories[item.categories.length - 1];
              }

              return '';
            },
            renderer: { createElement, Fragment, render: () => {} },
            templates: {
              header({ Fragment }) {
                return (
                  <Fragment>
                    <span className="aa-SourceHeaderTitle">Categories</span>
                    <div className="aa-SourceHeaderLine" />
                  </Fragment>
                );
              },
              item({ item, components }) {
                if (!item || !components) {
                  return null;
                }

                return <CategoryItem hit={item} components={components} />;
              },
            },
          },
        ];
  },
};

type CategoryItemProps = {
  hit: CategoryHit;
  components: AutocompleteComponents;
};