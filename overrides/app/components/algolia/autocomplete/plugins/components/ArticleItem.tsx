import React from 'react';
import { ArticleHit } from '../../types';

/**
 * Props for the `ArticleItem` component.
 * @typedef {Object} ArticleItemProps
 * @property {ArticleHit} hit - The article data to be displayed.
 */
type ArticleItemProps = {
  hit: ArticleHit;
};

/**
 * Component to render an individual article item.
 * This component displays a clickable article link, which includes an image,
 * the article's title, and a brief description truncated to 25 characters. 
 * It is designed to be used within the autocomplete suggestions list.
 *
 * @param {ArticleItemProps} props - The props for the article item component.
 * @returns {React.ReactElement} The JSX element representing the article item.
 */
function ArticleItem({ hit }: ArticleItemProps) {
  return (
    <a key={hit.objectID} href="#" className="aa-ItemLink aa-ArticleItem">
      <div className="aa-ItemContent">
        <div className="aa-ItemPicture">
          <img src={hit.image} alt={hit.name} />
        </div>

        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">{hit.name}</div>
          {hit.description && (
            <div className="aa-ItemContentDate">
              {hit.description.substring(0, 125) + '...'}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default ArticleItem;