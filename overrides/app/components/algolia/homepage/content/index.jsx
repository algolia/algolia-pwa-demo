import React from 'react'
import './style.css'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
export default function Content() {
    const contents = [
        {
            src: getAssetUrl('static/img/shoecarnival.jpg'),
            alt: 'Shoe Carnival',
            text: 'Shoe Carnival laces up for headless commerce with best-of-breed search and content solutions from Algolia and Amplience',
            url: 'https://www.algolia.com/customers/shoe-carnival/'
        },
        {
            src: getAssetUrl('static/img/salesforcegraphic.jpg'),
            alt: 'Take Salesforce Commerce Cloud to the next level with Algolia search',
            text: 'Take Salesforce Commerce Cloud to the next level with Algolia search',
            url: 'https://resources.algolia.com/ecommerce/infographic-salesforce-commerce-cloud'
        },
        {
            src: getAssetUrl('static/img/resourcesubisoft.jpg'),
            alt: 'Ubisoft',
            text: 'Ubisoft: rich Salesforce Commerce Cloud search in every country, on every device',
            url: 'https://www.algolia.com/customers/ubisoft/'
        }
    ]
    return (
        <div className="content">
            <div className="content-container">
                <h2>Recommended content</h2>
                <div className="contents-wrapper">
                    {contents.map((content, index) => (
                        <div key={index} className="content-box">
                            <div className="image-box">
                                <img src={content.src} alt={content.alt} />
                            </div>
                            <p className="text">{content.text}</p>
                            <a target="_blank" href={content.url} className="contact">
                                <p>Read the story</p>
                                <div className="arrow-right-box">
                                    <ChevronRightIcon className="arrow-right" />
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
