import { Hit } from '@algolia/client-search';

/**
 * Represents a popular record with a query.
 *
 * @typedef {Object} PopularRecord
 * @property {string} query - The query of the popular record.
 */
type PopularRecord = {
  query: string;
};

/**
 * Represents an Algolia hit for a popular record.
 *
 * @typedef {Hit<PopularRecord>} PopularHit
 */
export type PopularHit = Hit<PopularRecord>;
