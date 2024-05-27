/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {useInstantSearch} from 'react-instantsearch-hooks'
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
