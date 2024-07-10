import React from 'react'
import './style.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

export default function Leading() {
    const images = [
        {
            src: getAssetUrl('static/img/dior.svg'),
            alt: 'dior'
        },
        {
            src: getAssetUrl('static/img/lacoste.svg'),
            alt: 'lacoste'
        },
        {
            src: getAssetUrl('static/img/ubisoft.svg'),
            alt: 'ubisoft'
        },
        {
            src: getAssetUrl('static/img/shoe-carnival.svg'),
            alt: 'shoe carnival'
        }
    ]

    const brands = [
        {
            src: getAssetUrl('static/img/lacoste.svg'),
            alt: 'lacoste',
            text: '“The combination of Algolia and Salesforce Commerce Cloud is a critical part of delivering this digital experience across Lacoste platforms globally and has helped double our global sales.”',
            name: 'Jérémie Szpiro',
            job: 'Global Digital Director @ Lacoste',
            href: 'https://www.algolia.com/customers/lacoste/'
        },
        {
            src: getAssetUrl('static/img/ubisoft.svg'),
            alt: 'ubisoft',
            text: '“We’ve had great results using Algolia, which has been really easy to integrate with Salesforce Commerce Cloud and manage configurations across different countries, and plan on extending its usage from 5 to all 17 online stores in 2020.”',
            name: 'David Leveau',
            job: 'Ecommerce Project Manager @ Ubisoft',
            href: 'https://www.algolia.com/customers/ubisoft/'
        },
        {
            src: getAssetUrl('static/img/shoe-carnival.svg'),
            alt: 'shoe carnival',
            text: '“In today’s competitive climate, it’s more important than ever for retailers to have the tools needed to meet customer expectations. What our customers want today might be different tomorrow, and that’s the level of speed that Algolia provides. Algolia’s efficiency has led to increased conversion rates, higher revenue, and better overall experience.”',
            name: 'Courtney Grisham',
            job: 'Director of Ecommerce @ Shoe Carnival',
            href: 'https://www.algolia.com/customers/shoe-carnival/'
        }
    ]

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true
    })

    return (
        <div className="leading">
            <h2>Leading brands rely on Algolia</h2>
            <div className="images">
                {images.map((image, index) => (
                    <div key={index} className="image-box">
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            <div className="mobile-arrow">
                <div
                    className="left-arrow-box"
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                >
                    <ChevronLeftIcon />
                </div>
                <div
                    className="right-arrow-box"
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                >
                    <ChevronRightIcon />
                </div>
            </div>
            <div className="brands">
                <div
                    className="left-arrow-box"
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                >
                    <ChevronLeftIcon />
                </div>
                <div ref={sliderRef} className="keen-slider">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className={`keen-slider__slide number-slide${index + 1} slider-box`}
                        >
                            <div className="brand-image">
                                <img src={brand.src} alt={brand.alt} />
                            </div>
                            <p className="brand-text">{brand.text}</p>
                            <div className="info-box">
                                <p className="brand-name">{brand.name}</p>
                                <p className="brand-job">{brand.job}</p>
                            </div>
                            <a target="_blank" href={brand.href}>
                                Read their story
                            </a>
                        </div>
                    ))}
                </div>
                <div
                    className="right-arrow-box"
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                >
                    <ChevronRightIcon />
                </div>
            </div>
        </div>
    )
}
