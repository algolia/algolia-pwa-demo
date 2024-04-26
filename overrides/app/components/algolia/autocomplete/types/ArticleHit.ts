/**
 * Represents an art/**
 * Represents an article record with name, image, and description.
 *
 * @typedef {Object} ArticleRecord
 * @property {string} name - The name of the article.
 * @property {string} image - The image URL of the article.
 * @property {string} description - The description of the article.
 */
type ArticleRecord = {
  name: string;
  image: string;
  description: string;
};

export type ArticleHit = Hit<ArticleRecord>;
