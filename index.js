'use strict';

const core = require('zapier-platform-core');
const authentication = require('./authentication');
const getAmazonProduct = require('./actions/getAmazonProduct');
const searchAmazonProducts = require('./actions/searchAmazonProducts');
const getAmazonReviews = require('./actions/getAmazonReviews');
const filterAmazonNiches = require('./actions/filterAmazonNiches');

module.exports = {
  version: require('./package.json').version,
  platformVersion: core.version,
  flags: { cleanInputData: false },
  authentication,
  creates: {
    [getAmazonProduct.key]: getAmazonProduct,
  },
  searches: {
    [searchAmazonProducts.key]: searchAmazonProducts,
    [getAmazonReviews.key]: getAmazonReviews,
    [filterAmazonNiches.key]: filterAmazonNiches,
  },
};
