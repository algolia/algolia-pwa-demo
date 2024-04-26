import React from 'react';
import { BrandHit } from '../../types';
import { TagIcon } from '../../components';
import { AutocompleteComponents } from '@algolia/autocomplete-js';

/**
 * Props for the BrandItem component.
 * @typedef {Object} BrandItemProps
 * @property {BrandHit} hit - The brand hit object containing brand data.
 * @property {AutocompleteComponents} components - Autocomplete components provided by the Algolia library.
 */
type BrandItemProps = {
    hit: BrandHit;
    components: AutocompleteComponents;
};

/**
 * Renders a single brand item within the autocomplete results.
 *
 * @param {BrandItemProps} props - The component props.
 * @returns {JSX.Element} - The rendered brand item element.
 */
function BrandItem({ hit, components }: BrandItemProps) {
    return (
      <div key={hit.objectID} className="aa-ItemWrapper">
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon aa-ItemIcon--noBorder">
            <TagIcon />
          </div>
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.ReverseHighlight hit={hit} attribute="label" />
            </div>
          </div>
        </div>
      </div>
    );
}

export default BrandItem;