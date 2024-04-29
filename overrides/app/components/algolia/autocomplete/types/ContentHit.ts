/**
 * Represents an art/**
 * Represents an content record with name, image, and description.
 *
 * @typedef {Object} ALGOLIA_CONTENT_INDEX_NAMERecord
 * @property {string} name - The name of the content.
 * @property {string} image - The image URL of the content.
 * @property {string} description - The description of the content.
 */
type ALGOLIA_CONTENT_INDEX_NAMERecord = {
  name: string;
  image: string;
  description: string;
};

export type ContentHit = Hit<ALGOLIA_CONTENT_INDEX_NAMERecord>;
