const test = require('node:test');
const assert = require('node:assert/strict');
const { create, pickWrong, result } = require('../../assets/core/hints.js');
const enabled = (s) => Array.from({ length: s.optionCount }, (_, i) => i).filter(i => s.disabled.indexOf(i) < 0);

test('no wrong is first', () => { assert.equal(result(create(4, 1)), 'first'); });
test('wrong 1 disables picked only', () => {
  const s = pickWrong(create(4, 2), 0, () => 0);
  assert.deepEqual(s.disabled, [0]); assert.equal(result(s), 'hint1');
});
test('wrong 2 leaves correct plus one wrong', () => {
  let s = pickWrong(create(4, 2), 0, () => 0); s = pickWrong(s, 1, () => 0);
  assert.equal(enabled(s).length, 2); assert.ok(enabled(s).indexOf(2) >= 0); assert.equal(result(s), 'hint2');
});
test('wrong 3 leaves only correct (7 options for map)', () => {
  let s = create(7, 4);
  for (let k = 0; k < 3; k++) s = pickWrong(s, enabled(s).find(i => i !== 4), Math.random);
  assert.equal(s.wrongCount, 3);
  assert.deepEqual(enabled(s), [4]);
});
test('picking correct index throws', () => { assert.throws(() => pickWrong(create(4, 2), 2, Math.random)); });
test('re-picking a disabled option changes nothing', () => {
  const s = pickWrong(create(4, 2), 0, () => 0);
  assert.equal(pickWrong(s, 0, () => 0), s);
});
test('does not mutate input', () => {
  const s = create(4, 2); pickWrong(s, 0, () => 0); assert.deepEqual(s.disabled, []);
});
test('records wrong picks', () => {
  let s = pickWrong(create(4, 2), 3, () => 0); s = pickWrong(s, 1, () => 0);
  assert.deepEqual(s.wrongPicked, [3, 1]);
});
