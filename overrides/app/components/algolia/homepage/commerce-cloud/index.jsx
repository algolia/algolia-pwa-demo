import React, {useState} from 'react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import './style.css'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'

export default function Commerce() {
    const [activeAnsver, setActiveAnsver] = useState(0)

    const activeAnsvered = (id) => {
        if (id === 0) {
            setActiveAnsver(0)
        } else if (id === 1) {
            setActiveAnsver(1)
        } else if (id === 2) {
            setActiveAnsver(2)
        } else if (id === 3) {
            setActiveAnsver(3)
        }
    }

    const commerces = [
        {
            question: 'Uplift in conversion',
            answer: 'Customers leveraging Algolia see improved conversion by up to 30%.',
            src: getAssetUrl('static/img/conversion.svg'),
            alt: 'Uplift in conversion'
        },
        {
            question: 'Search performance even for 20M+ SKUs',
            answer: 'Grow your catalog and keep it up-to-date effortlessly. Algolia supports advanced use cases and is able to handle large catalogs without sacrificing performance.',
            src: getAssetUrl('static/img/enterprise.svg'),
            alt: 'Search performance even for 20M+ SKUs'
        },
        {
            question: 'Seamless integration and flexible APIs',
            answer: 'Algolia is built for composable architectures and supports search across multiple data sources. <a href="https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/getting-started/introduction/?client=javascript">Deploy Algolia</a> with your native storefront (SiteGenesis or SFRA), or choose a headless approach, leveraging Algolia with Salesforce’s PWA Kit or other modern frontend frameworks.',
            src: getAssetUrl('static/img/graphic.jpg'),
            alt: 'Seamless integration and flexible APIs'
        },
        {
            question: 'Connected online and offline experiences with BOPIS',
            answer: 'Create optimized BOPIS (buy online, pick up in-store) experiences with geolocation and targeted store inventory search.',
            src: getAssetUrl('static/img/disruption.jpg'),
            alt: 'Connected online and offline experiences with BOPIS'
        }
    ]
    return (
        <div className="commerce">
            <h2>
                Combine the power of Salesforce Commerce <br /> Cloud and Algolia to drive revenue
            </h2>
            <div className="commerce-bottom">
                <div className="commerce-left">
                    <div
                        className={`questions ${activeAnsver === 0 ? 'passive' : ''}`}
                        onClick={() => activeAnsvered(0)}
                    >
                        <div className="question-box">
                            <div className="question">{commerces[0].question}</div>
                            <ChevronDownIcon
                                className={`arrow-icon ${activeAnsver === 0 ? 'active' : ''}`}
                            />
                        </div>
                        {activeAnsver === 0 && <div className="answer">{commerces[0].answer}</div>}
                        {activeAnsver === 0 && (
                            <div className="mobile-image">
                                <img src={commerces[0].src} alt={commerces[0].alt} />
                            </div>
                        )}
                    </div>
                    <div
                        className={`questions ${activeAnsver === 1 ? 'passive' : ''}`}
                        onClick={() => activeAnsvered(1)}
                    >
                        <div className="question-box">
                            <div className="question">{commerces[1].question}</div>
                            <ChevronDownIcon
                                className={`arrow-icon ${activeAnsver === 1 ? 'active' : ''}`}
                            />
                        </div>
                        {activeAnsver === 1 && <div className="answer">{commerces[1].answer}</div>}
                        {activeAnsver === 1 && (
                            <div className="mobile-image">
                                <img src={commerces[1].src} alt={commerces[1].alt} />
                            </div>
                        )}
                    </div>
                    <div
                        className={`questions ${activeAnsver === 2 ? 'passive' : ''}`}
                        onClick={() => activeAnsvered(2)}
                    >
                        <div className="question-box">
                            <div className="question">{commerces[2].question}</div>
                            <ChevronDownIcon
                                className={`arrow-icon ${activeAnsver === 2 ? 'active' : ''}`}
                            />
                        </div>
                        {activeAnsver === 2 && (
                            <div
                                className="answer"
                                dangerouslySetInnerHTML={{__html: commerces[2].answer}}
                            ></div>
                        )}
                        {activeAnsver === 2 && (
                            <div className="mobile-image">
                                <img src={commerces[2].src} alt={commerces[2].alt} />
                            </div>
                        )}
                    </div>
                    <div
                        className={`questions ${activeAnsver === 3 ? 'passive' : ''}`}
                        onClick={() => activeAnsvered(3)}
                    >
                        <div className="question-box">
                            <div className="question">{commerces[3].question}</div>
                            <ChevronDownIcon
                                className={`arrow-icon ${activeAnsver === 3 ? 'active' : ''}`}
                            />
                        </div>
                        {activeAnsver === 3 && <div className="answer">{commerces[3].answer}</div>}

                        {activeAnsver === 3 && (
                            <div className="mobile-image">
                                <img src={commerces[3].src} alt={commerces[3].alt} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="commerce-right">
                    {activeAnsver === 0 && <img src={commerces[0].src} alt={commerces[0].alt} />}
                    {activeAnsver === 1 && <img src={commerces[1].src} alt={commerces[1].alt} />}
                    {activeAnsver === 2 && <img src={commerces[2].src} alt={commerces[2].alt} />}
                    {activeAnsver === 3 && <img src={commerces[3].src} alt={commerces[3].alt} />}
                </div>
            </div>
        </div>
    )
}