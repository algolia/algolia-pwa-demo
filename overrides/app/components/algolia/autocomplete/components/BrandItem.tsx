import React from 'react'
import {TagIcon} from '../components'
import {AutocompleteComponents} from '@algolia/autocomplete-js'
import {BrandHit} from './../types'

/**
 * Props for the BrandItem component.
 * @typedef {Object} BrandItemProps
 * @property {BrandHit} hit - The brand hit object containing brand data.
 * @property {AutocompleteComponents} components - Autocomplete components provided by the Algolia library. Optional
 */
type BrandItemProps = {
    hit: BrandHit
    components: AutocompleteComponents
}

/**
 * Renders a single brand item within the autocomplete results.
 *
 * @param {BrandItemProps} props - The component props.
 * @returns {JSX.Element} - The rendered brand item element.
 */
function BrandItem({hit, components}: BrandItemProps) {
    return (
        <div key={hit.objectID} className="aa-ItemWrapper aa-mb-3">
            <div className="aa-ItemContent">
                <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                    <TagIcon />
                </div>
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                    {components ? <components.ReverseHighlight hit={hit} attribute="label" /> : hit.facetValue}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {BrandItem}