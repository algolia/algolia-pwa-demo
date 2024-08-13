import recommend from '@algolia/recommend'

import {APP_ID, SEARCH_API_KEY} from './constants'
const packageJson = require('./../../../../../package.json')
const version = packageJson.version

var recommendClient = recommend(APP_ID, SEARCH_API_KEY)
recommendClient.addAlgoliaAgent('Algolia for Salesforce B2C - PWA (' + version + ')')


export { recommendClient };