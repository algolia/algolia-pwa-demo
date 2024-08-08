/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/*
 * Developer note! When updating this file, make sure to also update the
 * _app-config template files in pwa-kit-create-app.
 *
 * In the pwa-kit-create-app, the templates are found under:
 * - assets/bootstrap/js/overrides/app/components/_app-config
 * - assets/templates/@salesforce/retail-react-app/app/components/_app-config
 */
import React from 'react'
import PropTypes from 'prop-types'
import {ChakraProvider} from '@salesforce/retail-react-app/app/components/shared/ui'

// Removes focus for non-keyboard interactions for the whole application
import 'focus-visible/dist/focus-visible'

import theme from '@salesforce/retail-react-app/app/theme'
import {MultiSiteProvider} from '@salesforce/retail-react-app/app/contexts'
import {
    resolveSiteFromUrl,
    resolveLocaleFromUrl
} from '@salesforce/retail-react-app/app/utils/site-utils'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import {proxyBasePath} from '@salesforce/pwa-kit-runtime/utils/ssr-namespace-paths'
import {createUrlTemplate} from '@salesforce/retail-react-app/app/utils/url'
import createLogger from '@salesforce/pwa-kit-runtime/utils/logger-factory'

import {CommerceApiProvider} from '@salesforce/commerce-sdk-react'
import {withReactQuery} from '@salesforce/pwa-kit-react-sdk/ssr/universal/components/with-react-query'
import {useCorrelationId} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Helmet} from 'react-helmet'

/**
 * Use the AppConfig component to inject extra arguments into the getProps
 * methods for all Route Components in the app – typically you'd want to do this
 * to inject a connector instance that can be used in all Pages.
 *
 * You can also use the AppConfig to configure a state-management library such
 * as Redux, or Mobx, if you like.
 */
const AppConfig = ({children, locals = {}}) => {
    const {correlationId} = useCorrelationId()
    const headers = {
        'correlation-id': correlationId
    }

    const commerceApiConfig = locals.appConfig.commerceAPI

    const appOrigin = getAppOrigin()

    return (
        <>
            <Helmet>
                {/* Segment Script */}
                <script>
                    {`
                    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="eEj3ERCjH7KxK1jEMjQF7uzmtZGALFHn";;analytics.SNIPPET_VERSION="4.15.3";
                    analytics.load("eEj3ERCjH7KxK1jEMjQF7uzmtZGALFHn");
                    }}();
                    `}
                </script>

                {/* OneTrust Scripts */}
                <script
                    type="text/javascript"
                    src="https://cdn.cookielaw.org/consent/5e9f5149-bde8-4a13-b973-b7a9385e8ebb-test/OtAutoBlock.js"
                ></script>
                <script
                    src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
                    type="text/javascript"
                    charset="UTF-8" // eslint-disable-line
                    data-domain-script="5e9f5149-bde8-4a13-b973-b7a9385e8ebb-test"
                ></script>
                <script type="text/javascript">
                    {`
                    function OptanonWrapper() { }
                    `}
                </script>
            </Helmet>
            <CommerceApiProvider
                shortCode={commerceApiConfig.parameters.shortCode}
                clientId={commerceApiConfig.parameters.clientId}
                organizationId={commerceApiConfig.parameters.organizationId}
                siteId={locals.site?.id}
                locale={locals.locale?.id}
                currency={locals.locale?.preferredCurrency}
                redirectURI={`${appOrigin}/callback`}
                proxy={`${appOrigin}${commerceApiConfig.proxyPath}`}
                headers={headers}
                // Uncomment 'enablePWAKitPrivateClient' to use SLAS private client login flows.
                // Make sure to also enable useSLASPrivateClient in ssr.js when enabling this setting.
                enablePWAKitPrivateClient={true}
                OCAPISessionsURL={`${appOrigin}${proxyBasePath}/ocapi/s/${locals.site?.id}/dw/shop/v22_8/sessions`}
                logger={createLogger({packageName: 'commerce-sdk-react'})}
            >
                <MultiSiteProvider
                    site={locals.site}
                    locale={locals.locale}
                    buildUrl={locals.buildUrl}
                >
                    <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </MultiSiteProvider>
                <ReactQueryDevtools />
            </CommerceApiProvider>
        </>
    )
}

AppConfig.restore = (locals = {}) => {
    const path =
        typeof window === 'undefined'
            ? locals.originalUrl
            : `${window.location.pathname}${window.location.search}`
    const site = resolveSiteFromUrl(path)
    const locale = resolveLocaleFromUrl(path)

    const {app: appConfig} = getConfig()
    const apiConfig = {
        ...appConfig.commerceAPI,
        einsteinConfig: appConfig.einsteinAPI
    }

    apiConfig.parameters.siteId = site.id

    locals.buildUrl = createUrlTemplate(appConfig, site.alias || site.id, locale.id)
    locals.site = site
    locals.locale = locale
    locals.appConfig = appConfig
}

AppConfig.freeze = () => undefined

AppConfig.extraGetPropsArgs = (locals = {}) => {
    return {
        buildUrl: locals.buildUrl,
        site: locals.site,
        locale: locals.locale
    }
}

AppConfig.propTypes = {
    children: PropTypes.node,
    locals: PropTypes.object
}

const isServerSide = typeof window === 'undefined'

// Recommended settings for PWA-Kit usages.
// NOTE: they will be applied on both server and client side.
// retry is always disabled on server side regardless of the value from the options
const options = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                staleTime: 10 * 1000,
                ...(isServerSide ? {retryOnMount: false} : {})
            },
            mutations: {
                retry: false
            }
        }
    }
}

export default withReactQuery(AppConfig, options)
