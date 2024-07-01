import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import {useHits} from 'react-instantsearch'
import {useHasRefinements} from '../../../hooks/use-has-refinements'

import PropTypes from 'prop-types'

const AlgoliaRefinementsContainer = (props) => {
    const divider = props.divider === undefined ? true : divider
    const {results} = useHits()
    const hasRefinements = useHasRefinements(results, props.attributes)
    return (
        <Box display={hasRefinements ? 'block' : 'none'}>
            <Text fontSize="md" fontWeight={600}>
                {props.title}
            </Text>
            <Box mt="4">{props.children}</Box>
        </Box>
    )
}

export default AlgoliaRefinementsContainer

AlgoliaRefinementsContainer.propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
    divider: PropTypes.bool,
    title: PropTypes.string
}
