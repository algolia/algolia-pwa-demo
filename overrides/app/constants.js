/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* 
    Hello there! This is a demonstration of how to override a file from the base template.
    
    It's necessary that the module export interface remain consistent, 
    as other files in the base template rely on constants.js, thus we
    import the underlying constants.js, modifies it and re-export it.
*/

import {
    DEFAULT_LIMIT_VALUES,
    DEFAULT_SEARCH_PARAMS
} from '@salesforce/retail-react-app/app/constants'

// original value is 25
DEFAULT_LIMIT_VALUES[0] = 3
DEFAULT_SEARCH_PARAMS.limit = 3

export const CUSTOM_HOME_TITLE = '🎉 Hello Extensible React Template!'

export {DEFAULT_LIMIT_VALUES, DEFAULT_SEARCH_PARAMS}

export * from '@salesforce/retail-react-app/app/constants'

export const cssColorGroups = {
    beige: '#d3bca9',
    black: '#000000',
    blue: '#4089c0',
    brown: '#8e6950',
    green: '#88c290',
    grey: '#919191',
    gray: '#919191',
    silver: '#c0c0c0',
    navy: '#000080',
    orange: '#f4995c',
    pink: '#f5a0ca',
    purple: '#9873b9',
    red: '#df5b5b',
    white: '#FFFFFFF',
    yellow: '#fbe85a',
    gold: '#ffd700',
    multi: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)',
    blackandwhite: 'linear-gradient(to right, black, white)',
    blackmulti: 'linear-gradient(to right, black, orange, yellow, green, cyan, blue, violet)',
    ivory: '#fffff0',
    chino: '#d2b48c',
    stone: '#eae6ca',
    greyheather: '#dcdcdc',
    laurel: '#a9ba9d',
    charcoal: '#36454f',
    lightblack: '#2c3e50',
    slate: '#778899',
    rinsewashnew: '#f0f8ff',
    porcelain: '#f0f8ff',
    sugar: '#f9f9f9',
    swissnavyandwhite: 'linear-gradient(to right, #ffffff, #000080)',
    blackandsugar: 'linear-gradient(to right, #f9f9f9, #000000)',
    cobalt: '#0047ab',
    taupe: '#d3bca9',
    turquoise: '#40e0d0',
    miscellaneous: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)'
}