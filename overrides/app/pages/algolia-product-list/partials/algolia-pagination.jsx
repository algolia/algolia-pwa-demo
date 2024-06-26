import React from 'react'
import PropTypes from 'prop-types'
import {Link, ListItem, OrderedList, Select, Box, Flex} from '@chakra-ui/react'
import {usePagination} from 'react-instantsearch'
import {ChevronLeftIcon, ChevronRightIcon} from '@salesforce/retail-react-app/app/components/icons'

const AlgoliaPagination = (props) => {
    const {onPageChange, ...rest} = props
    const {currentRefinement, pages, refine, nbPages} = usePagination(rest)

    return (
        <>
            <Flex align="center" className="wt-pagination-mobile">
                <Box>Page</Box>
                <Select
                    value={currentRefinement}
                    onChange={(e) => {
                        const selectedPage = parseInt(e.target.value)
                        refine(selectedPage)
                        onPageChange()
                    }}
                    ml={2}
                >
                    {pages.map((page) => (
                        <option key={page} value={page}>
                            {page + 1}
                        </option>
                    ))}
                </Select>
                <Box width={100} ml={2}>
                    of {pages.length}
                </Box>
            </Flex>

            <Flex align="center" justifyContent="center" width="100%" className="wt-pagination-web">
                <OrderedList
                    listStyleType="none"
                    display="flex"
                    flexShrink="0"
                    margin="0"
                    className="aa-pagination"
                >
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
                                currentRefinement !== 0 && refine(currentRefinement - 1)
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
                                color={page === currentRefinement ? 'white' : 'gray.900'}
                                backgroundColor={page === currentRefinement ? 'black' : 'white'}
                                borderColor="gray.100"
                                _hover={{
                                    backgroundColor:
                                        page === currentRefinement ? 'black' : 'gray.50'
                                }}
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault()
                                    refine(page)
                                    onPageChange()
                                }}
                            >
                                {page === currentRefinement ? (
                                    <strong>{page + 1}</strong>
                                ) : (
                                    page + 1
                                )}
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
                                nbPages - 1 !== currentRefinement && refine(currentRefinement + 1)
                                onPageChange()
                            }}
                        >
                            Next
                            <ChevronRightIcon />
                        </Link>
                    </ListItem>
                </OrderedList>
            </Flex>
        </>
    )
}

AlgoliaPagination.propTypes = {
    onPageChange: PropTypes.func
}

export default AlgoliaPagination
