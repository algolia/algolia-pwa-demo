import {AutocompletePlugin, getAlgoliaResults} from '@algolia/autocomplete-js'
import {SearchResponse} from '@algolia/client-search'
import React, {createElement, Fragment} from 'react'
import {ALGOLIA_CONTENT_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {ContentHit} from '../types'
import {InfoIcon} from '@salesforce/retail-react-app/app/components/icons'

/**
 * An Autocomplete Plugin that provides content suggestions from Algolia.
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const contentPlugin: AutocompletePlugin<ContentHit, {}> = {
    getSources({query}) {
        if (!query) {
            return []
        }

        return [
            {
                sourceId: 'contentPlugin',
                getItems({setContext}) {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: ALGOLIA_CONTENT_INDEX_NAME,
                                query,
                                params: {
                                    hitsPerPage: 2
                                }
                            }
                        ],
                        transformResponse({hits, results}) {
                            setContext({
                                nbContent: (results[0] as SearchResponse<ContentHit>).nbHits
                            })

                            return hits
                        }
                    })
                },
                onSelect({setIsOpen}) {
                    setIsOpen(true)
                },
                renderer: {createElement, Fragment, render: () => {}},
                templates: {
                    header({state}) {
                        return (
                            <div className='aa-SourceHeader--right'>
                                <span className="aa-SourceHeaderTitle">Content</span>
                                <span className="aa-SourceHeaderButton">
                                    <a
                                        href={`/search?q=${state.query}&tab=articles`}
                                        rel="noreferrer noopener"
                                        className="aa-SeeAllLink"
                                    >View All Content for "{state.query}" ({state.context.nbContent})
                                    </a>
                                </span>
                            </div>
                        )
                    },
                    item({item}) {
                        return <ContentItem hit={item} />
                    }
                }
            }
        ]
    }
}

/**
 * Props for the `ContentItem` component.
 * @typedef {Object} ContentItemProps
 * @property {ContentHit} hit - The content data to be displayed.
 */
type ContentItemProps = {
    hit: ContentHit
}

/**
 * Component to render an individual content item.
 * This component displays a clickable content link, which includes an image,
 * the content's title, and a brief description truncated to 25 characters.
 * It is designed to be used within the autocomplete suggestions list.
 *
 * @param {ContentItemProps} props - The props for the content item component.
 * @returns {React.ReactElement} The JSX element representing the content item.
 */
function ContentItem({hit}: ContentItemProps) {
    return (
        <a key={hit.objectID} href="https://support.algolia.com/hc/en-us" target="_blank" className="aa-ItemLink aa-ContentItem">
            <div className="aa-ItemContent">
                <div className="aa-ItemPicture">
                    {hit.image ? <img src={hit.image} alt={hit.name} /> : <InfoIcon />}
                </div>

                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">{hit.name}</div>
                    {hit.description && (
                        <div className="aa-ItemContentDate">
                            {hit.description.substring(0, 125) + '...'}
                        </div>
                    )}
                </div>
            </div>
        </a>
    )
}
