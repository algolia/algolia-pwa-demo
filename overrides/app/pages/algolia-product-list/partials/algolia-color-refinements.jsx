import React, {useState} from 'react'
import {
    Box,
    SimpleGrid,
    HStack,
    Text,
    Button,
    Center,
    useMultiStyleConfig,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'
import {cssColorGroups} from '../../../constants'
import {capitalize} from '@salesforce/retail-react-app/app/utils/utils'
import {useRefinementList} from 'react-instantsearch'
import AlgoliaRefinementsContainer from './algolia-refinements-container'

const AlgoliaColorRefinements = (props) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('SwatchGroup', {
        variant: 'circle',
        disabled: false
    })

    const {items, refine} = useRefinementList(props)
    const [visibleItemsCount, setVisibleItemsCount] = useState(6)

    const handleSeeMore = () => {
        setVisibleItemsCount((prevCount) => prevCount + 6)
    }

    return (
        <>
            {items.length > 0 && (
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {props.title}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <AlgoliaRefinementsContainer attributes={[props.attribute]}>
                            <SimpleGrid columns={1} spacing={2} mt={1}>
                                {items.slice(0, visibleItemsCount).map((item, idx) => {
                                    const lcLabel = item.label
                                        .toLowerCase()
                                        .replace(/\s/g, '')
                                        .replace(/&/g, 'and')
                                    return (
                                        <Box key={idx}>
                                            <HStack
                                                onClick={() => refine(item.label)}
                                                spacing={1}
                                                cursor="pointer"
                                            >
                                                <Button
                                                    {...styles.swatch}
                                                    color={item.isRefined ? 'black' : 'gray.200'}
                                                    aria-checked={item.isRefined}
                                                    variant="outline"
                                                    marginRight="6px"
                                                    marginBottom="4px"
                                                    width="25px"
                                                    height="25px"
                                                    borderRadius="0"
                                                    overflow="hidden"
                                                    minWidth="auto"
                                                    border={'1px solid #e9e9e9'}
                                                    padding="0"
                                                >
                                                    <Center width="100%" height="100%">
                                                        <Box
                                                            marginRight={0}
                                                            height="100%"
                                                            width="100%"
                                                            backgroundRepeat="no-repeat"
                                                            backgroundSize="cover"
                                                            background={cssColorGroups[lcLabel]}
                                                        />
                                                    </Center>
                                                </Button>
                                                <Text
                                                    display="flex"
                                                    alignItems="center"
                                                    fontSize="13px"
                                                    isTruncated
                                                    marginBottom="1px"
                                                    fontWeight={item.isRefined ? 'bold' : 'normal'}
                                                >{`${capitalize(item.label)} (${intl.formatNumber(
                                                    item.count
                                                )})`}</Text>
                                            </HStack>
                                        </Box>
                                    )
                                })}
                            </SimpleGrid>
                            {visibleItemsCount < items.length && (
                                <Box
                                    color="#0070ff"
                                    fontWeight="500"
                                    fontSize="14px"
                                    cursor="pointer"
                                    onClick={handleSeeMore}
                                    mt={2}
                                >
                                    See More
                                </Box>
                            )}
                        </AlgoliaRefinementsContainer>
                    </AccordionPanel>
                </AccordionItem>
            )}
        </>
    )
}

AlgoliaColorRefinements.propTypes = {
    attribute: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaColorRefinements
