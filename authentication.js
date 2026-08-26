'use strict';

const { validateApiKey } = require('./lib/common');

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'Pangolinfo API Key',
      type: 'password',
      required: true,
      helpText: 'Create or copy a key in the [Pangolinfo Console](https://tool.pangolinfo.com/). Enter the key only; Zapier adds the Bearer prefix.',
    },
    {
      key: 'connectionName',
      label: 'Connection Name',
      type: 'string',
      required: false,
      default: 'Pangolinfo',
      helpText: 'A non-secret label that helps you distinguish this connection in Zapier. See the [Pangolinfo authentication guide](https://docs.pangolinfo.com/en-api-reference/authApi/authApi).',
    },
  ],
  test: validateApiKey,
  connectionLabel: '{{bundle.authData.connectionName}}',
};
