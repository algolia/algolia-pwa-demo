/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useMemo} from 'react'

export function useHasRefinements(searchResults, attributes) {
    const facets = useMemo(() => {
        const disjunctiveFacets = searchResults?.disjunctiveFacets || []
        const hierarchicalFacets = searchResults?.hierarchicalFacets || []
        return [...disjunctiveFacets, ...hierarchicalFacets]
    }, [searchResults])

    const hasRefinements = useMemo(() => {
        let found = !attributes.length

        facets.forEach((facet) => {
            attributes?.forEach((attribute) => {
                if (facet.name === attribute && facet.data) {
                    found = true
                }
            })
        })

        return found
    }, [facets, attributes])

    return hasRefinements
}
