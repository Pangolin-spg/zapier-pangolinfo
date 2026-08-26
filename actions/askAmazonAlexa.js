'use strict';

const { pangolinfoRequest } = require('../lib/common');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v2/scrape', {
    parserName: 'amazonAlexa',
    param: [bundle.inputData.prompt],
    url: 'https://www.amazon.com/',
    screenshot: Boolean(bundle.inputData.screenshot),
  });

  return { id: String(payload?.data?.taskId || `alexa-${bundle.inputData.prompt}`), ...payload };
};

module.exports = {
  key: 'ask_amazon_alexa',
  noun: 'Alexa Shopping Answer',
  display: {
    label: 'Ask Amazon Alexa for Shopping',
    description: 'Retrieves Alexa shopping answers, recommended products and ASINs, follow-up questions, and optional screenshots.',
  },
  operation: {
    inputFields: [
      { key: 'prompt', label: 'Shopping Question', type: 'string', required: true, helpText: 'A natural-language product discovery or comparison request.' },
      { key: 'screenshot', label: 'Include Screenshot', type: 'boolean', required: false, default: 'false' },
    ],
    perform,
    sample: { id: 'sample-alexa-task', code: 0, message: 'Success', data: { taskId: 'sample-alexa-task', json: [{ prompt: 'best portable fan', content: 'Example response', products: [], follow_up_questions: [] }] } },
  },
};
