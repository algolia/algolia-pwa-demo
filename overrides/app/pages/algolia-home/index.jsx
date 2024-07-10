import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useLocation} from 'react-router-dom'


// Project Components
import Seo from '@salesforce/retail-react-app/app/components/seo'

// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
} from '../../constants'

import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {useProductSearch} from '@salesforce/commerce-sdk-react'
import Header from '../../components/algolia/homepage/header'
import Sales from '../../components/algolia/homepage/salesforce'
import Performance from '../../components/algolia/homepage/ai-performance'
import Commerce from '../../components/algolia/homepage/commerce-cloud'
import Leading from '../../components/algolia/homepage/leading'
import Journey from '../../components/algolia/homepage/journey'
import Partner from '../../components/algolia/homepage/partners'
import Content from '../../components/algolia/homepage/content'
import Try from '../../components/algolia/homepage/try'
import Shop from '../../components/algolia/homepage/ai-shop'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = () => {
    const {pathname} = useLocation()

    // useServerContext is a special hook introduced in v3 PWA Kit SDK.
    // It replaces the legacy `getProps` and provide a react hook interface for SSR.
    // it returns the request and response objects on the server side,
    // and these objects are undefined on the client side.
    const {res} = useServerContext()
    if (res) {
        res.set('Cache-Control', `s-maxage=${MAX_CACHE_AGE}`)
    }

    const {data: productSearchResult, isLoading} = useProductSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    return (
        <>
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
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
        </>
    )
}

Home.getTemplateName = () => 'home'

export default Home