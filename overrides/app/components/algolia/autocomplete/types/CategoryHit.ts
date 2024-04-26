/**
 * Represents a category record with categories and name.
 *
 * @typedef {Object} CategoryRecord
 * @property {string[]} categories - The categories of the record.
 * @property {string} name - The name of the record.
 */
type CategoryRecord = {
  categories: string[];
  name: string;
};

export type CategoryHit = AutocompleteHit<CategoryRecord>;