// app/components/segment-wrapper/index.jsx
import React from 'react'
import {Helmet} from 'react-helmet'
import AppConfig from '@salesforce/retail-react-app/app/components/_app-config/index.jsx'

const SegmentAndOneTrustWrapper = (props) => {
    React.useEffect

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
            <AppConfig {...props} />
        </>
    )
}

SegmentAndOneTrustWrapper.restore = AppConfig.restore
SegmentAndOneTrustWrapper.freeze = AppConfig.freeze
SegmentAndOneTrustWrapper.extraGetPropsArgs = AppConfig.extraGetPropsArgs

export default SegmentAndOneTrustWrapper
