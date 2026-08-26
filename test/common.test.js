'use strict';

const { getNicheResults, getParserResults, withSearchIds } = require('../lib/common');

describe('response normalization', () => {
  test('flattens Pangolinfo parser results', () => {
    const payload = { data: { json: [{ data: { results: [{ asin: 'A' }, { asin: 'B' }] } }, { data: { results: [{ asin: 'C' }] } }] } };
    expect(getParserResults(payload)).toEqual([{ asin: 'A' }, { asin: 'B' }, { asin: 'C' }]);
  });

  test('supports the documented nested niche envelope', () => {
    expect(getNicheResults({ data: { items: { data: [{ nicheId: 'n1' }] } } })).toEqual([{ nicheId: 'n1' }]);
  });

  test('adds stable string IDs and enforces a limit', () => {
    const rows = withSearchIds([{ asin: 'A' }, { asin: 'B' }], 'row', ['asin'], 1, { pointCost: 5 });
    expect(rows).toEqual([{ asin: 'A', pointCost: 5, id: 'A' }]);
  });
});
