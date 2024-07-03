import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import ProductTile from '../algolia-product-tile'
import {HorizontalSlider} from '@algolia/ui-components-horizontal-slider-react'
import '@algolia/ui-components-horizontal-slider-theme'
import {RelatedProducts as AlgoliaRelatedProducts} from '@algolia/recommend-react'
import recommend from '@algolia/recommend'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import WidgetHeader from './utils/widgetheader'
import {useWishlistOperations} from '../../../hooks/use-wishlist-operations'

const RelatedProducts = ({product, selectedColors, setSelectedColors}) => {
    const {currency: activeCurrency} = useCurrency()
    let {app: algoliaConfig} = useMemo(() => getConfig(), [])
    algoliaConfig = {
        ...algoliaConfig.algolia
    }

    const indexName = algoliaConfig.indices.primary.value

    const recommendClient = useMemo(() => {
        return recommend(algoliaConfig.appId, algoliaConfig.apiKey)
    }, [])

    // Use the wishlist operations hook
    const {addItemToWishlist, removeItemFromWishlist, isInWishlist, isWishlistLoading} =
        useWishlistOperations()

    const getReferenceProductId = (product) => {
        if (!product) {
            return null
        }

        if (product && product.type.master) {
            return product.variants[0].productId
        }
        return product.id
    }

    return (
        <AlgoliaRelatedProducts
            recommendClient={recommendClient}
            indexName={indexName}
            objectIDs={[getReferenceProductId(product)]}
            headerComponent={(recommendations) => (
                <WidgetHeader recommendations={recommendations} title="Related Products" />
            )}
            itemComponent={({item}) => {
                return (
                    <ProductTile
                        data-testid={`sf-product-tile-${item.id}`}
                        key={item.id}
                        product={item}
                        enableFavourite={true}
                        isFavourite={isInWishlist(item)}
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

RelatedProducts.propTypes = {
    product: PropTypes.object.isRequired,
    selectedColors: PropTypes.object.isRequired,
    setSelectedColors: PropTypes.func.isRequired
}

export default RelatedProducts
