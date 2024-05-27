/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import {SortBy} from 'react-instantsearch-hooks-web'
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
