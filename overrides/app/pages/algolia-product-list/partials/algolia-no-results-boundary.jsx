import React from 'react'
import {useInstantSearch} from 'react-instantsearch-core'
import PropTypes from 'prop-types'

const AlgoliaNoResultsBoundary = ({children, fallback}) => {
    const {results} = useInstantSearch()

    // The `__isArtificial` flag makes sure not to display the No Results message
    // when no hits have been returned yet.
    if (!results.__isArtificial && results.nbHits === 0) {
        return (
            <>
                {fallback}
                <div hidden>{children}</div>
            </>
        )
    }

    return children
}

AlgoliaNoResultsBoundary.propTypes = {
    children: PropTypes.node,
    fallback: PropTypes.node
}

export default AlgoliaNoResultsBoundary
