import React from 'react'
import {InstantSearch, useInstantSearch} from 'react-instantsearch'
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
