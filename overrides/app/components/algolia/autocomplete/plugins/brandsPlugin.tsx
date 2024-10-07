/** @jsxRuntime classic */
/** @jsx React.createElement */
import {AutocompletePlugin, getAlgoliaResults} from '@algolia/autocomplete-js'
import React, {createElement, Fragment} from 'react'
import {ALGOLIA_PRODUCTS_INDEX_NAME} from '../constants'
import {BrandHit} from './../types'
import {BrandItem} from './../components/BrandItem'
import {searchClient} from '../searchClient'

/**
 * An Autocomplete Plugin that provides brand results from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const brandsPlugin: AutocompletePlugin<BrandHit, {}> = {
    getSources({query}) {
        if (query) {
            return []
        }
        return [
            {
                sourceId: 'brandsPlugin',
                async getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                                query: '',
                                params: {
                                    facets: ['brand'],
                                    hitsPerPage: 1,
                                }
                            }
                        ],
                        transformResponse({ results }) {
                            console.log(results)
                            const brandFacets = results[0].facets['brand'];
                            if (!brandFacets) {
                                return [];
                            }
                            const res = [];
                            for (let [key, value] of Object.entries(brandFacets)) {
                                res.push({ facetValue: key, count: value });
                            }
                            // Sort category facets by their count and return only the first 4
                            res.sort((a, b) => {
                                return b.count - a.count;
                            });
                            return [res.slice(0, 4)];
                        },
                    })
                    // Once you have Recommend setup, you may want to use it to display the
                    // trending brands. This can be achieved like that:
                    // var response = await recommendClient.getTrendingFacets([
                    //     {
                    //       indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                    //       facetName: 'brand',
                    //     },
                    // ])
                    //
                    // return response.results[0].hits
                },
                renderer: {createElement, Fragment, render: () => {}},
                templates: {
                  item({ item, components }) {
                    return (
                        <BrandItem hit={item} components={''}/>
                    );
                  },
                }
            }
        ]
    }
}
