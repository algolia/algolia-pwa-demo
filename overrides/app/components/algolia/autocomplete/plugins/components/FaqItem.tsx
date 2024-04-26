import React, { memo } from 'react';
import { AutocompleteComponents } from '@algolia/autocomplete-js';
import { InfoIcon, Breadcrumb } from '../../components';
import { FaqHit } from '../../types';

/**
 * Props for the FaqItem component.
 * @typedef {Object} FaqItemProps
 * @property {FaqHit} hit - The FAQ hit object containing information about the FAQ item.
 * @property {AutocompleteComponents} components - The Algolia Autocomplete components object.
 */
type FaqItemProps = {
  hit: FaqHit;
  components: AutocompleteComponents;
};

/**
 * A memoized component that renders an information icon.
 * @returns {JSX.Element} The rendered icon element.
 */
const ItemIcon = memo(() => (
  <div className="aa-ItemIcon aa-ItemIcon--noBorder">
    <InfoIcon />
  </div>
));

/**
 * A memoized component that renders the content of a FAQ item.
 * @param {Object} props - The component props.
 * @param {FaqHit} props.hit - The FAQ hit object.
 * @param {AutocompleteComponents} props.components - The Algolia Autocomplete components object.
 * @returns {JSX.Element} The rendered content element.
 */
const ItemContent = memo<{ hit: FaqHit; components: AutocompleteComponents }>(({ hit, components }) => (
  <div className="aa-ItemContentBody">
    <div className="aa-ItemContentTitle">
      <components.ReverseHighlight hit={hit} attribute="name" />
    </div>
  </div>
));

/**
 * A memoized component that renders a breadcrumb trail for a FAQ item.
 * @param {Object} props - The component props.
 * @param {FaqHit} props.hit - The FAQ hit object.
 * @param {AutocompleteComponents} props.components - The Algolia Autocomplete components object.
 * @returns {JSX.Element|null} The rendered breadcrumb element or null if no categories exist.
 */
const ItemBreadcrumb = memo<{ hit: FaqHit; components: AutocompleteComponents }>(({ hit, components }) => {
  if (!hit.categories || hit.categories.length <= 1) return null;
  return (
    <Breadcrumb items={hit.categories.map((_, index) => (
      <components.Highlight key={index} hit={hit} attribute='name' />
    ))} />
  );
});

/**
 * A memoized component that renders a single FAQ item.
 * @param {FaqItemProps} props - The component props.
 * @returns {JSX.Element} The rendered FAQ item element.
 */
const FaqItem = memo<FaqItemProps>(({ hit, components }) => (
  <div key={hit.objectID} className="aa-ItemWrapper aa-FaqItem">
    <div className="aa-ItemContent">
      <ItemIcon />
      <ItemContent hit={hit} components={components} />
    </div>
    <ItemBreadcrumb hit={hit} components={components} />
  </div>
));

export default FaqItem;