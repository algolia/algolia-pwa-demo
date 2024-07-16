/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {FormattedMessage, useIntl} from 'react-intl'
import {Helmet} from 'react-helmet'
import {useCategory} from '@salesforce/commerce-sdk-react'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'

// Components
import {
    Accordion,
    Box,
    Flex,
    SimpleGrid,
    Grid,
    Select,
    Text,
    FormControl,
    Stack,
    useDisclosure,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalCloseButton,
    ModalOverlay
} from '@salesforce/retail-react-app/app/components/shared/ui'

// Project Components
import {HideOnDesktop} from '@salesforce/retail-react-app/app/components/responsive'
import EmptySearchResults from './partials/empty-results'
import PageHeader from './partials/page-header'

// Icons
import {FilterIcon} from '@salesforce/retail-react-app/app/components/icons'

// Hooks
import {useSearchParams} from '@salesforce/retail-react-app/app/hooks'

// Others
import {HTTPNotFound, HTTPError} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

// Constants
import {MAX_CACHE_AGE} from '@salesforce/retail-react-app/app/constants'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'

// Algolia
import algoliasearch from 'algoliasearch/lite'
import {Configure, InstantSearch, Index, Pagination} from 'react-instantsearch'
import AlgoliaCurrentRefinements from './partials/algolia-current-refinements'
import AlgoliaHierarchicalRefinements from './partials/algolia-hierarchical-refinements'
import AlgoliaColorRefinements from './partials/algolia-color-refinements'
import AlgoliaNoResultsBoundary from './partials/algolia-no-results-boundary'
import AlgoliaCheckboxRefinements from './partials/algolia-checkbox-refinements'
import AlgoliaRangeRefinements from './partials/algolia-range-refinements'
import AlgoliaSortBy from './partials/algolia-sort-by'
import AlgoliaClearRefinements from './partials/algolia-clear-refinements'
import AlgoliaUiStateProvider from './partials/algolia-uistate-provider'
import SearchTabHeader from './partials/search-tab-header'
import {Tabs, TabPanels, TabPanel} from '@chakra-ui/react'
import AlgoliaHitsContent from './partials/algolia-hits-content'
import AlgoliaHitsProducts from './partials/algolia-hits-products'
import {useWishlistOperations} from '../../hooks/use-wishlist-operations'
import '../../components/algolia/style.css'

/*
 * This is a simple product listing page. It displays a paginated list
 * of product hit objects. Allowing for sorting and filtering based on the
 * allowable filters and sort refinements.
 */
const ProductList = (props) => {
    // Using destructuring to omit properties; we must rename `isLoading` because we use a different
    // `isLoading` later in this function.
    // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
    const {isLoading: _unusedIsLoading, staticContext, ...rest} = props
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {formatMessage} = useIntl()
    const params = useParams()
    const location = useLocation()
    const {res} = useServerContext()
    const [searchParams] = useSearchParams()
    const {currency: activeCurrency} = useCurrency()

    let {app: algoliaConfig} = useMemo(() => getConfig(), [])
    algoliaConfig = {
        ...algoliaConfig.algolia
    }

    const {addItemToWishlist, removeItemFromWishlist, isInWishlist} = useWishlistOperations()

    // Algolia Settings
    const allIndices = [algoliaConfig.indices.primary, ...algoliaConfig.indices.replicas]
    const productIndexName = algoliaConfig.indices.primary.value
    const contentIndexName = algoliaConfig.indices.contents

    const searchClient = useMemo(() => {
        return algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey)
    }, [])

    // Algolia Refinements - You can adjust these to match your Algolia index.
    const hierarchicalCategoryAttributes = [
        `__primary_category.0`,
        `__primary_category.1`,
        `__primary_category.2`
    ]

    const filterEls = (
        <>
            <Accordion allowMultiple>
                <AlgoliaHierarchicalRefinements
                    attributes={hierarchicalCategoryAttributes}
                    title="Category"
                />
                <AlgoliaColorRefinements attribute="color" title="Color" />
                <AlgoliaCheckboxRefinements attribute="size" title="Size" />
                <AlgoliaRangeRefinements attribute="price.USD" title="Price" />
                <AlgoliaCheckboxRefinements
                    attribute="brand"
                    title="Brand"
                    sortBy={['count:desc']}
                />
            </Accordion>
        </>
    )

    /**************** Page State ****************/
    const [contentHitsCount, setContentHitsCount] = useState(false)

    const urlParams = new URLSearchParams(location.search)
    let searchQuery = urlParams.get('q')
    const isSearch = !!searchQuery

    if (params.categoryId) {
        searchParams._refine.push(`cgid=${params.categoryId}`)
    }

    /**************** Query Actions ****************/
    const {isLoading} = useState(true)

    const {error, data: category} = useCategory(
        {
            parameters: {
                id: params.categoryId
            }
        },
        {
            enabled: !isSearch && !!params.categoryId
        }
    )

    /**************** Error Handling ****************/
    const errorStatus = error?.response?.status
    switch (errorStatus) {
        case undefined:
            // No Error.
            break
        case 404:
            throw new HTTPNotFound('Category Not Found.')
        default:
            throw new HTTPError(`HTTP Error ${errorStatus} occurred.`)
    }

    /**************** Response Handling ****************/
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    // Reset scroll position when `isRefetching` becomes `true`.
    const query = searchQuery ?? ''
    const filters = !isLoading && category?.id ? `categories.id:${category.id}` : ''

    return (
        <Box
            className="sf-product-list-page"
            data-testid="sf-product-list-page"
            layerStyle="page"
            paddingTop={{base: 6, lg: 8}}
            {...rest}
        >
            <Helmet>
                <title>{category?.pageTitle}</title>
                <meta name="description" content={category?.pageDescription} />
                <meta name="keywords" content={category?.pageKeywords} />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.0.0/themes/reset-min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.0.0/themes/satellite-min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic"
                />
            </Helmet>
            <InstantSearch
                searchClient={searchClient}
                indexName={productIndexName}
                routing={true}
                insights={true}
                future={{
                    preserveSharedStateOnUnmount: true,
                    persistHierarchicalRootCount: true
                }}
            >
                <Tabs defaultIndex={urlParams.get('tab') === 'articles' ? 1 : 0}>
                    {isSearch && (
                        <SearchTabHeader
                            isLoading={isLoading}
                            contentHitsCount={contentHitsCount}
                        />
                    )}
                    <TabPanels>
                        <TabPanel>
                            <Configure query={query} filters={filters} />
                            <AlgoliaNoResultsBoundary
                                fallback={
                                    <EmptySearchResults
                                        searchQuery={searchQuery}
                                        category={category}
                                    />
                                }
                            >
                                <>
                                    {/* Header */}
                                    <Stack
                                        display={{base: 'none', lg: 'flex'}}
                                        direction="row"
                                        justify="flex-start"
                                        align="flex-start"
                                        spacing={6}
                                        marginBottom={6}
                                    >
                                        <Flex align="left" width="290px">
                                            <PageHeader
                                                category={category}
                                                isLoading={isLoading}
                                                searchQuery={searchQuery}
                                            />
                                        </Flex>
                                        <Flex
                                            flex={1}
                                            paddingTop={'45px'}
                                            alignItems="center"
                                            gap="3"
                                        >
                                            <AlgoliaCurrentRefinements />
                                            <AlgoliaClearRefinements />
                                        </Flex>
                                        <Box paddingTop={'45px'}>
                                            <AlgoliaSortBy items={allIndices} />
                                        </Box>
                                    </Stack>

                                    <HideOnDesktop>
                                        <Stack spacing={6}>
                                            <PageHeader
                                                category={category}
                                                isLoading={isLoading}
                                                searchQuery={searchQuery}
                                            />
                                            <Stack
                                                display={{base: 'flex', md: 'none'}}
                                                direction="row"
                                                justify="flex-start"
                                                align="center"
                                                spacing={1}
                                                height={12}
                                                borderColor="gray.100"
                                            >
                                                <Flex align="center">
                                                    <Button
                                                        fontSize="sm"
                                                        colorScheme="black"
                                                        variant="outline"
                                                        marginRight={2}
                                                        display="inline-flex"
                                                        leftIcon={<FilterIcon boxSize={5} />}
                                                        onClick={onOpen}
                                                    >
                                                        <FormattedMessage
                                                            defaultMessage="Filter"
                                                            id="product_list.button.filter"
                                                        />
                                                    </Button>
                                                </Flex>
                                                <Flex align="center">
                                                    <AlgoliaSortBy items={allIndices} />
                                                </Flex>
                                            </Stack>
                                        </Stack>
                                        <Flex
                                            flex={1}
                                            paddingTop={4}
                                            marginBottom={4}
                                            alignItems="center"
                                            gap="3"
                                        ></Flex>
                                    </HideOnDesktop>

                                    {/* Body  */}
                                    <Grid
                                        templateColumns={{base: '1fr', md: '290px 1fr'}}
                                        columnGap={6}
                                    >
                                        <Stack
                                            display={{base: 'none', md: 'flex'}}
                                            spacing="6"
                                            direction="column"
                                        >
                                            {filterEls}
                                        </Stack>
                                        <Box>
                                            <SimpleGrid
                                                columns={[2, 2, 3, 4]}
                                                spacingX={4}
                                                spacingY={{base: 12, lg: 8}}
                                            >
                                                <AlgoliaHitsProducts
                                                    isLoading={isLoading}
                                                    searchQuery={searchQuery}
                                                    category={category}
                                                    addItemToWishlist={addItemToWishlist}
                                                    removeItemFromWishlist={removeItemFromWishlist}
                                                    isInWishlist={isInWishlist}
                                                    activeCurrency={activeCurrency}
                                                />
                                            </SimpleGrid>
                                            {/* Footer */}
                                            <Flex
                                                justifyContent={['center', 'center', 'flex-center']}
                                                paddingTop={16}
                                            >
                                                <Pagination
                                                    showNext={false}
                                                    showPrevious={false}
                                                    classNames={{
                                                        root: 'custom-pagination-root',
                                                        item: 'custom-pagination-item',
                                                        link: 'custom-pagination-link',
                                                        selectedItem:
                                                            'custom-pagination-item-selected'
                                                    }}
                                                />
                                            </Flex>
                                        </Box>
                                    </Grid>
                                </>
                            </AlgoliaNoResultsBoundary>
                            {/* Filter */}
                            <Modal
                                isOpen={isOpen}
                                onClose={onClose}
                                size="full"
                                motionPreset="slideInBottom"
                                scrollBehavior="inside"
                            >
                                <AlgoliaUiStateProvider
                                    searchClient={searchClient}
                                    indexName={productIndexName}
                                    filters={filters}
                                    query={query}
                                >
                                    <ModalOverlay />
                                    <ModalContent top={0} marginTop={0}>
                                        <ModalHeader>
                                            <Text fontWeight="bold" fontSize="2xl">
                                                <FormattedMessage
                                                    defaultMessage="Filter"
                                                    id="product_list.modal.title.filter"
                                                />
                                            </Text>
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody py={4}>
                                            <Stack spacing="6" direction="column">
                                                {filterEls}
                                            </Stack>
                                        </ModalBody>

                                        <ModalFooter
                                            // justify="space-between"
                                            display="block"
                                            width="full"
                                            borderTop="1px solid"
                                            borderColor="gray.100"
                                            paddingBottom={10}
                                        >
                                            <Stack>
                                                <Button width="full" onClick={onClose}>
                                                    {formatMessage(
                                                        {
                                                            id: 'product_list.modal.button.view_items',
                                                            defaultMessage: 'View items'
                                                        },
                                                        {
                                                            prroductCount: ''
                                                        }
                                                    )}
                                                </Button>
                                                <AlgoliaClearRefinements variant="button" />
                                            </Stack>
                                        </ModalFooter>
                                    </ModalContent>
                                </AlgoliaUiStateProvider>
                            </Modal>
                        </TabPanel>
                        <TabPanel>
                            <Index indexName={contentIndexName}>
                                <AlgoliaHitsContent
                                    isLoading={isLoading}
                                    setContentHitsCount={setContentHitsCount}
                                />
                            </Index>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </InstantSearch>
        </Box>
    )
}

ProductList.getTemplateName = () => 'product-list'

ProductList.propTypes = {
    onAddToWishlistClick: PropTypes.func,
    onRemoveWishlistClick: PropTypes.func,
    category: PropTypes.object
}

export default ProductList

const Sort = ({sortUrls, productSearchResult, basePath, ...otherProps}) => {
    const intl = useIntl()
    const history = useHistory()

    return (
        <FormControl data-testid="sf-product-list-sort" id="page_sort" width="auto" {...otherProps}>
            <Select
                value={basePath.replace(/(offset)=(\d+)/i, '$1=0')}
                onChange={({target}) => {
                    history.push(target.value)
                }}
                height={11}
                width="240px"
            >
                {sortUrls.map((href, index) => (
                    <option key={href} value={href}>
                        {intl.formatMessage(
                            {
                                id: 'product_list.select.sort_by',
                                defaultMessage: 'Sort By: {sortOption}'
                            },
                            {
                                sortOption: productSearchResult?.sortingOptions[index]?.label
                            }
                        )}
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}

Sort.propTypes = {
    sortUrls: PropTypes.array,
    productSearchResult: PropTypes.object,
    basePath: PropTypes.string
}
