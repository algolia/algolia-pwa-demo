import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {HeartIcon, HeartSolidIcon} from '@salesforce/retail-react-app/app/components/icons'

// Components
import {
    AspectRatio,
    Box,
    Skeleton as ChakraSkeleton,
    Text,
    Stack,
    useMultiStyleConfig,
    IconButton
} from '@chakra-ui/react'
import DynamicImage from '../dynamic-image'
import AlgoliaProductSwatch from '../../../pages/algolia-product-list/partials/algolia-product-swatch'

// Hooks
import {useIntl} from 'react-intl'

// Other
import {productUrlBuilder} from '@salesforce/retail-react-app/app/utils/url'
import Link from '@salesforce/retail-react-app/app/components/link'
import withRegistration from '@salesforce/retail-react-app/app/components/with-registration'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'

const IconButtonWithRegistration = withRegistration(IconButton)

// Component Skeleton
export const Skeleton = () => {
    const styles = useMultiStyleConfig('ProductTile')
    return (
        <Box data-testid="sf-product-tile-skeleton">
            <Stack spacing={2}>
                <Box {...styles.imageWrapper}>
                    <AspectRatio ratio={1} {...styles.image}>
                        <ChakraSkeleton />
                    </AspectRatio>
                </Box>
                <ChakraSkeleton width="80px" height="20px" />
                <ChakraSkeleton width={{base: '120px', md: '220px'}} height="12px" />
            </Stack>
        </Box>
    )
}

/**
 * The ProductTile is a simple visual representation of a
 * product object. It will show it's default image, name and price.
 * It also supports favourite products, controlled by a heart icon.
 *
 * name,brand,master,variant,short-description,searchable-flag,
 * short_description,color,size,category_1,url,image_groups,promotionalPrice,
 * refinementColor,refinement_color,apparelFeatures,apparel_features
 */
const ProductTile = (props) => {
    const intl = useIntl()
    const {
        product,
        currency,
        enableFavourite = false,
        isFavourite,
        onFavouriteToggle,
        dynamicImageProps,
        selectedColors,
        setSelectedColors,
        ...rest
    } = props
    // ProductTile is used by two components, RecommendedProducts and ProductList.
    // RecommendedProducts provides a localized product name as `name` and non-localized product
    // name as `productName`. ProductList provides a localized name as `productName` and does not
    // use the `name` property.
    const localizedProductName = product.name ?? product.productName

    const [isFavouriteLoading, setFavouriteLoading] = useState(false)
    const styles = useMultiStyleConfig('ProductTile')

    let imageUrl = product.image
    let imageAlt = ''

    if (product.image_groups) {
        product.image_groups.forEach((imageGroup) => {
            if (imageGroup.view_type == 'large') {
                imageUrl = imageGroup.images[0].dis_base_link
                imageAlt = imageGroup.images[0].alt
            }
        })
    }

    const productPrice = product.price ? product.price.USD : ''
    const {currency: activeCurrency} = useCurrency()

    return (
        <Box>
            <Link
                data-testid="product-tile"
                {...styles.container}
                to={productUrlBuilder({id: product.objectID}, intl.local)}
                {...rest}
            >
                <Box {...styles.imageWrapper}>
                    <AspectRatio {...styles.image}>
                        <DynamicImage
                            src={`${
                                selectedColors[product.masterID]
                                    ? selectedColors[product.masterID]
                                    : imageUrl
                            }[?sw={width}&q=60]`}
                            widths={dynamicImageProps?.widths}
                            imageProps={{
                                alt: imageAlt,
                                ...dynamicImageProps?.imageProps
                            }}
                        />
                    </AspectRatio>

                    {enableFavourite && (
                        <Box
                            onClick={(e) => {
                                // stop click event from bubbling
                                // to avoid user from clicking the underlying
                                // product while the favourite icon is disabled
                                e.preventDefault()
                            }}
                        >
                            <IconButtonWithRegistration
                                aria-label={intl.formatMessage({
                                    id: 'product_tile.assistive_msg.wishlist',
                                    defaultMessage: 'Wishlist'
                                })}
                                icon={isFavourite ? <HeartSolidIcon /> : <HeartIcon />}
                                {...styles.favIcon}
                                disabled={isFavouriteLoading}
                                onClick={async () => {
                                    setFavouriteLoading(true)
                                    await onFavouriteToggle(!isFavourite)
                                    setFavouriteLoading(false)
                                }}
                                style={{outlineOffset: '0px', outlineColor: 'transparent'}}
                            />
                        </Box>
                    )}
                </Box>
                <Box {...styles.detailsWrapper}>
                    {/* Title */}
                    <Text {...styles.title}>
                        <span dangerouslySetInnerHTML={{__html: localizedProductName}} />
                    </Text>

                    {/* Price */}
                    <Text {...styles.price}>
                        {intl.formatNumber(productPrice, {
                            style: 'currency',
                            currency: currency || activeCurrency
                        })}
                    </Text>
                </Box>
            </Link>
            <AlgoliaProductSwatch
                product={product}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
            />
        </Box>
    )
}

ProductTile.displayName = 'ProductTile'

ProductTile.propTypes = {
    /**
     * The product search hit that will be represented in this
     * component.
     */
    product: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.shape({
            alt: PropTypes.string,
            disBaseLink: PropTypes.string,
            link: PropTypes.string
        }),
        price: PropTypes.shape({
            USD: PropTypes.number
        }),
        // `name` is present and localized when `product` is provided by a RecommendedProducts component
        // (from Shopper Products `getProducts` endpoint), but is not present when `product` is
        // provided by a ProductList component.
        // See: https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-products?meta=getProducts
        name: PropTypes.string,
        // `productName` is localized when provided by a ProductList component (from Shopper Search
        // `productSearch` endpoint), but is NOT localized when provided by a RecommendedProducts
        // component (from Einstein Recommendations `getRecommendations` endpoint).
        // See: https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-search?meta=productSearch
        // See: https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-api-quick-start-guide?meta=getRecommendations
        // Note: useEinstein() transforms snake_case property names from the API response to camelCase
        productName: PropTypes.string,
        productId: PropTypes.string,
        image_groups: PropTypes.arrayOf(PropTypes.object),
        masterID: PropTypes.string,
        objectID: PropTypes.string
    }),
    /**
     * Enable adding/removing product as a favourite.
     * Use case: wishlist.
     */
    enableFavourite: PropTypes.bool,
    /**
     * Display the product as a faviourite.
     */
    isFavourite: PropTypes.bool,
    /**
     * Callback function to be invoked when the user
     * interacts with favourite icon/button.
     */
    onFavouriteToggle: PropTypes.func,
    dynamicImageProps: PropTypes.object,
    currency: PropTypes.string,
    selectedColors: PropTypes.object,
    setSelectedColors: PropTypes.func
}

export default ProductTile
