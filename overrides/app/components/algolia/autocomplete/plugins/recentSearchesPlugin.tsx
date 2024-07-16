import React from 'react';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

const RecentSearchesPlugin = (navigate) => {
  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'pwa-recent-searches',
    limit: 5,
    transformSource({ source, onRemove }) {
      return {
        ...source,
        onSelect(params) {
          const { state, setIsOpen } = params;
          setIsOpen(true);
          navigate(`/search?q=${encodeURIComponent(state.query)}`);
        },
        templates: {
          ...source.templates,
          item(params) {
            const { item, components } = params;

            const handleItemClick = (event) => {
              if (event.target.className === 'aa-recent-searches-close-button') {
                event.preventDefault();
                event.stopPropagation();
                onRemove(item.id);
              }
            };
            return (
              <div className="aa-recent-searches-tag" onClick={handleItemClick}>
                <span className="aa-recent-searches-tag-text">
                    <components.ReverseHighlight hit={item} attribute="label" />
                </span>
                <button className="aa-recent-searches-close-button">×</button>
              </div>
            );
          },
        },
      };
    },
  });

  return recentSearchesPlugin;
};

export default RecentSearchesPlugin;