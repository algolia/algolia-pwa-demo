import type {Hit} from '@algolia/client-search'

/**
 * Represents a product record with name, brand, image URLs, blurred image, price details, reviews, pricebooks, and lsImage.
 *
 * @typedef {Object} ProductRecord
 * @property {string} name - The name of the product.
 * @property {string} brand - The brand of the product.
 * @property {string[]} image_urls - The image URLs of the product.
 * @property {Object} price - The price details of the product.
 * @property {string} price.currency - The currency of the price.
 * @property {number} price.value - The value of the price.
 * @property {Object} reviews - The reviews of the product.
 * @property {number} reviews.count - The count of the reviews.
 * @property {number} reviews.rating - The rating of the reviews.
 * @property {Object[]} pricebooks - The pricebooks of the product.
 * @property {string} lsImage - The lsImage of the product.
 */
type ProductRecord = {
    name: string
    brand: string
    image_urls: string[]
    price: {
        currency: string
        value: number
    }
    reviews: {
        count: number
        rating: number
    }
    pricebooks: Object[]
    lsImage: string
}

export type ProductHit = Hit<ProductRecord>
