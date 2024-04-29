import { AutocompleteHit } from './AutocompleteHit';

/**
 * Represents matching brands with label and count from product index.
 *
 * @typedef {Object} BrandRecord
 * @property {string} label - The label of the brand.
 * @property {number} count - The count of the brand.
 */
type BrandRecord = {
  label: string;
  count: number;
};

/**
 * Represents an Algolia hit for a brand record.
 *
 * @typedef {AutocompleteHit<BrandRecord>} BrandHit
 */
export type BrandHit = AutocompleteHit<BrandRecord>;
