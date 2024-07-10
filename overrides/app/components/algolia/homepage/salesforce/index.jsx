import React from 'react'
import './style.css'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'

export default function Sales() {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true
    })

    const sales = [
        {
            src: getAssetUrl('static/img/shoe-carnival.svg'),
            alt: 'shoe carnival',
            leftRate: '+4.5%',
            rightRate: '2x',
            leftText: 'uplift in conversion rate',
            rightText: 'improvement in productivity'
        },
        {
            src: getAssetUrl('static/img/ubisoft.svg'),
            alt: 'ubisoft',
            leftRate: '>75%',
            rightRate: '+35%',
            leftText: 'reduction in "no results"',
            rightText: 'uplift in conversion rate'
        },
        {
            src: getAssetUrl('static/img/lacoste.svg'),
            alt: 'lacoste',
            leftRate: '88%',
            rightRate: '+62%',
            leftText: 'decrease in bounce rate',
            rightText: 'uplift in conversion rate on mobile'
        }
    ]

    return (
        <div className="sales-force">
            <h2>
                Leading global Salesforce Commerce Cloud <br /> retailers choose Algolia
            </h2>
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
            <div className="slider">
                <div
                    className="left-arrow-box"
                    onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                >
                    <ChevronLeftIcon />
                </div>
                <div ref={sliderRef} className="keen-slider">
                    {sales.map((sale, index) => (
                        <div
                            key={index}
                            className={`keen-slider__slide number-slide${index + 1} slider-box`}
                        >
                            <div className="slider-top">
                                <img src={sale.src} alt={sale.alt} />
                            </div>
                            <div className="slider-bottom">
                                <div className="slider-bottom-box">
                                    <p className="rate">{sale.leftRate}</p>
                                    <p className="text">{sale.leftText}</p>
                                </div>
                                <div className="slider-bottom-middle"></div>
                                <div className="slider-bottom-box">
                                    <p className="rate">{sale.rightRate}</p>
                                    <p className="text">{sale.rightText}</p>
                                </div>
                            </div>
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