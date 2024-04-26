import { Hit } from '@algolia/client-search';

/**
 * Represents a popular category record with label and count.
 *
 * @typedef {Object} PopularCategoryRecord
 * @property {string} label - The label of the popular category.
 * @property {number} count - The count of the popular category.
 */
type PopularCategoryRecord = {
  label: string;
  count: number;
};

/**
 * Represents an Algolia hit for a popular category record.
 *
 * @typedef {Hit<PopularCategoryRecord>} PopularCategoryHit
 */
export type PopularCategoryHit = Hit<PopularCategoryRecord>;
