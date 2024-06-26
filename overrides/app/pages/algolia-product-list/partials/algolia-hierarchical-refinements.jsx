import React from 'react'
import {Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'
import {HierarchicalMenu} from 'react-instantsearch'
import PropTypes from 'prop-types'
import AlgoliaRefinementsContainer from './algolia-refinements-container'

const AlgoliaHierarchicalRefinements = (props) => {
    const {attributes, rootPath, title} = props

    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                        {title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <AlgoliaRefinementsContainer attributes={attributes}>
                    <HierarchicalMenu
                        attributes={attributes}
                        rootPath={rootPath}
                        classNames={{
                            root: 'root',
                            count: 'category-count'
                        }}
                    />
                </AlgoliaRefinementsContainer>
            </AccordionPanel>
        </AccordionItem>
    )
}

AlgoliaHierarchicalRefinements.propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.string),
    rootPath: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaHierarchicalRefinements
