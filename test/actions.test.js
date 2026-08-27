'use strict';

const App = require('../index');

const makeZ = (payload, status = 200) => ({
  request: jest.fn().mockResolvedValue({ status, data: payload }),
  errors: { Error: class ZapierTestError extends Error {} },
});

const auth = { authData: { apiKey: 'test-key' } };

describe('Pangolinfo Zapier actions', () => {
  test('exports one read action and three searches', () => {
    expect(Object.keys(App.creates)).toHaveLength(1);
    expect(Object.keys(App.searches)).toHaveLength(3);
    expect(App.creates.get_google_ai_overview).toBeUndefined();
  });

  test('authenticates with MCP initialize and never embeds the key in the URL', async () => {
    const z = makeZ({ jsonrpc: '2.0', id: 'zapier-auth-check', result: {} });
    await App.authentication.test(z, auth);
    expect(z.request).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://mcp.pangolinfo.com/mcp', method: 'POST' }));
    expect(z.request.mock.calls[0][0].headers.Authorization).toBe('Bearer test-key');
  });

  test('gets an Amazon product by ASIN', async () => {
    const z = makeZ({ code: 0, data: { taskId: 'task-1', json: [] } });
    const result = await App.creates.get_amazon_product.operation.perform(z, { ...auth, inputData: { asin: 'B0DYTF8L2W', site: 'amz_us' } });
    expect(result.id).toBe('task-1');
    expect(z.request.mock.calls[0][0].body.parserName).toBe('amzProductDetail');
  });

  test('returns bounded keyword search records with stable IDs', async () => {
    const z = makeZ({ pointCost: 5, data: { json: [{ data: { results: [{ asin: 'A1' }, { asin: 'A2' }] } }] } });
    const result = await App.searches.search_amazon_products.operation.perform(z, { ...auth, inputData: { keyword: 'coffee maker', site: 'amz_us', limit: 1 } });
    expect(result).toEqual([{ asin: 'A1', pointCost: 5, id: 'A1' }]);
  });

  test('caps review page count and returns reviews', async () => {
    const z = makeZ({ data: { json: [{ data: { results: [{ reviewId: 'R1' }] } }] } });
    const result = await App.searches.get_amazon_reviews.operation.perform(z, { ...auth, inputData: { asin: 'B0DYTF8L2W', site: 'amz_us', pageCount: 99, limit: 10 } });
    expect(z.request.mock.calls[0][0].body.bizContext.pageCount).toBe(10);
    expect(result[0].id).toBe('R1');
  });

  test('normalizes niche results', async () => {
    const z = makeZ({ data: { items: { data: [{ nicheId: 'N1', nicheTitle: 'Fans' }] } } });
    const result = await App.searches.filter_amazon_niches.operation.perform(z, { ...auth, inputData: { minSearchVolume: 10000, maxTop5BrandShare: 0.4, page: 1, size: 10, limit: 10 } });
    expect(result[0]).toEqual({ nicheId: 'N1', nicheTitle: 'Fans', id: 'N1' });
  });

  test('returns a sanitized error without response bodies or API keys', async () => {
    const z = makeZ({ message: 'Bearer test-key is invalid' }, 401);
    await expect(App.creates.get_amazon_product.operation.perform(z, { ...auth, inputData: { asin: 'B0DYTF8L2W', site: 'amz_us' } })).rejects.not.toThrow(/test-key/);
  });
});
