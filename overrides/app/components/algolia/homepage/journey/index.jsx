import React from 'react'
import './style.css'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {trackEvent} from '../segmentTracker'

export default function Journey() {
    const handleClick = (eventTitle) => {
        trackEvent(eventTitle)
    }
    return (
        <div className="journey">
            <div className="journey-container">
                <h2>Ready to accelerate your journey?</h2>
                <div className="journey-bottom">
                    <div className="journey-bottom-content">
                        <h3>Algolia Platform Accelerators</h3>
                        <p>
                            If you have a specific use case and need assistance with deploying a
                            custom integration, Algolia’s Professional Services organization has
                            developed a service offering aimed at accelerating the design and
                            development of connectors for some of the most popular solutions in the
                            market.
                        </p>
                        <a
                            href="mailto:partners@algolia.com"
                            className="contact"
                            onClick={() => handleClick('Contact Us')}
                        >
                            <p>Contact us for more information</p>
                            <div className="arrow-right-box">
                                <ChevronRightIcon className="arrow-right" />
                            </div>
                        </a>
                    </div>
                    <div className="journey-bottom-content">
                        <h3>Implementation Partners</h3>
                        <p>
                            Our ecosystem of implementation partners help customers deploy faster
                            and customize your search ecommerce experience across industries and use
                            cases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
