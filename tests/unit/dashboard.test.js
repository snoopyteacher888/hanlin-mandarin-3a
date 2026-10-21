const test = require('node:test');
const assert = require('node:assert/strict');
const { topMissed, sinceFor } = require('../../assets/core/dashboard.js');

const r = items => ({ items });
test('topMissed counts non-first results, sorted', () => {
  const recs = [r([{ q: 'q1', result: 'hint1' }, { q: 'q2', result: 'first' }]), r([{ q: 'q1', result: 'wrong' }, { q: 'q3', result: 'hint2' }])];
  assert.deepEqual(topMissed(recs, 5), [{ q: 'q1', count: 2 }, { q: 'q3', count: 1 }]);
});
test('topMissed limits', () => {
  const recs = [r([{ q: 'a', result: 'hint1' }, { q: 'b', result: 'hint1' }, { q: 'c', result: 'hint1' }])];
  assert.equal(topMissed(recs, 2).length, 2);
});
test('sinceFor today/week/all', () => {
  const now = new Date(2026, 9, 21, 15, 0);
  assert.equal(sinceFor('today', now), new Date(2026, 9, 21).toISOString());
  assert.equal(sinceFor('week', now), new Date(2026, 9, 14, 15, 0).toISOString());
  assert.equal(sinceFor('all', now), undefined);
});
