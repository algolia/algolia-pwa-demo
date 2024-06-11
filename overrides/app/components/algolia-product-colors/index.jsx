/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useState } from "react";
import { Box, HStack, Button, Center, useMultiStyleConfig, Flex } from "@chakra-ui/react";
import { cssColorGroups } from "../../constants";
import {productUrlBuilder} from '@salesforce/retail-react-app/app/utils/url'
import Link from "@salesforce/retail-react-app/app/components/link";
import { useIntl } from "react-intl";

const AlgoliaProductColors = (props) => {
  const { product, setSelectedColors, selectedColors, setProductUrl, productUrl } = props;

  //define hook and state for url
  const intl = useIntl();

  const styles = useMultiStyleConfig("SwatchGroup", {
    variant: "circle",
    disabled: false
  });

  const { colorVariations } = product;

  const handleSetSelectedColors = (variant) => {
    let allColors = { ...selectedColors };
    const newPhotoUrl = variant.image_groups[0].images[0].dis_base_link;

    if (!allColors[product.masterID]) {
      allColors[product.masterID] = null;
    }
    if (newPhotoUrl !== allColors[product.masterID]) {
      allColors[product.masterID] = newPhotoUrl;
      setSelectedColors({ ...allColors });
    }
  };

  return (
    <>
      {
        (colorVariations && colorVariations.length) &&
        <HStack spacing='5px' mt={1}>
          {colorVariations.map((variant, idx) => {
            const lcLabel = variant.color.toLowerCase().replace(/\s/g, "").replace(/&/g, "and");
            return (
              <Box key={idx} onMouseOver={() => handleSetSelectedColors(variant)}>
                <Link
                  data-testid="product-tile"
                  {...styles.container}
                  to={productUrlBuilder({id: variant.variantID}, intl.local)}
                >
                <HStack cursor="pointer">
                  <Button
                    {...styles.swatch}
                    color={"black"}
                    variant="outline"
                    marginRight={0}
                    marginBottom="-1px"
                    width="30px"
                    height="30px"
                    borderRadius="100%"
                    overflow="hidden"
                    minWidth="auto"
                    border={"1px solid #e9e9e9"}
                  >
                    <Center
                      {...styles.swatchButton}
                      marginRight={0}
                      width="100%"
                      height="100%"
                    >
                      <Box
                        marginRight={0}
                        height="100%"
                        width="100%"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        background={cssColorGroups[lcLabel]}
                      />
                    </Center>
                  </Button>
                </HStack>
                </Link>
              </Box>
            );
          })}
        </HStack>

      }
    </>
  );
};

export default AlgoliaProductColors;
