/** @jsxRuntime classic */
/** @jsx React.createElement */
import {getAlgoliaResults} from '@algolia/autocomplete-js'
import {SearchResponse} from '@algolia/client-search'
import React, {createElement, Fragment, useEffect, useRef, useState} from 'react'
import {ALGOLIA_PRODUCTS_INDEX_NAME} from '../constants'
import {searchClient} from '../searchClient'
import {cx, hash} from '../utils'
import {QuickAccessHit} from '../types'

/**
 * An Autocomplete Plugin that provides quick access results from Algolia. A Rule is defined in the Algolia dashboard to display the same results for all empty queries.
 * Example Configuration is here:
 * {
    "conditions": [
      {
        "anchoring": "is",
        "pattern": "",
        "alternatives": false,
        "context": "quickAccess"
      }
    ],
    "consequence": {
      "userData": {
        "items": [
          {
            "href": "/category/womens-outfits",
            "image": "https://res.cloudinary.com/hilnmyskv/image/upload/v1645453369/sales_banner_y1hsr8.jpg",
            "subtitle": "Women",
            "template": "sales-banner",
            "title": "Outfits"
          },
          {
            "date": "Till March 25th",
            "href": "/category/womens",
            "image": "https://res.cloudinary.com/hilnmyskv/image/upload/v1645453422/sales_code_vuatep.jpg",
            "subtitle": "with the code CODE_ALGOLIA",
            "template": "sales-code",
            "title": "Sale on Women Top"
          },
          {
            "href": "/category/top-seller",
            "image": "https://res.cloudinary.com/hilnmyskv/image/upload/v1645453466/new_collection_nloeb6.jpg",
            "subtitle": "spring / summer 2024",
            "template": "new-collection",
            "title": "Top sellers"
          },
          {
            "href": "/category/womens-jewelry",
            "links": [
              {
                "href": "/category/womens-jewelry",
                "text": "Track my order"
              },
              {
                "href": "/category/womens-jewelry",
                "text": "Delivery & Returns"
              },
              {
                "href": "/category/womens-jewelry",
                "text": "FAQ"
              }
            ],
            "template": "help",
            "title": "how can we help?"
          }
        ]
      },
      "filterPromotes": true
    },
    "enabled": true,
    "description": "Autocomplete quick access on empty query state",
    "objectID": "qr-1645439637066"
    }
 * Check the [Algolia documentation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/plugins/#building-your-own-plugin) for more information.
 */
export const quickAccessPluginFactory = (navigate) => ({
    getSources({query}) {
        if (query) {
            return []
        }
        return [
            {
                sourceId: 'quickAccessPlugin',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                                query,
                                params: {
                                    hitsPerPage: 0,
                                    ruleContexts: ['quickAccess']
                                }
                            }
                        ],
                        transformResponse({results}) {
                            return (results as SearchResponse[])?.[0].userData?.[0]?.items || []
                        }
                    })
                },
                renderer: {createElement, Fragment, render: () => {}},
                templates: {
                    header({Fragment}) {
                        return (
                            <Fragment>
                                <span className="aa-SourceHeaderTitle">Quick access</span>
                                <div className="aa-SourceHeaderLine" />
                            </Fragment>
                        )
                    },
                    item({item}) {
                        return <QuickAccessItem hit={item} navigate={navigate} />
                    }
                }
            }
        ]
    }
})

/**
 * QuickAccessItemProps interface.
 *
 * @interface QuickAccessItemProps
 * @property {QuickAccessHit} hit - The quick access hit object.
 * @property {(url: string) => void} navigate - The navigate function to handle clicks.
 */
type QuickAccessItemProps = {
    hit: QuickAccessHit
    navigate: (url: string) => void
}

/**
 * QuickAccessItem component.
 * @param {QuickAccessItemProps} props - The component props.
 * @returns {React.ReactElement} The QuickAccessItem component.
 */
function QuickAccessItem({hit, navigate}: QuickAccessItemProps) {
    function handleClick(selectedHit) {
        if(selectedHit.template === "help"){
            window.open(selectedHit.href, '_blank');
        }else{
            navigate(selectedHit.href)
        }
    }

    return (
        <a
            key={hash(hit.title)}
            onClick={() => handleClick(hit)}
            className={cx('aa-ItemLink aa-QuickAccessItem', `aa-QuickAccessItem--${hit.template}`)}
        >
            <div className="aa-ItemContent">
                {hit.image && (
                    <div className="aa-ItemPicture">
                        <img src={hit.image} alt={hit.title} />
                    </div>
                )}
                <div key={hash(hit.title)} className="aa-ItemContentBody">
                    {hit.date && <div className="aa-ItemContentDate">{hit.date}</div>}
                    <div className="aa-ItemContentTitle">{hit.title}</div>
                    {hit.subtitle && <div className="aa-ItemContentSubTitle">{hit.subtitle}</div>}
                    {hit.links && (
                        <ul>
                            {hit.links.map((link) => (
                                <li className="quicklinks" key={hash(link.text)}>
                                    <span
                                        className="quickAccessItemAnchor"
                                        onClick={() => handleClick(link.href)}
                                    >
                                        {link.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </a>
    )
}
