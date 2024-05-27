/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
// Components
import {Box, Heading, Flex, Text, Fade} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useIntl} from 'react-intl'

// Project Components
import Breadcrumb from '@salesforce/retail-react-app/app/components/breadcrumb'

// Algolia
import {useHits, useInstantSearch} from 'react-instantsearch-hooks-web'

const PageHeader = ({category, productSearchResult, isLoading, searchQuery, ...otherProps}) => {
    const intl = useIntl()
    const {results} = useHits()
    const {status} = useInstantSearch()
    const isReady = !isLoading && ['stalled', 'idle'].includes(status)


    return (
        <Box {...otherProps} data-testid="sf-product-list-breadcrumb">
            {/* Breadcrumb */}
            {category && <Breadcrumb categories={category.parentCategoryTree} />}
            {searchQuery && <Text>Search Results for</Text>}
            {/* Category Title */}
            <Flex>
                <Heading as="h2" size="lg" marginRight={2}>
                    {`${category?.name || searchQuery || ''}`}
                </Heading>
                <Heading as="h2" size="lg" marginRight={2}>
                    {isReady && <Fade in={true}>({intl.formatNumber(results.nbHits)})</Fade>}
                </Heading>
            </Flex>
        </Box>
    )
}

PageHeader.propTypes = {
    category: PropTypes.object,
    productSearchResult: PropTypes.object,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string
}

export default PageHeader
