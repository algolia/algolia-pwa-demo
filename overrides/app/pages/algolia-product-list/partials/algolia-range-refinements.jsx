import React, {useEffect, useState} from 'react'
import {
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Input,
    FormControl,
    FormLabel
} from '@chakra-ui/react'

import {useIntl} from 'react-intl'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import {useConnector} from 'react-instantsearch'
import connectRange from 'instantsearch.js/es/connectors/range/connectRange'
import AlgoliaRefinementsContainer from './algolia-refinements-container'
import PropTypes from 'prop-types'

const fnOpts = {
    style: 'currency',
    maximumFractionDigits: 0
}

const useAlgoliaRangeSlider = (props) => {
    return useConnector(connectRange, props)
}

const AlgoliaRangeRefinements = (props) => {
    const intl = useIntl()
    const {currency} = useCurrency()

    const {start, range, refine} = useAlgoliaRangeSlider(props)
    const [minValue, setMinValue] = useState(range.min)
    const [maxValue, setMaxValue] = useState(range.max)
    const [rangeLoad, setRangeLoad] = useState(false)
    const [minTimeout, setMinTimeout] = useState(null)
    const [maxTimeout, setMaxTimeout] = useState(null)

    useEffect(() => {
        if (!rangeLoad) {
            if (range.min > 0 || range.max > 0) {
                setMinValue(range.min)
                setMaxValue(range.max)
                setRangeLoad(true)
            }
        }
    }, [range])

    const handleMinValueChange = (e) => {
        let val = Number(e.target.value)
        clearTimeout(minTimeout)
        setMinValue(val)
        const newTimeout = setTimeout(() => {
            if (val < range.min) {
                val = range.min
            }

            if (val > maxValue) {
                val = maxValue
            }

            setMinValue(val)

            refine([val, maxValue])
        }, 500)
        setMinTimeout(newTimeout)
    }

    const handleMaxValueChange = (e) => {
        let val = Number(e.target.value)

        clearTimeout(maxTimeout)
        setMaxValue(val)
        const newTimeout = setTimeout(() => {
            if (val > range.max) {
                val = range.max
            }
            if (val < minValue) {
                val = minValue
            }
            setMaxValue(val)
            refine([minValue, val])
        }, 500)
        setMaxTimeout(newTimeout)
    }

    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                        {props.title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <AlgoliaRefinementsContainer attributes={[props.attribute]}>
                    <Box pb="1" display="flex" gap="4">
                        <FormControl>
                            <FormLabel htmlFor="minValue">Min</FormLabel>
                            <Input
                                id="minValue"
                                type="number"
                                value={minValue}
                                min={range.min}
                                max={range.max}
                                onChange={handleMinValueChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="maxValue">Max</FormLabel>
                            <Input
                                id="maxValue"
                                type="number"
                                value={maxValue}
                                min={range.min}
                                max={range.max}
                                onChange={handleMaxValueChange}
                            />
                        </FormControl>
                    </Box>
                </AlgoliaRefinementsContainer>
            </AccordionPanel>
        </AccordionItem>
    )
}

AlgoliaRangeRefinements.propTypes = {
    attribute: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaRangeRefinements
