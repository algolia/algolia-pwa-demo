import React from 'react'
import './style.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'

export default function Performance() {
    const performances = [
        {
            src: getAssetUrl('static/img/speed.jpg'),
            alt: 'Embrace unparalleled speed',
            title: 'Embrace unparalleled speed',
            text: 'Algolia ensures lightning-fast search query responses in under 20 milliseconds. Our capability to fully reindex 100,000 products in under 10 minutes enables timely product information updates at scale.'
        },
        {
            src: getAssetUrl('static/img/salesforce.jpg'),
            alt: 'Boost customer experience with federated search',
            title: 'Boost customer experience with federated search',
            text: 'Algolia’s API-first approach enables unified experiences across multiple sources of content from Salesforce Clouds and external systems.'
        },
        {
            src: getAssetUrl('static/img/features.jpg'),
            alt: 'Deliver unmatched relevance and personalization to your customers',
            title: 'Deliver unmatched relevance and personalization to your customers',
            text: 'Use <a href="https://www.algolia.com/products/search-and-discovery/personalization/">AI Personalization</a> to offer relevant and tailored results across all touchpoints, increasing the chance of conversion.'
        },
        {
            src: getAssetUrl('static/img/searchandising.jpg'),
            alt: 'Improve productivity while being in control',
            title: 'Improve productivity while being in control',
            text: 'Through a blend of AI, data-driven insights and manual controls, Algolia’s <a href="https://www.algolia.com/industries-and-solutions/ecommerce/digital-merchandising/">Merchandising Studio</a> empowers retailers to create optimized and high-converting shopping experiences, while saving time and effort for merchandisers.'
        }
    ]

    return (
        <div className="performance">
            <div className="performance-container">
                <h2>AI-driven search for large catalogs without compromising on performance</h2>
                <p className="performance-text">
                    Integrate industry-leading AI search into Salesforce with multiple frontend
                    options.
                </p>
                <div className="info-container">
                    {performances.map((performance, index) => (
                        <div key={index} className="info-box">
                            <div className="info-box-left">
                                <h3 className="info-title">{performance.title}</h3>
                                <p
                                    className="info-text"
                                    dangerouslySetInnerHTML={{__html: performance.text}}
                                ></p>
                            </div>
                            <div className="info-box-right">
                                <img src={performance.src} alt={performance.alt} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
