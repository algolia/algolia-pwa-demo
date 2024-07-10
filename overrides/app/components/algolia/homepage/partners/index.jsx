import React from 'react'
import './style.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'

export default function Partner() {
    const images = [
        {
            src: getAssetUrl('static/img/capgemini.svg'),
            alt: 'capgemini'
        },
        {
            src: getAssetUrl('static/img/sapient.svg'),
            alt: 'publicis sapient'
        },
        {
            src: getAssetUrl('static/img/zaelab.svg'),
            alt: 'zaelab'
        },
        {
            src: getAssetUrl('static/img/labs.webp'),
            alt: '64labs'
        },
        {
            src: getAssetUrl('static/img/epam.webp'),
            alt: 'epam'
        }
    ]

    return (
        <div className="partner">
            <h2>Work with our Salesforce expert partners</h2>
            <div className="images">
                {images.map((image, index) => (
                    <div key={index} className="image-box">
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
        </div>
    )
}
