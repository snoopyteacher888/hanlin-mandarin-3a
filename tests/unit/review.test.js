const test = require('node:test');
const assert = require('node:assert/strict');
const { addMiss, due, recordReview, todayStr } = require('../../assets/core/review.js');

test('due only after a calendar day', () => {
  const q = addMiss({}, 'q5', '2026-10-21');
  assert.deepEqual(due(q, '2026-10-21'), []); assert.deepEqual(due(q, '2026-10-22'), ['q5']);
});
test('removed after 2 consecutive first-try in review', () => {
  let q = addMiss({}, 'q5', '2026-10-21');
  q = recordReview(q, 'q5', true, '2026-10-22'); assert.ok(q.q5);
  q = recordReview(q, 'q5', true, '2026-10-23'); assert.equal(q.q5, undefined);
});
test('wrong in review resets streak', () => {
  let q = recordReview(addMiss({}, 'q5', '2026-10-21'), 'q5', true, '2026-10-22');
  q = recordReview(q, 'q5', false, '2026-10-23'); assert.equal(q.q5.streak, 0);
});
test('missing again resets streak', () => {
  let q = recordReview(addMiss({}, 'q5', '2026-10-21'), 'q5', true, '2026-10-22');
  q = addMiss(q, 'q5', '2026-10-23'); assert.deepEqual(q.q5, { last: '2026-10-23', streak: 0 });
});
test('does not mutate input', () => {
  const q = {}; addMiss(q, 'q1', '2026-10-21'); assert.deepEqual(q, {});
});
test('todayStr uses local date', () => {
  assert.equal(todayStr(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
});
