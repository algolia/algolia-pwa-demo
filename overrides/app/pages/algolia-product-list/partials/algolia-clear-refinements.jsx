import React from 'react'
import {Box, Button, Link} from '@chakra-ui/react'
import {FormattedMessage} from 'react-intl'
import {useClearRefinements} from 'react-instantsearch'
import PropTypes from 'prop-types'

const AlgoliaClearRefinements = React.forwardRef((props, ref) => {
    const {variant, ...otherProps} = props
    const {canRefine, refine} = useClearRefinements(otherProps)

    function clearRefinements() {
        refine()
    }

    React.useImperativeHandle(ref, () => ({
        triggerClick: clearRefinements
    }))

    if (variant === 'button') {
        return (
            <Button width="full" variant="outline" onClick={clearRefinements}>
                <FormattedMessage
                    defaultMessage="Clear Filters"
                    id="product_list.modal.button.clear_filters"
                />
            </Button>
        )
    }

    return (
        <>
            {canRefine && (
                <Box>
                    <Link fontSize="14px" color="blue.600" onClick={clearRefinements}>
                        <FormattedMessage
                            defaultMessage="Clear Filters"
                            id="selected_refinements.action.clear_all"
                        />
                    </Link>
                </Box>
            )}
        </>
    )
})

AlgoliaClearRefinements.displayName = 'AlgoliaClearRefinements'

AlgoliaClearRefinements.propTypes = {
    variant: PropTypes.oneOf(['link', 'button'])
}

export default AlgoliaClearRefinements
