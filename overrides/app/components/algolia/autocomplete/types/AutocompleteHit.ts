import { Hit } from '@algolia/client-search';

/**
 * Represents an Algolia hit for autocomplete. It extends the Algolia Hit type with an additional __autocomplete_id property.
 *
 * @template THit - The type of hit that extends any.
 * @typedef {Hit<THit & { __autocomplete_id: number; }>} AutocompleteHit
 */
export type AutocompleteHit<THit> = Hit<
  THit & {
    __autocomplete_id: number;
  }
>;
