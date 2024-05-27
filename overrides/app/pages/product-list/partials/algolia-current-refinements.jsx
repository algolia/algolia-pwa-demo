/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import {CurrentRefinements} from 'react-instantsearch-hooks-web'
import PropTypes from 'prop-types'

const AlgoliaCurrentRefinements = (props) => {
    const {includedAttributes, transformItems} = props
    const styles = useMultiStyleConfig('AlgoliaCurrentRefinements')

    return (
        <Box sx={styles}>
            <CurrentRefinements
                includedAttributes={includedAttributes}
                transformItems={transformItems}
                classNames={{
                    label: 'label',
                    item: 'item',
                    category: 'category',
                    delete: 'delete'
                }}
            />
        </Box>
    )
}

AlgoliaCurrentRefinements.propTypes = {
    includedAttributes: PropTypes.arrayOf(PropTypes.string),
    transformItems: PropTypes.func
}

export default AlgoliaCurrentRefinements
