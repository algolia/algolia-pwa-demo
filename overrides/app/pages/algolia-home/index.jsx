import React, {Suspense} from 'react'

// Project Components
import Seo from '@salesforce/retail-react-app/app/components/seo'

// Constants
import {MAX_CACHE_AGE} from '../../constants'

import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import Loader from '../../components/algolia/homepage/loader'
const Header = React.lazy(() => import('../../components/algolia/homepage/header'))
const Sales = React.lazy(() => import('../../components/algolia/homepage/salesforce'))
const Performance = React.lazy(() => import('../../components/algolia/homepage/ai-performance'))
const Commerce = React.lazy(() => import('../../components/algolia/homepage/commerce-cloud'))
const Leading = React.lazy(() => import('../../components/algolia/homepage/leading'))
const Journey = React.lazy(() => import('../../components/algolia/homepage/journey'))
const Partner = React.lazy(() => import('../../components/algolia/homepage/partners'))
const Content = React.lazy(() => import('../../components/algolia/homepage/content'))
const Try = React.lazy(() => import('../../components/algolia/homepage/try'))
const Shop = React.lazy(() => import('../../components/algolia/homepage/ai-shop'))

import './style.css'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = () => {
    // useServerContext is a special hook introduced in v3 PWA Kit SDK.
    // It replaces the legacy `getProps` and provide a react hook interface for SSR.
    // it returns the request and response objects on the server side,
    // and these objects are undefined on the client side.
    const {res} = useServerContext()
    if (res) {
        res.set('Cache-Control', `s-maxage=${MAX_CACHE_AGE}`)
    }

    return (
        <>
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
            <Suspense fallback={<Loader />}>
                <Header />
                <Sales />
                <Performance />
                <Commerce />
                <Shop />
                <Leading />
                <Journey />
                <Partner />
                <Content />
                <Try />
            </Suspense>
        </>
    )
}

Home.getTemplateName = () => 'home'

export default Home
