import React from 'react'
import {
    VStack,
    Checkbox,
    Center,
    useMultiStyleConfig,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'
import {useRefinementList} from 'react-instantsearch'
import AlgoliaRefinementsContainer from './algolia-refinements-container'
import PropTypes from 'prop-types'

const AlgoliaCheckboxRefinements = (props) => {
    const styles = useMultiStyleConfig('SwatchGroup', {
        variant: 'square',
        disabled: false
    })

    const {items, refine} = useRefinementList(props)

    const sortedItems = props.sortBy ? items : items.sort((a, b) =>
        a.label.localeCompare(b.label, undefined, {numeric: true})
    )

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
                            <VStack spacing={1} mt={1} align="start">
                                {sortedItems.map((item, idx) => {
                                    return (
                                        <Checkbox
                                            key={idx}
                                            isChecked={item.isRefined}
                                            onChange={() => refine(item.value)}
                                            aria-checked={item.isRefined}
                                            variant="outline"
                                            fontSize="sm"
                                            p="1"
                                            _hover={{
                                                borderColor: 'gray.200'
                                            }}
                                        >
                                            <Center isTruncated {...styles.swatchButton}>
                                                {item.label} {item.count > 0 && props.sortBy ? `(${item.count})` : ''}
                                            </Center>
                                        </Checkbox>
                                    )
                                })}
                            </VStack>
                        </AlgoliaRefinementsContainer>
                    </AccordionPanel>
                </AccordionItem>
            )}
        </>
    )
}

AlgoliaCheckboxRefinements.propTypes = {
    attribute: PropTypes.string,
    title: PropTypes.string
}

export default AlgoliaCheckboxRefinements
