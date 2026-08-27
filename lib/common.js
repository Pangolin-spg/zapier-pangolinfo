'use strict';

const API_BASE_URL = 'https://scrapeapi.pangolinfo.com';
const MCP_URL = 'https://mcp.pangolinfo.com/mcp';
const USER_AGENT = 'pangolinfo-zapier/1.0.2';

const sanitizeError = (response) => {
  const status = response && response.status ? `HTTP ${response.status}` : 'Request failed';
  return `${status}. Check the API key, inputs, account credits, and Pangolinfo service status.`;
};

const ensureSuccess = (z, response) => {
  if (!response || response.status < 200 || response.status >= 300) {
    throw new z.errors.Error(sanitizeError(response), 'PangolinfoRequestError', response?.status || 500);
  }
  return response;
};

const pangolinfoRequest = async (z, bundle, path, body) => {
  const response = await z.request({
    url: `${API_BASE_URL}${path}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bundle.authData.apiKey}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
    },
    body,
    timeout: 90000,
  });

  ensureSuccess(z, response);
  return response.data;
};

const validateApiKey = async (z, bundle) => {
  const response = await z.request({
    url: MCP_URL,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bundle.authData.apiKey}`,
      Accept: 'application/json, text/event-stream',
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
    },
    body: {
      jsonrpc: '2.0',
      id: 'zapier-auth-check',
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'pangolinfo-zapier', version: '1.0.2' },
      },
    },
    timeout: 30000,
  });

  ensureSuccess(z, response);
  return { id: 'pangolinfo-api-key', connected: true };
};

const getParserResults = (payload) => {
  const parserRuns = Array.isArray(payload?.data?.json) ? payload.data.json : [];
  return parserRuns.flatMap((run) => {
    const results = run?.data?.results;
    return Array.isArray(results) ? results : [];
  });
};

const getNicheResults = (payload) => {
  const candidates = [
    payload?.data?.items?.data,
    payload?.data?.items,
    payload?.data,
    payload?.items,
  ];
  return candidates.find(Array.isArray) || [];
};

const withSearchIds = (items, prefix, idFields, limit, extra = {}) => {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 100));
  return items.slice(0, safeLimit).map((item, index) => {
    const sourceId = idFields.map((field) => item?.[field]).find((value) => value !== undefined && value !== null && value !== '');
    return {
      ...item,
      ...extra,
      id: String(sourceId || `${prefix}-${index + 1}`),
    };
  });
};

const compactObject = (value) => Object.fromEntries(
  Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== ''),
);

module.exports = {
  API_BASE_URL,
  compactObject,
  ensureSuccess,
  getNicheResults,
  getParserResults,
  pangolinfoRequest,
  validateApiKey,
  withSearchIds,
};
