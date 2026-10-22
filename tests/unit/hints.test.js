const test = require('node:test');
const assert = require('node:assert/strict');
const { create, pickWrong, result, mustTeach } = require('../../assets/core/hints.js');
const enabled = (s) => Array.from({ length: s.optionCount }, (_, i) => i).filter(i => s.disabled.indexOf(i) < 0);

test('no wrong is first', () => { assert.equal(result(create(4, 1)), 'first'); });
test('wrong 1 disables picked only', () => {
  const s = pickWrong(create(4, 2), 0);
  assert.deepEqual(s.disabled, [0]); assert.equal(result(s), 'hint1'); assert.equal(mustTeach(s), false);
});
test('never narrows to only the correct answer (4 options)', () => {
  let s = pickWrong(create(4, 2), 0); s = pickWrong(s, 1);
  assert.equal(enabled(s).length, 2); assert.equal(result(s), 'hint2');
  s = pickWrong(s, 3);
  assert.ok(enabled(s).length >= 2); assert.equal(mustTeach(s), true); assert.equal(result(s), 'taught');
});
test('two options: wrong pick stays enabled so the answer is not revealed', () => {
  const s = pickWrong(create(2, 0), 1);
  assert.deepEqual(enabled(s), [0, 1]); assert.equal(result(s), 'hint1');
});
test('three options: after two wrongs two remain', () => {
  let s = pickWrong(create(3, 0), 1); s = pickWrong(s, 2);
  assert.equal(enabled(s).length, 2);
});
test('picking correct index throws', () => { assert.throws(() => pickWrong(create(4, 2), 2)); });
test('re-picking a disabled option changes nothing', () => {
  const s = pickWrong(create(4, 2), 0); assert.equal(pickWrong(s, 0), s);
});
test('does not mutate input', () => { const s = create(4, 2); pickWrong(s, 0); assert.deepEqual(s.disabled, []); });
test('records wrong picks', () => {
  let s = pickWrong(create(4, 2), 3); s = pickWrong(s, 1); assert.deepEqual(s.wrongPicked, [3, 1]);
});
