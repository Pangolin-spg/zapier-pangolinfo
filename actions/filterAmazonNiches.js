'use strict';

const { getNicheResults, pangolinfoRequest, withSearchIds } = require('../lib/common');
const { resultLimit } = require('../lib/fields');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v1/amzscope/niches/filter', {
    marketplaceId: 'US',
    searchVolumeT90Min: Number(bundle.inputData.minSearchVolume) || 10000,
    top5BrandsClickShareMax: Number(bundle.inputData.maxTop5BrandShare) || 0.4,
    page: Math.max(1, Number(bundle.inputData.page) || 1),
    size: Math.max(1, Math.min(Number(bundle.inputData.size) || 10, 10)),
  });

  return withSearchIds(getNicheResults(payload), 'amazon-niche', ['nicheId', 'id'], bundle.inputData.limit);
};

module.exports = {
  key: 'filter_amazon_niches',
  noun: 'Amazon Niche',
  display: {
    label: 'Find Amazon Niche Opportunities',
    description: 'Finds US Amazon niches using demand, competition, brand concentration, returns, price, and launch metrics.',
  },
  operation: {
    inputFields: [
      { key: 'minSearchVolume', label: 'Minimum 90-Day Search Volume', type: 'number', required: false, default: '10000' },
      { key: 'maxTop5BrandShare', label: 'Maximum Top-Five Brand Click Share', type: 'number', required: false, default: '0.4', helpText: 'Use a decimal from 0 to 1. Lower values favor less concentrated niches.' },
      { key: 'page', label: 'Page', type: 'integer', required: false, default: '1' },
      { key: 'size', label: 'API Page Size', type: 'integer', required: false, default: '10', helpText: 'Request 1–10 niches from the selected API page.' },
      resultLimit,
    ],
    perform,
    sample: { id: 'sample-niche', nicheId: 'sample-niche', nicheTitle: 'Example niche', searchVolumeT90: 25000, top5BrandsClickShare: 0.31, avgPrice: 34.5 },
  },
};
