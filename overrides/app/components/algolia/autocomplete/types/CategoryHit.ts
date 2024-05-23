/**
 * Represents a category record with categories and name.
 *
 * @typedef {Object} CategoryRecord
 * @property {string} name - The name of the record.
 */
type CategoryRecord = {
  name: string;
};

export type CategoryHit = AutocompleteHit<CategoryRecord>;