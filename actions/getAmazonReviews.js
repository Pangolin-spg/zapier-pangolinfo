'use strict';

const { getParserResults, pangolinfoRequest, withSearchIds } = require('../lib/common');
const { amazonMarketplace, resultLimit } = require('../lib/fields');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v1/scrape', {
    site: bundle.inputData.site,
    parserName: 'amzReviewV2',
    format: 'json',
    bizContext: {
      bizKey: 'review',
      asin: bundle.inputData.asin,
      pageCount: Math.max(1, Math.min(Number(bundle.inputData.pageCount) || 1, 10)),
      filterByStar: bundle.inputData.starFilter || 'all_stars',
      sortBy: bundle.inputData.sortBy || 'recent',
    },
  });

  return withSearchIds(getParserResults(payload), 'amazon-review', ['reviewId', 'id'], bundle.inputData.limit, {
    asin: bundle.inputData.asin,
    pointCost: payload?.pointCost,
  });
};

module.exports = {
  key: 'get_amazon_reviews',
  noun: 'Amazon Review',
  display: {
    label: 'Find Amazon Reviews by ASIN',
    description: 'Finds recent or helpful reviews with star filters for voice-of-customer, complaint, and sentiment workflows.',
  },
  operation: {
    inputFields: [
      { key: 'asin', label: 'ASIN', type: 'string', required: true },
      amazonMarketplace,
      { key: 'pageCount', label: 'Review Pages', type: 'integer', required: false, default: '1', helpText: 'Fetch 1–10 pages. Each page consumes API credits.' },
      { key: 'starFilter', label: 'Star Filter', type: 'string', required: false, default: 'all_stars', choices: { all_stars: 'All stars', five_star: '5 stars', four_star: '4 stars', three_star: '3 stars', two_star: '2 stars', one_star: '1 star' } },
      { key: 'sortBy', label: 'Sort Reviews', type: 'string', required: false, default: 'recent', choices: { recent: 'Most recent', helpful: 'Most helpful' } },
      resultLimit,
    ],
    perform,
    sample: { id: 'R1EXAMPLE', reviewId: 'R1EXAMPLE', asin: 'B0DYTF8L2W', star: '1.0', title: 'Example review', content: 'Example review content.' },
  },
};
