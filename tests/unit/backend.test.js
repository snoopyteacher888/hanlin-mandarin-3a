const test = require('node:test');
const assert = require('node:assert/strict');
const B = require('../../backend/Code.gs');

const rec = (o = {}) => Object.assign({ id: 'r1', ts: '2026-10-21T11:00:00.000Z', student: 'bear', place: 'home', lesson: 'L06', activity: 'quiz',
  items: [{ q: 'q1', result: 'first', wrong: [] }], firstTryRate: 1, score: null, stars: 3, durationSec: 60 }, o);

test('valid record passes', () => { assert.equal(B.validateRecord(rec()), null); });
test('invalid activity rejected', () => { assert.ok(B.validateRecord(rec({ activity: 'hack' }))); });
test('long student rejected', () => { assert.ok(B.validateRecord(rec({ student: 'x'.repeat(21) }))); });
test('too many items rejected', () => { assert.ok(B.validateRecord(rec({ items: new Array(51).fill({ q: 'q1', result: 'first', wrong: [] }) }))); });
test('missing id rejected', () => { assert.ok(B.validateRecord(rec({ id: '' }))); });

test('locks after 5 failures for 15 minutes', () => {
  let p = { fails: 0, lockedUntil: 0 }; const now = 1000000;
  for (let i = 0; i < 4; i++) p = B.registerFail(p, now);
  assert.equal(B.lockState(p, now).locked, false);
  p = B.registerFail(p, now);
  assert.equal(B.lockState(p, now).locked, true);
  assert.equal(B.lockState(p, now + 15 * 60 * 1000 - 1).locked, true);
  assert.equal(B.lockState(p, now + 15 * 60 * 1000).locked, false);
});

function fakeSheet() { const rows = []; return { rows, ids: () => rows.map(r => r[0]), append: r => rows.push(r) }; }
test('submit is idempotent by id', () => {
  const s = fakeSheet();
  assert.deepEqual(B.submitRecord(s, rec()), { ok: true });
  assert.deepEqual(B.submitRecord(s, rec()), { ok: true, dup: true });
  assert.equal(s.rows.length, 1);
});
test('row round trip', () => { assert.deepEqual(B.fromRow(B.toRow(rec())), rec()); });

test('filterRecords by student, activity, since', () => {
  const rows = [rec({ id: 'a', ts: '2026-10-01T00:00:00Z' }), rec({ id: 'b', student: 'cat' }), rec({ id: 'c', activity: 'map' })];
  assert.deepEqual(B.filterRecords(rows, { student: 'bear' }).map(r => r.id).sort(), ['a', 'c']);
  assert.deepEqual(B.filterRecords(rows, { activity: 'map' }).map(r => r.id), ['c']);
  assert.deepEqual(B.filterRecords(rows, { since: '2026-10-20T00:00:00Z' }).map(r => r.id).sort(), ['b', 'c']);
});
test('validateRoster', () => {
  assert.equal(B.validateRoster([{ id: 'bear', emoji: '🐻', name: '小熊' }]), null);
  assert.ok(B.validateRoster([{ id: 'Bad Id!', emoji: '🐻', name: '小熊' }]));
  assert.ok(B.validateRoster([{ id: 'a', emoji: '🐻', name: 'x' }, { id: 'a', emoji: '🐱', name: 'y' }]));
});
