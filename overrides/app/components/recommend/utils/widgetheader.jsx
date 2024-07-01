import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Heading} from '@salesforce/retail-react-app/app/components/shared/ui'

const WidgetHeader = ({recommendations, title}) => {
    if (recommendations?.recommendations?.length > 0) {
        return (
            <Flex mb={4}>
                <Heading as="h3" size="sm" noOfLines={1}>
                    {title}
                </Heading>
            </Flex>
        )
    }
    return null
}

WidgetHeader.propTypes = {
    recommendations: PropTypes.object,
    title: PropTypes.string
}

export default WidgetHeader
