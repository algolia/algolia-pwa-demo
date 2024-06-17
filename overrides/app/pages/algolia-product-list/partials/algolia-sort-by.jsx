import React from 'react'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import {SortBy} from 'react-instantsearch'
import PropTypes from 'prop-types'

const AlgoliaSortBy = (props) => {
    const {items} = props
    const styles = useMultiStyleConfig('AlgoliaSortBy')

    return (
        <Box sx={styles}>
            <SortBy
                items={items}
                classNames={{
                    select: 'select'
                }}
            />
        </Box>
    )
}

AlgoliaSortBy.propTypes = {
    items: PropTypes.array
}

export default AlgoliaSortBy
