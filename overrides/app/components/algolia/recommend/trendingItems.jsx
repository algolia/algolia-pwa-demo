import React, {useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import ProductTile from '../algolia-product-tile'
import {HorizontalSlider} from '@algolia/ui-components-horizontal-slider-react'
import '@algolia/ui-components-horizontal-slider-theme'
import {TrendingItems as AlgoliaTrendingItems} from '@algolia/recommend-react'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import WidgetHeader from './utils/widgetheader'
import {useWishlistOperations} from '../../../hooks/use-wishlist-operations'
import {recommendClient} from '../../algolia/autocomplete/recommendClient'

const TrendingItems = ({facetName, facetValue}) => {
    const {currency: activeCurrency} = useCurrency()
    let {app: algoliaConfig} = useMemo(() => getConfig(), [])
    algoliaConfig = {
        ...algoliaConfig.algolia
    }

    const indexName = algoliaConfig.indices.primary.value

    const [selectedColors, setSelectedColors] = useState({})

    // Use the wishlist operations hook
    const {addItemToWishlist, removeItemFromWishlist, isInWishlist, isWishlistLoading} =
        useWishlistOperations()

    return (
        <AlgoliaTrendingItems
            recommendClient={recommendClient}
            indexName={indexName}
            facetName={facetName}
            facetValue={facetValue}
            headerComponent={(recommendations) => (
                <WidgetHeader recommendations={recommendations} title="Trending Products" />
            )}
            itemComponent={({item}) => {
                return (
                    <ProductTile
                        data-testid={`sf-product-tile-${item.id}`}
                        key={item.id}
                        enableFavourite={true}
                        isFavourite={isInWishlist(item)}
                        product={item}
                        currency={activeCurrency}
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                        onFavouriteToggle={(isFavourite) => {
                            const action = isFavourite ? addItemToWishlist : removeItemFromWishlist
                            return action(item)
                        }}
                        dynamicImageProps={{
                            widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
                        }}
                        isLoading={isWishlistLoading}
                    />
                )
            }}
            view={HorizontalSlider}
        />
    )
}

TrendingItems.propTypes = {
    facetName: PropTypes.string.isRequired,
    facetValue: PropTypes.string.isRequired
}

export default TrendingItems
