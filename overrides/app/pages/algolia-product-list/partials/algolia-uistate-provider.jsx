import React from 'react'
import {InstantSearch, useInstantSearch, Configure} from 'react-instantsearch'
import PropTypes from 'prop-types'

const AlgoliaUiStateProvider = ({
    indexName,
    children,
    searchClient,
    syncWithRootUiState = true,
    inituiState,
    filters,
    query
}) => {
    const {setUiState: setRootUiState} = useInstantSearch()

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
            initialUiState={inituiState}
            routing={true}
            future={{
                preserveSharedStateOnUnmount: true,
                persistHierarchicalRootCount: true
            }}
        >
            <Configure query={query} filters={filters} />
            {children}
        </InstantSearch>
    )
}

AlgoliaUiStateProvider.propTypes = {
    children: PropTypes.node,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
    syncWithRootUiState: PropTypes.bool,
    inituiState: PropTypes.object,
    filters: PropTypes.string,
    query: PropTypes.string
}

export default AlgoliaUiStateProvider
