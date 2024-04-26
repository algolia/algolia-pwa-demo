/**
 * Creates a unique hash from a given text string.
 *
 * @param {string} text - The text string to hash.
 * @returns {number} A unique hash value for the input text.
 */export function hash(text) {
    let hash = 0;
    if (text.length === 0)
        return hash;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}