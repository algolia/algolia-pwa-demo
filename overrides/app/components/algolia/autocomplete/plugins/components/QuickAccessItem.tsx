import React from 'react';
import { cx, hash } from '../../utils';
import { QuickAccessHit } from '../../types';

/**
 * QuickAccessItemProps interface.
 *
 * @interface QuickAccessItemProps
 * @property {QuickAccessHit} hit - The quick access hit object.
 * @property {(url: string) => void} navigate - The navigate function to handle clicks.
 */
type QuickAccessItemProps = {
    hit: QuickAccessHit;
    navigate: (url: string) => void;
};

/**
 * QuickAccessItem component.
 * @param {QuickAccessItemProps} props - The component props.
 * @returns {React.ReactElement} The QuickAccessItem component.
 */
function QuickAccessItem({ hit, navigate }: QuickAccessItemProps) {

    function handleClick(ref) {
        navigate(ref);
    }

    return (
      <a
        key={hash(hit.title)}
        onClick={() => handleClick(hit.href)}
        className={cx('aa-ItemLink aa-QuickAccessItem', `aa-QuickAccessItem--${hit.template}`)}
      >
        <div className="aa-ItemContent">
          {hit.image && (
            <div className="aa-ItemPicture">
              <img src={hit.image} alt={hit.title} />
            </div>
          )}
          <div key={hash(hit.title)} className="aa-ItemContentBody">
            {hit.date && <div className="aa-ItemContentDate">{hit.date}</div>}
            <div className="aa-ItemContentTitle">{hit.title}</div>
            {hit.subtitle && (
              <div className="aa-ItemContentSubTitle">{hit.subtitle}</div>
            )}
            {hit.links && (
              <ul>
                {hit.links.map((link) => (
                  <li className='quicklinks' key={hash(link.text)}>
                    <span className='quickAccessItemAnchor' onClick={() => handleClick(link.href)}>{link.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </a>
    );
}

export default QuickAccessItem;
