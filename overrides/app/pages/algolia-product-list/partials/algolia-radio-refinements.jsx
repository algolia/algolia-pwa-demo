import React from 'react'
import {Box, Text, Radio, RadioGroup, Stack} from '@chakra-ui/react'
import {useNumericMenu} from 'react-instantsearch'
import PropTypes from 'prop-types'

const AlgoliaRadioRefinements = (props) => {
    const {items, refine} = useNumericMenu(props)

    return (
        <Box>
            <RadioGroup>
                <Stack spacing={1}>
                    {items.map((item) => {
                        return (
                            <Box key={item.value}>
                                <Radio
                                    display="flex"
                                    alignItems="center"
                                    height={{base: '44px', lg: '24px'}}
                                    value={item.value}
                                    checked={item.isRefined}
                                    onChange={() => refine(item.value)}
                                    fontSize="sm"
                                >
                                    <Text marginLeft={-1} fontSize="sm">
                                        {item.label}
                                    </Text>
                                </Radio>
                            </Box>
                        )
                    })}
                </Stack>
            </RadioGroup>
        </Box>
    )
}

AlgoliaRadioRefinements.propTypes = {
    attribute: PropTypes.string,
    items: PropTypes.array
}

export default AlgoliaRadioRefinements
