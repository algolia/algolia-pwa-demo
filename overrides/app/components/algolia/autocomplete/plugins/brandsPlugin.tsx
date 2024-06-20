/** @jsxRuntime classic */
/** @jsx React.createElement */
import {AutocompletePlugin, getAlgoliaFacets} from '@algolia/autocomplete-js'
import React, {createElement, Fragment} from 'react'
import {ALGOLIA_PRODUCTS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {BrandHit} from './../types'
import {BrandItem} from './../components/BrandItem'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import recommend from '@algolia/recommend'


/**
 * An Autocomplete Plugin that provides brand results from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const brandsPlugin: AutocompletePlugin<BrandHit, {}> = {
    getSources({query}) {
        if (query) {
            return []
        }

        let algoliaConfig = getConfig().app.algolia

        const recommendClient = recommend(algoliaConfig.appId, algoliaConfig.apiKey)
        return [
            {
                sourceId: 'brandsPlugin',
                async getItems() {
                    var response = await recommendClient.getTrendingFacets([
                        {
                          indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                          threshold: 10,
                          facetName: 'brand'
                        },
                    ])

                    return response.results[0].hits
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

