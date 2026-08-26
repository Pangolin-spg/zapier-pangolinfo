'use strict';

const { compactObject, getParserResults, pangolinfoRequest, withSearchIds } = require('../lib/common');
const { amazonMarketplace, postalCode, resultLimit } = require('../lib/fields');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v1/scrape', {
    parserName: 'amzKeyword',
    site: bundle.inputData.site,
    content: bundle.inputData.keyword,
    format: 'json',
    bizContext: compactObject({ zipcode: bundle.inputData.zipcode }),
  });

  return withSearchIds(getParserResults(payload), 'amazon-product', ['asin', 'url', 'link'], bundle.inputData.limit, {
    pointCost: payload?.pointCost,
  });
};

module.exports = {
  key: 'search_amazon_products',
  noun: 'Amazon Product',
  display: {
    label: 'Find Amazon Products by Keyword',
    description: 'Finds products and exposes organic position, Sponsored placement, price, ratings, badges, and delivery information.',
  },
  operation: {
    inputFields: [
      { key: 'keyword', label: 'Buyer Keyword', type: 'string', required: true, helpText: 'A buyer-oriented search phrase, for example noise cancelling headphones.' },
      amazonMarketplace,
      postalCode,
      resultLimit,
    ],
    perform,
    sample: { id: 'B0EXAMPLE01', asin: 'B0EXAMPLE01', title: 'Example product', position: 1, sponsored: false, price: '$29.99' },
  },
};
