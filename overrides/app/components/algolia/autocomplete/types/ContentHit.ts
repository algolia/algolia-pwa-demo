/**
 * Represents an content record with name, image, and description.
 *
 * @typedef {Object} ContentRecord
 * @property {string} name - The name of the content.
 * @property {string} image - The image URL of the content.
 * @property {string} description - The description of the content.
 */
type ContentRecord = {
    name: string
    image: string
    description: string
}

export type ContentHit = Hit<ContentRecord>
