import React from 'react'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import {CurrentRefinements} from 'react-instantsearch'
import PropTypes from 'prop-types'

const AlgoliaCurrentRefinements = () => {
    const styles = useMultiStyleConfig('AlgoliaCurrentRefinements')

    var currency_symbols = {
        USD: '$',
        EUR: '€',
        CRC: '₡',
        GBP: '£',
        ILS: '₪',
        INR: '₹',
        JPY: '¥',
        KRW: '₩',
        NGN: '₦',
        PHP: '₱',
        PLN: 'zł',
        PYG: '₲',
        THB: '฿',
        UAH: '₴',
        VND: '₫'
    }

    const getCurrency = (refinement) => {
        const currencyCode = refinement.attribute.split('.')[1]

        return currency_symbols[currencyCode]
    }

    const customTransformItems = (items) => {
        return items.map((item) => {
            if (item.attribute.includes('price')) {
                var refinements = item.refinements.map((refinement) => {
                    return {
                        ...refinement,
                        label:
                            refinement.operator + ' ' + getCurrency(refinement) + refinement.value
                    }
                })
                item.refinements = refinements
                return {
                    ...item,
                    label: 'price'
                }
            } else if (item.attribute === '__primary_category.0') {
                return {
                    ...item,
                    label: 'category'
                }
            }
            return item
        })
    }

    return (
        <Box sx={styles}>
            <CurrentRefinements
                transformItems={customTransformItems}
                classNames={{
                    label: 'label',
                    item: 'item',
                    category: 'category',
                    delete: 'delete'
                }}
            />
        </Box>
    )
}

AlgoliaCurrentRefinements.propTypes = {
    transformItems: PropTypes.func
}

export default AlgoliaCurrentRefinements
