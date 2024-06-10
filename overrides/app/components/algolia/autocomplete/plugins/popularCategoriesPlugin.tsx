/** @jsxRuntime classic */
/** @jsx React.createElement */

import {AutocompletePlugin, getAlgoliaFacets} from '@algolia/autocomplete-js'
import React, {createElement, Fragment} from 'react'
import {ALGOLIA_PRODUCTS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {PopularCategoryHit} from '../types'

/**
 * Base URL for the category images. You can adjust this to fit your needs.
 * @type {string}
 */
const baseUrl = 'https://res.cloudinary.com/hilnmyskv/image/upload/v1646067858'

/**
 * Object containing the URLs for each category image can beadjusted to fit your needs.
 * @type {Object.<string, string>}
 */
const images = {
    Womens: `${baseUrl}/women_category_vwzkln.jpg`,
    'Womens > Jewelry': `${baseUrl}/bags_category_qd7ssj.jpg`,
    'Mens > Clothing': `${baseUrl}/clothing_category_xhiz1s.jpg`,
    Mens: `${baseUrl}/men_category_wfcley.jpg`,
    'Womens > Clothing': `${baseUrl}/t-shirts_category_gzqcvd.jpg`,
    'Womens > Accessories': `${baseUrl}/shoes_category_u4fi0q.jpg`,
    '2 button pocket': `${baseUrl}/men_category_wfcley.jpg`
}

/**
 * An Autocomplete Plugin that provides popular categories results from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const popularCategoriesPlugin = (navigate) => ({
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
                                facet: '__primary_category.1',
                                params: {
                                    facetQuery: '',
                                    maxFacetHits: 4
                                }
                            }
                        ]
                    })
                },
                onSelect({setIsOpen}) {
                    setIsOpen(true)
                },
                renderer: {createElement, Fragment, render: () => {}},
                templates: {
                    header({Fragment}) {
                        return (
                            <Fragment>
                                <span className="aa-SourceHeaderTitle">Popular categories</span>
                                <div className="aa-SourceHeaderLine" />
                            </Fragment>
                        )
                    },
                    item({item, components, state}) {
                        return <PopularCategoryItem hit={item} navigate={navigate} />
                    }
                }
            }
        ]
    }
})

/**
 * Props for the PopularCategoryItem component.
 * @typedef {Object} PopularCategoryItemProps
 * @property {PopularCategoryHit} hit - The hit object for the popular category.
 */
type PopularCategoryItemProps = {
    hit: PopularCategoryHit
    navigate: Function
}

/**
 * Component for rendering a popular category item.
 * @param {PopularCategoryItemProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */
function PopularCategoryItem({hit, navigate}: PopularCategoryItemProps) {
    var category = hit.label.replace(' > ', '/').toLowerCase()
    return (
        <div
            key={hit.objectID}
            className="aa-ItemWrapper aa-PopularCategoryItem"
            onClick={() => navigate('/category/' + category)}
        >
            <div className="aa-ItemContent">
                <div className="aa-ItemPicture">
                    <img className="popularCategoryImage" src={images[hit.label]} alt={hit.label} />
                </div>
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                        {hit.label} <span>({hit.count})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
