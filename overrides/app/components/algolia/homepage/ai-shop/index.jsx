import React from 'react'
import './style.css'
import {CheckIcon} from '@chakra-ui/icons'

const searchs = [
    {
        text: 'Scale with a reliable solution, trusted by 17k+ customers.'
    },
    {
        text: 'Enterprise ready with 140B+ search queries per month & a 99.999% SLA.'
    },
    {
        text: 'Adapting to your needs in both <a href="https://www.algolia.com/industries/ecommerce/">B2C</a> and <a href="https://www.algolia.com/industries/b2b-ecommerce/">B2B</a> environments.'
    },
    {
        text: 'Advanced use cases support such as search performance for 20M+ SKUs, inventory-aware search, BOPIS and more.'
    }
]

export default function Shop() {
    return (
        <div className="search">
            <div className="search-container">
                <h2>The one-stop-shop for AI Search</h2>
                <div className="search-bottom">
                    {searchs.map((item, index) => (
                        <div key={index} className="search-box">
                            <CheckIcon className="icon-check" />
                            <p dangerouslySetInnerHTML={{__html: item.text}}></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
