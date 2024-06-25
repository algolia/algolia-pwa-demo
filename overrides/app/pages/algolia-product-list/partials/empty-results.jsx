/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {Fragment, useState} from 'react'
import {
    Button,
    Text,
    Flex,
    Stack,
    Link
} from '@salesforce/retail-react-app/app/components/shared/ui'
import PropTypes from 'prop-types'
import {Link as RouteLink} from 'react-router-dom'
import {defineMessage, FormattedMessage, useIntl} from 'react-intl'
import {SearchIcon} from '@salesforce/retail-react-app/app/components/icons'
import TrendingItems from '../../../components/recommend/trendingItems'

const contactUsMessage = defineMessage({
    id: 'empty_search_results.link.contact_us',
    defaultMessage: 'Contact Us'
})

const EmptySearchResults = ({searchQuery, category}) => {
    const intl = useIntl()
    const [selectedColors, setSelectedColors] = useState({})
    return (
        <Flex
            data-testid="sf-product-empty-list-page"
            direction="column"
            alignItems="center"
            textAlign="center"
            paddingTop={28}
            paddingBottom={28}
        >
            <SearchIcon boxSize={[6, 12, 12, 12]} marginBottom={5} />
            {!searchQuery ? (
                <Fragment>
                    {' '}
                    <Text fontSize={['l', 'l', 'xl', '2xl']} fontWeight="700" marginBottom={2}>
                        {intl.formatMessage(
                            {
                                id: 'empty_search_results.info.cant_find_anything_for_category',
                                defaultMessage:
                                    'We couldn’t find anything for {category}. Try searching for a product or {link}.'
                            },
                            {
                                category: category?.name,
                                link: (
                                    <Link as={RouteLink} to={'/'}>
                                        {intl.formatMessage(contactUsMessage)}
                                    </Link>
                                )
                            }
                        )}
                    </Text>
                    <Text fontSize={['md', 'md', 'md', 'md']} fontWeight="400">
                        <div className="aa-NoResultsAdvices aa-mt-5">
                            <ul className="aa-NoResultsAdvicesList">
                                <li>Double-check your spelling</li>
                                <li>Use fewer keywords</li>
                                <li>Search for a less specific item</li>
                                <li>Check out popular categories for inspiration</li>
                            </ul>
                        </div>
                    </Text>
                </Fragment>
            ) : (
                <Fragment>
                    <Text fontSize={['lg', 'lg', 'xl', '3xl']} fontWeight="700" marginBottom={2}>
                        {intl.formatMessage(
                            {
                                id: 'empty_search_results.info.cant_find_anything_for_query',
                                defaultMessage: 'We couldn’t find anything for "{searchQuery}".'
                            },
                            {
                                searchQuery: searchQuery
                            }
                        )}
                    </Text>
                    <Text fontSize={['md', 'md', 'md', 'md']} fontWeight="400">
                        <div className="aa-NoResultsAdvices aa-mt-5">
                            <ul className="aa-NoResultsAdvicesList">
                                <li>Double-check your spelling</li>
                                <li>Use fewer keywords</li>
                                <li>Search for a less specific item</li>
                                <li>Check out popular categories for inspiration</li>
                            </ul>
                        </div>
                    </Text>
                    <Stack spacing={16} marginTop={32}>
                        <TrendingItems
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                        />
                    </Stack>
                </Fragment>
            )}
        </Flex>
    )
}

EmptySearchResults.propTypes = {
    searchQuery: PropTypes.string,
    category: PropTypes.object
}

export default EmptySearchResults
