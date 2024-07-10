import React from 'react'
import './style.css'

export default function Try() {
    return (
        <div className="try">
            <div className="container">
                <h2>
                    Try the AI search that <br /> understands
                </h2>
                <div className="button-container">
                    <a href="https://www.algolia.com/demorequest/" target="_blank" className="demo">
                        Get a demo
                    </a>
                    <a
                        href="https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/getting-started/set-up-the-algolia-cartridge/?client=javascript"
                        target="_blank"
                        className="free"
                    >
                        Start free
                    </a>
                </div>
            </div>
        </div>
    )
}
