import {AutocompleteHit} from './AutocompleteHit'

/**
 * Represents matching brands with label and count from product index.
 * This is used to render brand items in the autocomplete and fetch from facets query.
 *
 * @typedef {Object} BrandRecord
 * @property {string} label - The label of the brand.
 * @property {number} count - The count of the brand.
 */
type BrandRecord = {
    label: string
    count: number
    facetValue: string
    hits: Array<AutocompleteHit>
}

/**
 * Represents an Algolia hit for a brand record.
 *
 * @typedef {AutocompleteHit<BrandRecord>} BrandHit
 */
export type BrandHit = AutocompleteHit<BrandRecord>
