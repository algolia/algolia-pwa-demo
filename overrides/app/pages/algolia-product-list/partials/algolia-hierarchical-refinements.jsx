import React from 'react'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import {HierarchicalMenu} from 'react-instantsearch'
import AlgoliaRefinementsContainer from './algolia-refinements-container'
import PropTypes from 'prop-types'

const AlgoliaHierarchicalRefinements = (props) => {
    const {attributes, rootPath, title} = props
    const styles = useMultiStyleConfig('AlgoliaHierarchicalRefinements')

    return (
        <AlgoliaRefinementsContainer title={title} attributes={attributes}>
            <Box sx={styles}>
                <HierarchicalMenu
                    attributes={attributes}
                    rootPath={rootPath}
                    classNames={{
                        root: 'root',
                        count: 'category-count'
                    }}
                />
            </Box>
        </AlgoliaRefinementsContainer>
    )
}

AlgoliaHierarchicalRefinements.propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.string),
    rootPath: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaHierarchicalRefinements
