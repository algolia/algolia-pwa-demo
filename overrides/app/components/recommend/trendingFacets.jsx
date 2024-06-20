import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import '@algolia/ui-components-horizontal-slider-theme'
import {TrendingFacets as AlgoliaTrendingFacets} from '@algolia/recommend-react'
import recommend from '@algolia/recommend'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import WidgetHeader from './utils/widgetheader'
import {BrandItem} from '../algolia/autocomplete/components/BrandItem'

const TrendingFacets = ({facetName, title}) => {
    let {app: algoliaConfig} = useMemo(() => getConfig(), [])
    algoliaConfig = {
        ...algoliaConfig.algolia
    }

    const indexName = algoliaConfig.indices.primary.value

    const recommendClient = useMemo(() => {
        return recommend(algoliaConfig.appId, algoliaConfig.apiKey)
    }, [])

    return (
        <AlgoliaTrendingFacets
            recommendClient={recommendClient}
            indexName={indexName}
            facetName={facetName}
            headerComponent={(recommendations) => (
                <WidgetHeader
                    recommendations={recommendations}
                    title={title || 'Trending Facets'}
                />
            )}
            itemComponent={TrendingFacetItem}
        />
    )
}

function TrendingFacetItem({item, components}) {
    return <BrandItem hit={item} components={components} />
}

TrendingFacets.propTypes = {
    facetName: PropTypes.object.isRequired,
    title: PropTypes.string
}

export default TrendingFacets
