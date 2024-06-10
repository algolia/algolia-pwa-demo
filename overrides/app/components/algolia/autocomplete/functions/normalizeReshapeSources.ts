import {AutocompleteReshapeSource, BaseItem} from '@algolia/autocomplete-core'
import {flatten} from '@algolia/autocomplete-shared'

/**
 * Normalizes and reshapes the sources. It filters out falsy values because dynamic sources may not exist at every render.
 * It also flattens the sources to support pipe operators from functional libraries like Ramda.
 *
 * @template TItem - The type of item that extends BaseItem.
 * @param {Array<AutocompleteReshapeSource<TItem>>} sources - The sources to be normalized and reshaped.
 * @returns {Array<AutocompleteReshapeSource<TItem>>} The normalized and reshaped sources.
 */
export function normalizeReshapeSources<TItem extends BaseItem>(
    sources: Array<AutocompleteReshapeSource<TItem>>
) {
    return flatten(sources).filter(Boolean)
}
