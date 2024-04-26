import React from 'react';

import { PopularCategoryHit } from '../../types';

/**
 * Base URL for the category images. You can adjust this to fit your needs.
 * @type {string}
 */
const baseUrl = 'https://res.cloudinary.com/hilnmyskv/image/upload/v1646067858';

/**
 * Object containing the URLs for each category image can beadjusted to fit your needs.
 * @type {Object.<string, string>}
 */
const images = {
  Womens: `${baseUrl}/women_category_vwzkln.jpg`,
  Bags: `${baseUrl}/bags_category_qd7ssj.jpg`,
  Clothing: `${baseUrl}/clothing_category_xhiz1s.jpg`,
  Mens: `${baseUrl}/men_category_wfcley.jpg`,
  'T-shirts': `${baseUrl}/t-shirts_category_gzqcvd.jpg`,
  Shoes: `${baseUrl}/shoes_category_u4fi0q.jpg`,
};

/**
 * Props for the PopularCategoryItem component.
 * @typedef {Object} PopularCategoryItemProps
 * @property {PopularCategoryHit} hit - The hit object for the popular category.
 */
type PopularCategoryItemProps = {
    hit: PopularCategoryHit;
};

/**
 * Component for rendering a popular category item.
 * @param {PopularCategoryItemProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */
function PopularCategoryItem({ hit }: PopularCategoryItemProps) {
    console.log(hit);
    return (
      <div key={hit.objectID} className="aa-ItemWrapper aa-PopularCategoryItem">
        <div className="aa-ItemContent">
          <div className="aa-ItemPicture">
            <img className='popularCategoryImage' src={images[hit.label]} alt={hit.label} />
          </div>
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              {hit.label} <span>({hit.count})</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PopularCategoryItem;