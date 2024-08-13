import algoliasearch from 'algoliasearch/lite'

import {APP_ID, SEARCH_API_KEY} from './constants'
const packageJson = require('./../../../../../package.json')
const version = packageJson.version

var searchClient = algoliasearch(APP_ID, SEARCH_API_KEY)
searchClient.addAlgoliaAgent('Algolia for Salesforce B2C - PWA (' + version + ')')


export { searchClient };