/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useLayoutEffect} from 'react'
import {createInsightsMiddleware} from 'instantsearch.js/es/middlewares'
import {useInstantSearch} from 'react-instantsearch-hooks-web'

const AlgoliaInsights = () => {
    const {use} = useInstantSearch()

    useLayoutEffect(() => {
        const middleware = createInsightsMiddleware({
            insightsClient: window.aa
        })

        return use(middleware)
    }, [use])

    return null
}

AlgoliaInsights.propTypes = {}

export default AlgoliaInsights
