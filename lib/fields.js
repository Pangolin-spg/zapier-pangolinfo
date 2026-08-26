'use strict';

const amazonMarketplace = {
  key: 'site',
  label: 'Amazon Marketplace',
  type: 'string',
  required: true,
  default: 'amz_us',
  choices: {
    amz_us: 'United States',
    amz_ca: 'Canada',
    amz_uk: 'United Kingdom',
    amz_de: 'Germany',
    amz_fr: 'France',
    amz_it: 'Italy',
    amz_es: 'Spain',
    amz_jp: 'Japan',
    amz_au: 'Australia',
    amz_mx: 'Mexico',
    amz_sa: 'Saudi Arabia',
    amz_ae: 'United Arab Emirates',
    amz_br: 'Brazil',
  },
  helpText: 'Select the marketplace used for localized product data.',
};

const postalCode = {
  key: 'zipcode',
  label: 'Postal Code',
  type: 'string',
  required: false,
  helpText: 'Optional. Use a postal code from the selected marketplace country for localized price, stock, and delivery data.',
};

const resultLimit = {
  key: 'limit',
  label: 'Maximum Results',
  type: 'integer',
  required: false,
  default: '10',
  helpText: 'Return between 1 and 100 records from this request.',
};

module.exports = { amazonMarketplace, postalCode, resultLimit };
