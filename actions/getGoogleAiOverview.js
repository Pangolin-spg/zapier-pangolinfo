'use strict';

const { pangolinfoRequest } = require('../lib/common');

const perform = async (z, bundle) => {
  const payload = await pangolinfoRequest(z, bundle, '/api/v2/scrape', {
    parserName: 'googleSearch',
    url: `https://www.google.com/search?q=${encodeURIComponent(bundle.inputData.query)}`,
    screenshot: Boolean(bundle.inputData.screenshot),
  });

  return { id: String(payload?.data?.taskId || `ai-overview-${bundle.inputData.query}`), ...payload };
};

module.exports = {
  key: 'get_google_ai_overview',
  noun: 'Google AI Overview',
  display: {
    label: 'Get Google AI Overview',
    description: 'Retrieves AI Overview content, cited sources, organic results, and an optional screenshot for a Google query.',
    hidden: true,
  },
  operation: {
    inputFields: [
      { key: 'query', label: 'Search Query', type: 'string', required: true, helpText: 'The commercial or informational Google query to research.' },
      { key: 'screenshot', label: 'Include Screenshot', type: 'boolean', required: false, default: 'false', helpText: 'Screenshots increase request cost and should be enabled only when visual evidence is needed.' },
    ],
    perform,
    sample: { id: 'sample-ai-overview-task', code: 0, message: 'Success', data: { results_num: 10, ai_overview: 1, taskId: 'sample-ai-overview-task' } },
  },
};
