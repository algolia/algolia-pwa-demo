import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useHits, useInstantSearch} from 'react-instantsearch'
import ProductTile, {
    Skeleton as ProductTileSkeleton
} from '../../../components/algolia-product-tile/index'

const AlgoliaHitsProducts = (props) => {
    const {isLoading,searchQuery,category,einstein, addItemToWishlist, removeItemFromWishlist,isInWishlist,activeCurrency} = props
    const {hits, sendEvent} = useHits()
    const {status} = useInstantSearch(props)

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
            {hits.map((hit, idx) => (
                <ProductTile
                    data-testid={`sf-product-tile-${hit.id}`}
                    key={hit.id}
                    product={hit}
                    enableFavourite={true}
                    isFavourite={isInWishlist}
                    currency={activeCurrency}
                    onClick={() => {
                        sendEvent('click', hit, 'Product Clicked')

                        if (searchQuery) {
                            einstein.sendClickSearch(searchQuery, hit)
                        } else if (category) {
                            einstein.sendClickCategory(category, hit)
                        }
                    }}
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
    isLoading: PropTypes.bool
}

export default AlgoliaHitsProducts
