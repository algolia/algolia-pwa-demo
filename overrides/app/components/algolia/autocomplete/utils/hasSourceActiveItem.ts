import {AutocompleteState, BaseItem} from '@algolia/autocomplete-core'

/**
 * Checks if a specific source within an AutocompleteState has an active item.
 *
 * @template TItem The type of the items in the autocomplete state.
 * @param {string} sourceId - The ID of the source to check.
 * @param {AutocompleteState<TItem>} state - The AutocompleteState object.
 * @returns {boolean} True if the source has an active item, false otherwise.
 */
export function hasSourceActiveItem<TItem extends BaseItem>(
    sourceId: string,
    state: AutocompleteState<TItem>
) {
    return Boolean(
        state.collections.find(
            (collection) =>
                collection.source.sourceId === sourceId &&
                collection.items.find((item) => item.__autocomplete_id === state.activeItemId)
        )
    )
}
