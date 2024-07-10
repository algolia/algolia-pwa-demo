import React from 'react'
import './style.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'

export default function Header() {
    const img = {
        src: getAssetUrl('static/img/homepagecloud.svg'),
        alt: 'Homepage Bulut'
    }

    return (
        <div className="header">
            <div className="container">
                <div className="left">
                    <h2>ALGOLIA + SALESFORCE COMMERCE CLOUD</h2>
                    <h1>Supercharge Salesforce Commerce Cloud with AI search</h1>
                    <p>Power growth at scale with lightning-fast and flexible search.</p>
                    <div className="button-container">
                        <a
                            href="https://www.algolia.com/demorequest/"
                            target="_blank"
                            className="demo"
                        >
                            Get a demo
                        </a>
                        <a
                            href="https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/getting-started/set-up-the-algolia-cartridge/?client=javascript"
                            target="_blank"
                            className="download"
                        >
                            Download the cartridge
                        </a>
                    </div>
                </div>
                <div className="right">
                    <img src={img.src} alt={img.alt} />
                </div>
            </div>
        </div>
    )
}
