import React from 'react';
import { SearchIcon } from '../../components';
import { PopularHit } from '../../types';

/**
 * Represents the props for the PopularItem component.
 *
 * @typedef {Object} PopularItemProps
 * @property {PopularHit} hit - The popular hit object.
 */
type PopularItemProps = {
    hit: PopularHit;
};

/**
 * PopularItem component. It renders a popular item with a search icon and the query.
 *
 * @param {PopularItemProps} props - The props for the PopularItem component.
 * @param {PopularHit} props.hit - The popular hit object.
 * @returns {JSX.Element} The PopularItem component.
 */
function PopularItem({ hit }: PopularItemProps) {
    return (
      <div key={hit.objectID} className="aa-ItemWrapper">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <SearchIcon />
        </div>
        <div className="aa-ItemContent">
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">{hit.query}</div>
          </div>
        </div>
      </div>
    );
}

export default PopularItem;