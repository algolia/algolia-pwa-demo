import { AutocompleteHit } from './AutocompleteHit';

/**
 * Represents a FAQ record with categories, title, description, and name.
 *
 * @typedef {Object} FaqRecord
 * @property {string[]} categories - The categories of the FAQ.
 * @property {string} title - The title of the FAQ.
 * @property {string} description - The description of the FAQ.
 * @property {string} name - The name of the FAQ.
 */
type FaqRecord = {
  categories: string[];
  title: string;
  description: string;
  name: string;
};

export type FaqHit = AutocompleteHit<FaqRecord>;
