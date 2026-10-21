const test = require('node:test');
const assert = require('node:assert/strict');
const { rng, shuffle, prepare, pickN } = require('../../assets/core/quizgen.js');

test('rng deterministic', () => { assert.equal(rng(3)(), rng(3)()); });
test('shuffle returns new array with same items', () => {
  const a = [1, 2, 3, 4, 5]; const b = shuffle(a, rng(9));
  assert.notEqual(a, b); assert.deepEqual([...b].sort(), a);
});
test('prepare keeps the correct option text', () => {
  const q = { id: 'q1', options: [{ text: 'a' }, { text: 'b' }, { text: 'c' }, { text: 'd' }], answer: 2 };
  for (let seed = 1; seed < 20; seed++) { const p = prepare(q, rng(seed)); assert.equal(p.options[p.answer].text, 'c'); }
  assert.equal(q.answer, 2);
});
test('pickN unique and sized', () => {
  const out = pickN([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 8, rng(1));
  assert.equal(out.length, 8); assert.equal(new Set(out).size, 8);
});
test('pickN with small pool', () => { assert.equal(pickN([1, 2], 8, rng(1)).length, 2); });
