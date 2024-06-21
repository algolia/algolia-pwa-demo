/** @jsxRuntime classic */
/** @jsx React.createElement */
import {createQuerySuggestionsPlugin} from '@algolia/autocomplete-plugin-query-suggestions'
import React, {createElement, Fragment, useEffect, useRef, useState} from 'react'
import {ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {PopularHit} from '../types'
import {SearchIcon} from '../components'

/**
 * Represents the props for the PopularItem component.
 *
 * @typedef {Object} PopularItemProps
 * @property {PopularHit} hit - The popular hit object.
 */
type PopularItemProps = {
    hit: PopularHit
}

/**
 * PopularItem component. It renders a popular item with a search icon and the query.
 *
 * @param {PopularItemProps} props - The props for the PopularItem component.
 * @param {PopularHit} props.hit - The popular hit object.
 * @returns {JSX.Element} The PopularItem component.
 */
function PopularItem({hit}: PopularItemProps) {
    return (
        <div key={hit.objectID} className="aa-ItemWrapper">
            <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                <SearchIcon />
            </div>
            <div className="aa-ItemContent">
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">{hit.query}</div>
                </div>
            </div>
        </div>
    )
}

/**
 * An Autocomplete Plugin that provides popular products results from search queries
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const popularPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX_NAME,
    getSearchParams() {
        return {
            query: '',
            hitsPerPage: 6
        }
    },
    transformSource({source}) {
        return {
            ...source,
            sourceId: 'popularPlugin',
            onSelect({setIsOpen}) {
                setIsOpen(true)
            },
            renderer: {createElement, Fragment, render: () => {}},
            templates: {
                header({Fragment}) {
                    return (
                        <Fragment>
                            <span className="aa-SourceHeaderTitle">Trending</span>
                            <div className="aa-SourceHeaderLine" />
                        </Fragment>
                    )
                },
                item({item}) {
                    return <PopularItem hit={item} />
                }
            }
        }
    }
})
