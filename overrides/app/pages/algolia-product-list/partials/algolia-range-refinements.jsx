import React from 'react'
import {Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'

import AlgoliaRefinementsContainer from './algolia-refinements-container'
import PropTypes from 'prop-types'
import {RangeInput} from 'react-instantsearch'

const AlgoliaRangeRefinementsAlt = (props) => {
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
                    <RangeInput
                        classNames={{
                            input: 'custom-range-input',
                            submit: 'custom-range-submit',
                            separator: 'custom-range-separator'
                        }}
                        translations={{
                            separatorElementText: '-',
                            submitButtonText: 'Apply'
                        }}
                        attribute="price.USD"
                    />
                </AlgoliaRefinementsContainer>
            </AccordionPanel>
        </AccordionItem>
    )
}

AlgoliaRangeRefinementsAlt.propTypes = {
    attribute: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaRangeRefinementsAlt
