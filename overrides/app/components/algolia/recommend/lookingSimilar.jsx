import React, {useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import ProductTile from '../algolia-product-tile'
import {HorizontalSlider} from '@algolia/ui-components-horizontal-slider-react'
import '@algolia/ui-components-horizontal-slider-theme'
import {LookingSimilar as AlgoliaLookingSimilar} from '@algolia/recommend-react'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import WidgetHeader from './utils/widgetheader'
import {useWishlistOperations} from '../../../hooks/use-wishlist-operations'
import {recommendClient} from '../../algolia/autocomplete/recommendClient'

const LookingSimilar = ({product}) => {
    const {currency: activeCurrency} = useCurrency()
    let {app: algoliaConfig} = useMemo(() => getConfig(), [])
    algoliaConfig = {
        ...algoliaConfig.algolia
    }

    const [selectedColors, setSelectedColors] = useState({})

    const indexName = algoliaConfig.indices.primary.value

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
        <AlgoliaLookingSimilar
            recommendClient={recommendClient}
            indexName={indexName}
            objectIDs={[getReferenceProductId(product)]}
            headerComponent={(recommendations) => (
                <WidgetHeader recommendations={recommendations} title="Looking Similar" />
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

LookingSimilar.propTypes = {
    product: PropTypes.object.isRequired
}

export default LookingSimilar
