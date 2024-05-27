/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {InstantSearch, useInstantSearch} from 'react-instantsearch-hooks-web'
import PropTypes from 'prop-types'

const AlgoliaUiStateProvider = ({
    indexName,
    children,
    searchClient,
    syncWithRootUiState = true
}) => {
    const {uiState: rootUiState, setUiState: setRootUiState} = useInstantSearch()

    const handleStateChange = ({uiState, setUiState}) => {
        if (syncWithRootUiState) {
            setUiState(uiState)
            setRootUiState(uiState)
        }
    }

    return (
        <InstantSearch
            indexName={indexName}
            searchClient={searchClient}
            onStateChange={handleStateChange}
            initialUiState={rootUiState}
        >
            {children}
        </InstantSearch>
    )
}

AlgoliaUiStateProvider.propTypes = {
    children: PropTypes.node,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
    syncWithRootUiState: PropTypes.bool
}

export default AlgoliaUiStateProvider
