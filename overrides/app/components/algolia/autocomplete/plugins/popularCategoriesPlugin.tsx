/** @jsxRuntime classic */
/** @jsx React.createElement */

import {getAlgoliaResults} from '@algolia/autocomplete-js'
import React, {createElement, Fragment} from 'react'
import {ALGOLIA_PRODUCTS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {PopularCategoryHit} from '../types'

/////// DEMO PURPESED IMPLEMENTATION. FEEL FREE TO ADJUST TO YOUR NEEDS.   ////////
/**
 * Base URL for the category images. You can adjust this to fit your needs.
 * @type {string}
 */
const baseUrl = 'https://res.cloudinary.com/ddbdkp0az/image/upload/v1721993334'


/* Object containing the URLs for each category image can beadjusted to fit your needs.
 * @type {Object.<string, string>}
 */
const images = {
    'Womens': `${baseUrl}/womens_ushqqq.jpg`,
    'Womens > Jewelry': `${baseUrl}/Womens_Jewelry_f2g8oa.jpg`,
    'Mens > Clothing': `${baseUrl}/Mens_Clothing_yfpxao.jpg`,
    'Mens': `${baseUrl}/Mens_mozl2c.jpg`,
    'Womens > Clothing': `${baseUrl}/womens-top_jtnf6s.png`,
    'Womens > Accessories': `${baseUrl}/Womens_Accessories_lf2zdz.jpg`,
    '2 button pocket': `${baseUrl}/2_button_pocket_r5n3qw.jpg`
}

////////////////////////////////////////////////////////////////////////////////////
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
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                                query: '',
                                params: {
                                    facets: ['__primary_category.1'],
                                    hitsPerPage: 1,
                                }
                            }
                        ],
                        transformResponse({ results }) {
                            const categoryFacets = results[0].facets['__primary_category.1'];
                            if (!categoryFacets) {
                                return [];
                            }
                            const res = [];
                            for (let [key, value] of Object.entries(categoryFacets)) {
                                res.push({ label: key, count: value });
                            }
                            // Sort category facets by their count and return only the first 4
                            res.sort((a, b) => {
                               return b.count - a.count;
                            });
                            return [res.slice(0, 4)];
                        },
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
                                <div className='aa-SourceHeader--right'>
                                    <span className="aa-SourceHeaderTitle">POPULAR CATEGORIES</span>
                                </div>
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
    var image = images[hit.label] ? images[hit.label] : images['2 button pocket']

    return (
        <div
            key={hit.objectID}
            className="aa-ItemWrapper aa-PopularCategoryItem"
            onClick={() => navigate('/category/' + category)}
        >
            <div className="aa-ItemContent">
                <div className="aa-ItemPicture">
                    <img className="popularCategoryImage" src={image} alt={hit.label} />
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
