import {Hit} from '@algolia/client-search'

/**
 * Represents a quick access record with template, href, image, title, subtitle, date, and links.
 *
 * @typedef {Object} QuickAccessRecord
 * @property {'sales-banner' | 'sales-code' | 'new-collection' | 'help'} template - The template of the quick access record.
 * @property {string} href - The href of the quick access record.
 * @property {string} image - The image of the quick access record.
 * @property {string} title - The title of the quick access record.
 * @property {string} subtitle - The subtitle of the quick access record.
 * @property {string} [date] - The date of the quick access record.
 * @property {Array<{ text: string; href: string; }>} [links] - The links of the quick access record.
 */
type QuickAccessRecord = {
    template: 'sales-banner' | 'sales-code' | 'new-collection' | 'help'
    href: string
    image: string
    title: string
    subtitle: string
    date?: string
    links?: Array<{
        text: string
        href: string
    }>
}

/**
 * Represents an Algolia hit for a quick access record.
 *
 * @typedef {Hit<QuickAccessRecord>} QuickAccessHit
 */
export type QuickAccessHit = Hit<QuickAccessRecord>
