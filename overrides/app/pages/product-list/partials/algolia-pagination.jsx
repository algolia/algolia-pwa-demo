/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link, ListItem, OrderedList} from '@chakra-ui/react'
import {usePagination} from 'react-instantsearch-hooks-web'
import {ChevronLeftIcon, ChevronRightIcon} from '../../../components/icons'

const AlgoliaPagination = (props) => {
    const {onPageChange, ...rest} = props
    const {currentRefinement, pages, refine, nbPages} = usePagination(rest)

    return (
        <OrderedList listStyleType="none" display="flex" flexShrink="0" margin="0">
            <ListItem>
                <Link
                    px="3"
                    py="3"
                    border="1px"
                    borderLeftRadius="2xl"
                    borderColor="gray.100"
                    _hover={{
                        backgroundColor: 'gray.50'
                    }}
                    onClick={(event) => {
                        event.preventDefault()
                        currentRefinement != 0 && refine(currentRefinement - 1)
                        onPageChange()
                    }}
                >
                    <ChevronLeftIcon />
                    Previous
                </Link>
            </ListItem>
            {pages.map((page) => (
                <ListItem key={page}>
                    <Link
                        px="5"
                        py="3"
                        borderTop="1px"
                        borderBottom="1px"
                        color={page == currentRefinement ? 'white' : 'gray.900'}
                        backgroundColor={page == currentRefinement ? 'black' : 'white'}
                        borderColor="gray.100"
                        _hover={{
                            backgroundColor: page == currentRefinement ? 'black' : 'gray.50'
                        }}
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            refine(page)
                            onPageChange()
                        }}
                    >
                        {page === currentRefinement ? <strong>{page + 1}</strong> : page + 1}
                    </Link>
                </ListItem>
            ))}
            <ListItem>
                <Link
                    px="3"
                    py="3"
                    border="1px"
                    borderRightRadius="2xl"
                    borderColor="gray.100"
                    _hover={{
                        backgroundColor: 'gray.50'
                    }}
                    href="#"
                    onClick={(event) => {
                        event.preventDefault()
                        nbPages - 1 != currentRefinement && refine(currentRefinement + 1)
                        onPageChange()
                    }}
                >
                    Next
                    <ChevronRightIcon />
                </Link>
            </ListItem>
        </OrderedList>
    )
}

AlgoliaPagination.propTypes = {
    onPageChange: PropTypes.func
}

export default AlgoliaPagination
