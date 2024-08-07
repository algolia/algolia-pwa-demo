import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useHits, useInstantSearch} from 'react-instantsearch'
import {Skeleton as ProductTileSkeleton} from '../../../components/algolia/algolia-product-tile/index'
import {Box, Collapse, Divider, Text, VStack} from '@chakra-ui/react'

const AlgoliaHitsContent = (props) => {
    const {isLoading} = props
    const {hits} = useHits()
    const {status} = useInstantSearch(props)

    useEffect(() => {
        props.setContentHitsCount(hits.length)
    }, [hits])

    if (isLoading || status === 'loading' || status === 'stalled') {
        return (
            <>
                {new Array(10).fill(0).map((value, index) => (
                    <ProductTileSkeleton key={index} />
                ))}
            </>
        )
    }

    return (
        <VStack align="stretch" spacing={4}>
            {hits.map((hit, idx) => (
                <Fragment key={idx}>
                    <Collapse startingHeight={20} animateOpacity in>
                        <Box borderRadius="md" borderWidth="1px" borderColor="gray.200" p={4}>
                            <Text fontSize="24px" color="#00a1e0">
                                {hit.name}
                            </Text>
                            <Divider marginY={2} />
                            {hit.body.length > 500 ? `${hit.body.substring(0, 500)}...` : hit.body}
                        </Box>
                    </Collapse>
                </Fragment>
            ))}
        </VStack>
    )
}

AlgoliaHitsContent.propTypes = {
    hitComponent: PropTypes.func,
    isLoading: PropTypes.bool,
    setContentHitsCount: PropTypes.func
}

export default AlgoliaHitsContent
