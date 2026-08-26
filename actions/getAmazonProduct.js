'use strict';

const { compactObject, pangolinfoRequest } = require('../lib/common');
const { amazonMarketplace, postalCode } = require('../lib/fields');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v1/scrape', {
    parserName: 'amzProductDetail',
    site: bundle.inputData.site,
    content: bundle.inputData.asin,
    format: 'json',
    bizContext: compactObject({ zipcode: bundle.inputData.zipcode }),
  });

  return { id: String(payload?.data?.taskId || bundle.inputData.asin), ...payload };
};

module.exports = {
  key: 'get_amazon_product',
  noun: 'Amazon Product',
  display: {
    label: 'Get Amazon Product by ASIN',
    description: 'Retrieves current structured product details, price, stock, ratings, seller, images, variations, and rank data.',
  },
  operation: {
    inputFields: [
      { key: 'asin', label: 'ASIN', type: 'string', required: true, helpText: 'A 10-character Amazon ASIN, for example B0DYTF8L2W.' },
      amazonMarketplace,
      postalCode,
    ],
    perform,
    sample: { id: 'B0DYTF8L2W', code: 0, message: 'Success', pointCost: 5, data: { taskId: 'sample-task' } },
  },
};
