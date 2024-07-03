import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {useHits, useInstantSearch} from 'react-instantsearch'
import ProductTile, {
    Skeleton as ProductTileSkeleton
} from '../../../components/algolia/algolia-product-tile/index'

const AlgoliaHitsProducts = (props) => {
    const {isLoading, addItemToWishlist, removeItemFromWishlist, isInWishlist, activeCurrency} = props
    const {hits, sendEvent} = useHits()
    const {status} = useInstantSearch(props)
    const [selectedColors, setSelectedColors] = useState({})

    if (isLoading || status === 'loading' || status === 'stalled') {
        return (
            <>
                {new Array(10).fill(0).map((value, index) => (
                    <ProductTileSkeleton key={index} />
                ))}
            </>
        )
    }

    return (
        <>
            {hits.map((hit) => (
                <ProductTile
                    data-testid={`sf-product-tile-${hit.id}`}
                    key={hit.id}
                    product={hit}
                    enableFavourite={true}
                    currency={activeCurrency}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    onClick={() => {
                        sendEvent('click', hit, 'Product Clicked')
                    }}
                    isFavourite={isInWishlist(hit)}
                    onFavouriteToggle={(isFavourite) => {
                        const action = isFavourite ? addItemToWishlist : removeItemFromWishlist
                        return action(hit)
                    }}
                    dynamicImageProps={{
                        widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
                    }}
                />
            ))}
        </>
    )
}

AlgoliaHitsProducts.propTypes = {
    hitComponent: PropTypes.func,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string,
    category: PropTypes.string,
    addItemToWishlist: PropTypes.func,
    removeItemFromWishlist: PropTypes.func,
    isInWishlist: PropTypes.func,
    activeCurrency: PropTypes.object
}

export default AlgoliaHitsProducts
