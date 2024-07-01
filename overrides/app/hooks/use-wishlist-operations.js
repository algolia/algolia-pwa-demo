// useWishlistOperations.js
import React from 'react'
import {useIntl} from 'react-intl'
import {useToast} from '@salesforce/retail-react-app/app/hooks/use-toast'
import {useShopperCustomersMutation} from '@salesforce/commerce-sdk-react'
import {useCustomerId} from '@salesforce/commerce-sdk-react'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import {useWishList} from '@salesforce/retail-react-app/app/hooks/use-wish-list'
import {
    API_ERROR_MESSAGE,
    TOAST_MESSAGE_ADDED_TO_WISHLIST,
    TOAST_MESSAGE_REMOVED_FROM_WISHLIST,
    TOAST_ACTION_VIEW_WISHLIST
} from '@salesforce/retail-react-app/app/constants'
import {Button} from '@salesforce/retail-react-app/app/components/shared/ui'

export const useWishlistOperations = () => {
    const {formatMessage} = useIntl()
    const navigate = useNavigation()
    const toast = useToast()
    const customerId = useCustomerId()
    const {data: wishlist, isLoading: isWishlistLoading, refetch: refetchWishlist} = useWishList()
    const {mutateAsync: createCustomerProductListItem} = useShopperCustomersMutation(
        'createCustomerProductListItem'
    )
    const {mutateAsync: deleteCustomerProductListItem} = useShopperCustomersMutation(
        'deleteCustomerProductListItem'
    )

    const addItemToWishlist = async (product) => {
        if (!wishlist) {
            await refetchWishlist()
        }

        if (!wishlist) {
            toast({
                title: formatMessage({
                    id: 'wishlist_error',
                    defaultMessage: 'Unable to access wishlist. Please try again later.'
                }),
                status: 'error'
            })
            return
        }

        const listId = wishlist.id
        await createCustomerProductListItem(
            {
                parameters: {customerId, listId},
                body: {
                    quantity: 1,
                    public: false,
                    priority: 1,
                    type: 'product',
                    productId: product.objectID || product.id
                }
            },
            {
                onError: () => {
                    toast({
                        title: formatMessage(API_ERROR_MESSAGE),
                        status: 'error'
                    })
                },
                onSuccess: () => {
                    refetchWishlist()
                    toast({
                        title: formatMessage(TOAST_MESSAGE_ADDED_TO_WISHLIST, {quantity: 1}),
                        status: 'success',
                        action: (
                            <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                                {formatMessage(TOAST_ACTION_VIEW_WISHLIST)}
                            </Button>
                        )
                    })
                }
            }
        )
    }

    const removeItemFromWishlist = async (product) => {
        if (!wishlist) {
            await refetchWishlist()
        }

        if (!wishlist) {
            toast({
                title: formatMessage({
                    id: 'wishlist_error',
                    defaultMessage: 'Unable to access wishlist. Please try again later.'
                }),
                status: 'error'
            })
            return
        }

        const listId = wishlist.id
        const itemId = wishlist.customerProductListItems.find(
            (i) => i.productId === (product.objectID || product.id)
        )?.id

        if (!itemId) {
            toast({
                title: formatMessage({
                    id: 'product_not_in_wishlist',
                    defaultMessage: 'Product not found in wishlist'
                }),
                status: 'error'
            })
            return
        }

        await deleteCustomerProductListItem(
            {
                parameters: {customerId, listId, itemId}
            },
            {
                onError: () => {
                    toast({
                        title: formatMessage(API_ERROR_MESSAGE),
                        status: 'error'
                    })
                },
                onSuccess: () => {
                    refetchWishlist()
                    toast({
                        title: formatMessage(TOAST_MESSAGE_REMOVED_FROM_WISHLIST),
                        status: 'success'
                    })
                }
            }
        )
    }

    const isInWishlist = (product) => {
        if (!wishlist || !wishlist.customerProductListItems) return false
        return wishlist.customerProductListItems.some(
            (item) => item.productId === (product.objectID || product.id)
        )
    }

    return {addItemToWishlist, removeItemFromWishlist, isInWishlist, isWishlistLoading}
}
