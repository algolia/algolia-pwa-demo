import {useLayoutEffect} from 'react'
import {createInsightsMiddleware} from 'instantsearch.js/es/middlewares'
import {useInstantSearch} from 'react-instantsearch'

const AlgoliaInsights = () => {
    const {addMiddlewares} = useInstantSearch()

    useLayoutEffect(() => {
        const middleware = createInsightsMiddleware({
            insightsClient: window.aa
        })

        return addMiddlewares(middleware)
    }, [addMiddlewares])

    return null
}

AlgoliaInsights.propTypes = {}

export default AlgoliaInsights
