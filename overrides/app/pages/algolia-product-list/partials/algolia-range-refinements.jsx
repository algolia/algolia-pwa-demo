/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
import {
    Box,
    RangeSlider,
    RangeSliderMark,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb
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
    const [sliderValue, setSliderValue] = useState([range.min, range.max])
    const isMax = sliderValue[1] === range.max
    const step = Math.ceil((range.max - range.min) / 4)

    useEffect(() => {
        setSliderValue([range.min, range.max])
    }, [range])

    return (
        <AlgoliaRefinementsContainer title={props.title} attributes={[props.attribute]}>
            <Box pb="1">
                <RangeSlider
                    aria-label={['min', 'max']}
                    defaultValue={start}
                    min={range.min}
                    max={range.max}
                    step={step}
                    onChange={(val) => {
                        setSliderValue(val)
                        refine(val)
                    }}
                >
                    <RangeSliderMark
                        value={sliderValue[0]}
                        textAlign="center"
                        bg="black"
                        color="white"
                        p="1"
                        mt="0.5"
                        fontSize="sm"
                    >
                        {intl.formatNumber(sliderValue[0], {
                            ...fnOpts,
                            currency
                        })}
                    </RangeSliderMark>
                    <RangeSliderMark
                        value={sliderValue[1]}
                        textAlign="center"
                        bg="black"
                        color="white"
                        p="1"
                        mt="0.5"
                        fontSize="sm"
                        left={isMax && 'auto !important'}
                        right={isMax && '0'}
                    >
                        {intl.formatNumber(sliderValue[1], {
                            ...fnOpts,
                            currency
                        })}
                    </RangeSliderMark>
                    <RangeSliderTrack bg="gray.200">
                        <RangeSliderFilledTrack bg="black" />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0} border="2px" borderColor="gray.200" />
                    <RangeSliderThumb boxSize={6} index={1} border="2px" borderColor="gray.200" />
                </RangeSlider>
            </Box>
        </AlgoliaRefinementsContainer>
    )
}

AlgoliaRangeRefinements.propTypes = {
    attribute: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaRangeRefinements
