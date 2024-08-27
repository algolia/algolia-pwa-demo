/**
 * @module Autocomplete
 * Provides a comprehensive search experience leveraging various plugins to render different types of search results.
 * This module relies on Algolia's autocomplete library to create a customizable autocomplete dropdown,
 * For further customization, refer to the Algolia documentation: https://www.algolia.com/doc/ui-libraries/autocomplete/guides/creating-a-multi-column-layout/
 */

import React, {createElement, Fragment, useEffect, useRef} from 'react'
import {createRoot} from 'react-dom/client'
import {autocomplete} from '@algolia/autocomplete-js'
import PropTypes from 'prop-types'
import {pipe} from 'ramda'

import {createFillWith, uniqBy} from './functions'
import {categoriesPlugin} from './plugins/categoriesPlugin'
import {faqPlugin} from './plugins/faqPlugin'
import {popularCategoriesPlugin} from './plugins/popularCategoriesPlugin'
import {popularPlugin} from './plugins/popularPlugin'
import {productsPluginFactory} from './plugins/productsPlugin'
import {querySuggestionsPlugin} from './plugins/querySuggestionsPlugin'
import recentSearchesPlugin from './plugins/recentSearchesPlugin'
import {quickAccessPluginFactory} from './plugins/quickAccessPlugin'
import {contentPlugin} from './plugins/contentPlugin'
import {brandsPlugin} from './plugins/brandsPlugin'
import {cx, hasSourceActiveItem, isDetached} from './utils'
import {CloseIcon} from '@salesforce/retail-react-app/app/components/icons'

import '@algolia/autocomplete-theme-classic'
import '../style.css'

/**
 * Utility function to remove duplicates from search results.
 * It prioritizes recent searches and query suggestions by manipulating item identifiers.
 * @function
 * @param {Object} item - The item to be processed for deduplication.
 * @returns {String|Object} - Returns a unique identifier or item based on the plugin source.
 */
const removeDuplicates = uniqBy(({source, item}) => {
    const sourceIds = ['recentSearchesPlugin', 'querySuggestionsPlugin']
    if (sourceIds.indexOf(source.sourceId) === -1) {
        return item
    }

    return source.sourceId === 'querySuggestionsPlugin' ? item.query : item.label
})

/**
 * Creates a filling strategy for search results based on a set limit.
 * Adjusts the number of results shown based on the search state (detached or not).
 * @constant
 * @type {Function}
 */
const fillWith = createFillWith({
    mainSourceId: 'querySuggestionsPlugin',
    limit: isDetached() ? 6 : 10
})

/**
 * Combines `removeDuplicates` and `fillWith` functions using Ramda's `pipe` to process search results.
 * @constant
 * @type {Function}
 */
const combine = pipe(removeDuplicates, fillWith)

/**
 * React component for Autocomplete. Sets up and handles the lifecycle of an autocomplete search interface.
 * @function
 * @param {Object} props - Component properties.
 * @param {Function} props.navigate - Navigation function to handle redirection.
 * @param {Object} props.currency - Currency information for pricing display in product searches.
 * @returns {JSX.Element} - The rendered autocomplete container.
 */
export function Autocomplete({navigate, currency}) {
    const containerRef = useRef(null)
    const searchRef = useRef(null) // Ref for autocomplete search instance

    /** Recent Searches showcase. Demo purposed. Feel free to remove this part for your implementation */
    /*********************************************************************** */
    const defaultSearches = [
        {id: 't-shirt', label: 't-shirt'},
        {id: 'necklace', label: 'necklace'},
        {id: 'top', label: 'top'}
    ]

    if (typeof window !== 'undefined') {
        let recentSearches = JSON.parse(
            window.localStorage.getItem(`AUTOCOMPLETE_RECENT_SEARCHES:pwa-recent-searches`)
        )
        if (!recentSearches) {
            window.localStorage.setItem(
                `AUTOCOMPLETE_RECENT_SEARCHES:pwa-recent-searches`,
                JSON.stringify(defaultSearches)
            )
        }
    }
    /*********************************************************************** */

    useEffect(() => {
        if (!containerRef.current) {
            console.error('Algolia Autocomplete Container reference is not available.')
            return undefined
        }

        let rootRef

        searchRef.current = autocomplete({
            container: containerRef.current,
            placeholder: 'Search for products...',
            openOnFocus: true,
            plugins: [
                recentSearchesPlugin(navigate),
                querySuggestionsPlugin,
                categoriesPlugin(navigate),
                brandsPlugin,
                faqPlugin,
                productsPluginFactory(navigate, currency),
                contentPlugin,
                popularPlugin,
                quickAccessPluginFactory(navigate),
                popularCategoriesPlugin(navigate)
            ],
            reshape({sourcesBySourceId, sources, state}) {
                const {
                    recentSearchesPlugin: recentSearches,
                    querySuggestionsPlugin: querySuggestions,
                    categoriesPlugin: categories,
                    brandsPlugin: brands,
                    faqPlugin: faq,
                    popularPlugin: popular,
                    popularCategoriesPlugin: popularCategories,
                    ...rest
                } = sourcesBySourceId

                const sourceIdsToExclude = ['popularPlugin', 'popularCategoriesPlugin']
                const shouldDisplayPopularCategories = sources.every((source) => {
                    if (sourceIdsToExclude.indexOf(source.sourceId) !== -1) {
                        return true
                    }
                    return source.getItems().length === 0
                })

                document.addEventListener('click', handleClicks)

                return [
                    combine(recentSearches, querySuggestions, categories, brands, faq),
                    [
                        !state.query && popular,
                        ...Object.values(rest),
                        shouldDisplayPopularCategories && popularCategories
                    ].filter(Boolean)
                ]
            },
            renderer: {createElement, Fragment, render: () => {}},
            render(state, root) {
                try {
                    if (!rootRef) {
                        rootRef = createRoot(root)
                    }

                    var autocompleteElement = AutocompletePanel(state, searchRef.current)

                    rootRef.render(autocompleteElement)
                } catch (renderError) {
                    console.error('Error during autocomplete rendering:', renderError)
                }
            },
            onStateChange: ({state}) => {
                setTimeout(() => {
                    const navbar = document.querySelector('.css-1bcprh')
                    const form = document.querySelector('.aa-Form')
                    const panelLayout = document.querySelector('.aa-PanelLayout')

                    if (state.isOpen) {
                        navbar?.classList?.add('wt-navbar')
                        form?.classList?.add('search-hidden')

                        if (panelLayout && form) {
                            panelLayout?.classList?.add('panel-animation')
                            form?.classList?.add('search-animation')
                        }
                    } else {
                        navbar?.classList?.remove('wt-navbar')
                        form?.classList?.remove('search-hidden', 'search-animation')

                        if (panelLayout) {
                            panelLayout.classList.remove('panel-animation')
                        }
                    }
                }, 100)
            }
        })

        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && e.target.id.indexOf('autocomplete-') > -1) {
                navigate('/search?q=' + e.target.value)
            }
        }

        const handleClicks = (e) => {
            let className = e.target.className
            if (className.indexOf('aa-SeeAllLink') > -1) {
                searchRef.current.setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClicks)

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            searchRef.current.destroy()
            document.removeEventListener('keypress', handleKeyDown)
        }
    }, [])

    return <div ref={containerRef} className="autocomplete-container"></div>
}

/**
 * Constructs the panel layout for displaying the search results.
 * @function
 * @param {Object} props - The properties of the panel, including state and elements from plugins.
 * @returns {JSX.Element} - The rendered panel layout for autocomplete results.
 */
function AutocompletePanel(props, search) {
    const {
        recentSearchesPlugin: recentSearches,
        querySuggestionsPlugin: querySuggestions,
        brandsPlugin: brands,
        productsPlugin: products,
        contentPlugin: content,
        popularPlugin: popular,
        quickAccessPlugin: quickAccess,
        popularCategoriesPlugin: popularCategories,
        categoriesPlugin: categories
    } = props.elements

    const sourceIdsToExclude = ['popularPlugin', 'popularCategoriesPlugin']
    const hasResults =
        props.state.collections
            .filter(({source}) => sourceIdsToExclude.indexOf(source.sourceId) === -1)
            .reduce((prev, curr) => prev + curr.items.length, 0) > 0

    return (
        <>
            <div className="aa-PanelLayout aa-Panel--scrollable">
                <div className="aa-PanelSection--top">
                    <CloseIcon onClick={() => search.setIsOpen(false)} />
                </div>
                <div className="aa-PanelSections">
                    <div className="aa-PanelSection--left">
                        {!hasResults && (
                            <div className="aa-NoResultsQuery">
                                We couldn’t find anything for `{props.state.query}`
                            </div>
                        )}

                        {hasResults ? (
                            (!props.state.query && recentSearches && (
                                <Fragment>
                                    <div className="aa-SourceHeader">
                                        <span className="aa-SourceHeaderTitle">RECENT</span>
                                        <div className="aa-SourceHeaderLine" />
                                    </div>
                                    {recentSearches}

                                    <div className="aa-PanelSection--popular">{popular}</div>

                                    <div className="aa-PanelSection--popular">{categories}</div>

                                    <div className="aa-SourceHeader">
                                        <span className="aa-SourceHeaderTitle">BRANDS</span>
                                        <div className="aa-SourceHeaderLine" />
                                    </div>
                                    <div className="aa-PanelSectionSources">{brands}</div>
                                </Fragment>
                            )) ||
                            (props.state.query && querySuggestions && (
                                <>
                                    {querySuggestions && (
                                        <Fragment>
                                            <div className="aa-SourceHeader">
                                                <span className="aa-SourceHeaderTitle">
                                                    SUGGESTIONS
                                                </span>
                                                <div className="aa-SourceHeaderLine" />
                                            </div>

                                            <div className="aa-PanelSectionSources">
                                                {querySuggestions}
                                            </div>
                                        </Fragment>
                                    )}
                                </>
                            ))
                        ) : (
                            <div className="aa-NoResultsAdvices aa-mt-5">
                                <ul className="aa-NoResultsAdvicesList">
                                    <li>Double-check your spelling</li>
                                    <li>Use fewer keywords</li>
                                    <li>Search for a less specific item</li>
                                    <li>Check out popular categories for inspiration</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="aa-PanelSection--right">
                        {products && (
                            <div className="aa-PanelSection--products">
                                <div className="aa-PanelSectionSource">{products}</div>
                            </div>
                        )}
                        {content && (
                            <div className="aa-PanelSection--content">
                                <div className="aa-PanelSectionSource">{content}</div>
                            </div>
                        )}

                        {quickAccess && (
                            <div
                                className={cx(
                                    'aa-PanelSection--quickAccess aa-PanelSection--zoomable',
                                    hasSourceActiveItem('quickAccessPlugin', props.state) &&
                                        'aa-PanelSection--active'
                                )}
                            >
                                {quickAccess}
                            </div>
                        )}

                        {!hasResults && (
                            <div
                                className={cx(
                                    'aa-PanelSection--popularCategories aa-PanelSection--zoomable',
                                    hasSourceActiveItem('popularCategoriesPlugin', props.state) &&
                                        'aa-PanelSection--active'
                                )}
                            >
                                {popularCategories}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="blur"
                onClick={() => search.setIsOpen(false)}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        search.setIsOpen(false)
                    }
                }}
                role="button"
                tabIndex={0}
            ></div>
        </>
    )
}

AutocompletePanel.propTypes = {
    elements: PropTypes.shape({
        recentSearchesPlugin: PropTypes.any,
        querySuggestionsPlugin: PropTypes.any,
        categoriesPlugin: PropTypes.any,
        brandsPlugin: PropTypes.any,
        faqPlugin: PropTypes.any,
        productsPlugin: PropTypes.any,
        contentPlugin: PropTypes.any,
        popularPlugin: PropTypes.any,
        quickAccessPlugin: PropTypes.any,
        popularCategoriesPlugin: PropTypes.any
    }),
    state: PropTypes.object
}

Autocomplete.propTypes = {
    navigate: PropTypes.func,
    currency: PropTypes.object
}
