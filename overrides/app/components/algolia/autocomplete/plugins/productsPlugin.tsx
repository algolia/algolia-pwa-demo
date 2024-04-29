/** @jsxRuntime classic */
/** @jsx React.createElement */

import {
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { SearchResponse } from '@algolia/client-search';
import React, { createElement, Fragment } from 'react';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { ProductHit } from '../types';
import { StarIcon } from '../components';
import { cx } from '../utils';
/**
 * Creates a products plugin factory function.
 * @param {function} navigate - The navigation function.
 * @param {Object} currency - The currency object.
 * @returns {Object} The products plugin factory object.
 */
export const productsPluginFactory = (navigate, currency) => ({
  getSources({ query }) {
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'productsPlugin',
        getItems({ setContext }) {
          return getAlgoliaResults<ProductHit>({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                query,
                params: {
                  hitsPerPage: 4,
                },
              },
            ],
            transformResponse({ hits, results }) {
              setContext({
                nbProducts: (results[0] as SearchResponse<ProductHit>).nbHits,
              });

              return hits;
            },
          });
        },
        onSelect({ setIsOpen }) {
          setIsOpen(true);
        },
        renderer: { createElement, Fragment, render: () => {} },
        templates: {
          header({ state, Fragment }) {
            return (
              <Fragment>
                <div className="aa-SourceHeaderTitle">
                  Products for {state.query}
                </div>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return <ProductItem hit={item} components={components} navigate={navigate} currency={currency} />;
          },
          footer({ state }) {
            return (
              state.context.nbProducts > 4 && (
                <div style={{ textAlign: 'center' }}>
                  <a
                    onClick={() => navigate('/search?q=' + state.query)}
                    className="aa-SeeAllBtn"
                  >
                    See All Products ({state.context.nbProducts})
                  </a>
                </div>
              )
            );
          },
        },
      },
    ];
  },
});

/**
 * Determines if a product is on sale based on its pricebooks and currency.
 *
 * @param {Object} data - The product's pricebooks data.
 * @param {string} currency - The currency to check for sale prices.
 * @returns {Object} An object containing the highest, lowest, and isSale flag.
 * @throws {Error} If no prices are available for the specified currency.
 */
function isSale(data, currency) {
    if (!data[currency]) {
        return {
            high: 0,
            low: 0,
            isSale: false
        };
    }

    const prices = data[currency];
    let high = -Infinity,
        low = Infinity;

    prices.forEach(priceObj => {
        high = Math.max(high, priceObj.price);
        low = Math.min(low, priceObj.price);
    });

    return {
        high,
        low,
        isSale: high !== low
    };
}

/**
 * Formats a price value into a currency string.
 *
 * @param {number} value - The price value to format.
 * @param {string} currency - The currency code.
 * @returns {string} The formatted price string.
 */
function formatPrice(value: number, currency: string) {
    return value.toLocaleString('en-US', { style: 'currency', currency });
}

/**
 * Props for the ProductItem component.
 */
type ProductItemProps = {
    /** The product hit object. */
    hit: ProductHit;
    /** Autocomplete components from @algolia/autocomplete-js. */
    components: AutocompleteComponents;
    /** Navigation function to navigate to a product page. */
    navigate: (url: string) => void;
    /** Currency object with currency code and setter function. */
    currency: {
        currency: string;
        setCurrency: (currency: string) => void;
    }
};

/**
 * Renders a product item in the search results.
 *
 * @param {ProductItemProps} props - The component props.
 * @returns {JSX.Element} The rendered product item.
 */
function ProductItem({ hit, components, navigate, currency }: ProductItemProps) {
    const currentCurrency = currency.currency;
    const salePriceObj = isSale(hit.pricebooks, currentCurrency);

    return (
      <div className="aa-ItemLink aa-ProductItem" onClick={() => navigate('/product/' + hit.objectID)}>
        <div className="aa-ItemContent">
          <ProductImage url={hit.lsImage} name={hit.name} />
          <ProductDetails hit={hit} components={components} priceObj={salePriceObj} currency={currentCurrency} />
        </div>
      </div>
    );
}

/**
 * Renders the product image.
 *
 * @param {{ url: string, name: string }} props - The component props.
 * @returns {JSX.Element} The rendered product image.
 */
const ProductImage = ({ url, name }) => (
    <div className="aa-ItemPicture--loaded">
      <img src={url} alt={name} />
    </div>
);

/**
 * Renders the product details section.
 *
 * @param {{ hit: ProductHit, components: AutocompleteComponents, priceObj: Object, currency: string }} props - The component props.
 * @returns {JSX.Element} The rendered product details.
 */
const ProductDetails = ({ hit, components, priceObj, currency }) => (
    <div className="aa-ItemContentBody">
      <ProductBrand components={components} hit={hit} />
      <ProductName components={components} hit={hit} />
      <ProductPrice priceObj={priceObj} currency={currency} />
      <ProductRating hit={hit} />
    </div>
);

/**
 * Renders the product brand.
 *
 * @param {{ components: AutocompleteComponents, hit: ProductHit }} props - The component props.
 * @returns {JSX.Element} The rendered product brand.
 */
const ProductBrand = ({ components, hit }) => (
    <div>
        {hit.brand && (
          <div className="aa-ItemContentBrand">
            <components.Highlight hit={hit} attribute="brand" />
          </div>
        )}
    </div>
);

/**
 * Renders the product name.
 *
 * @param {{ components: AutocompleteComponents, hit: ProductHit }} props - The component props.
 * @returns {JSX.Element} The rendered product name.
 */
const ProductName = ({ components, hit }) => (
    <div>
        {hit.name && (
          <div className="aa-ItemContentTitleWrapper">
            <components.Highlight hit={hit} attribute="name" />
          </div>
        )}
    </div>
);

/**
 * Renders the product price.
 *
 * @param {{ priceObj: Object, currency: string }} props - The component props.
 * @returns {JSX.Element} The rendered product price.
 */
const ProductPrice = ({ priceObj, currency }) => (
    <div className="aa-ItemContentPrice">
          <div className="aa-ItemContentPriceCurrent">
            {formatPrice(priceObj.low, currency)}
          </div>
          {priceObj.isSale && (
            <div className="aa-ItemContentPriceDiscounted">
               {formatPrice(priceObj.high, currency)}
            </div>
          )}
    </div>
);

/**
 * Renders the product rating.
 *
 * @param {{ hit: ProductHit }} props - The component props.
 * @returns {JSX.Element} The rendered product rating.
 */
const ProductRating = ({hit}) => (
    <div>
        {hit.reviews && (
          <div className="aa-ItemContentRating">
            <ul>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <li key={index}>
                    <div
                      className={cx(
                        'aa-ItemIcon aa-ItemIcon--noBorder aa-StarIcon',
                        index >= hit.reviews.rating && 'aa-StarIcon--muted'
                      )}
                    >
                      <StarIcon />
                    </div>
                  </li>
                ))}
            </ul>
            <span className="aa-ItemContentRatingReviews">
              ({hit.reviews.count})
            </span>
          </div>
        )}
    </div>
);