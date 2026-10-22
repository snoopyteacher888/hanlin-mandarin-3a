const test = require('node:test');
const assert = require('node:assert/strict');
const Q = require('../../assets/core/wordq.js');
const { rng } = require('../../assets/core/quizgen.js');
const W = require('../fixtures/words.fake.js');

test('hanzi question uses big char options and correct answer', () => {
  const q = Q.hanziQuestion(W.hanzi[0], rng(1));
  assert.equal(q.id, 'h-杯'); assert.equal(q.prompt, '＿子'); assert.equal(q.autoSay, '杯，杯子的杯');
  assert.equal(q.options[q.answer].text, '杯'); assert.ok(q.options.every(o => o.big && !o.img));
  assert.equal(q.hint, '仔細看，左邊是木'); assert.equal(q.img, 'cup.png');
});
test('vocab pic question shows picture prompt', () => {
  const q = Q.vocabQuestion(W.vocab[0], 'pic', rng(2));
  assert.equal(q.img, 'glass.png'); assert.equal(q.options[q.answer].text, '玻璃'); assert.ok(!q.autoSay);
});
test('vocab meaning question speaks the meaning', () => {
  const q = Q.vocabQuestion(W.vocab[0], 'meaning', rng(2));
  assert.equal(q.autoSay, '透明、容易破的材料。'); assert.ok(!q.img); assert.equal(q.options[q.answer].text, '玻璃');
});
test('similar question', () => {
  const q = Q.similarQuestion(W.similar[0], rng(3));
  assert.equal(q.prompt, '我用＿子喝水。'); assert.equal(q.options[q.answer].text, '杯'); assert.ok(q.options.every(o => o.big));
  assert.equal(q.say, '我用杯子喝水。');
});
test('listen question hides text and repeats on wrong', () => {
  const q = Q.listenQuestion(W.listen[0], rng(4));
  assert.equal(q.hideText, true); assert.equal(q.autoSay, '我用杯子裝水。'); assert.equal(q.hint, '我用杯子裝水。');
  assert.equal(q.options[q.answer].text, '杯子'); assert.ok(q.options[0].img);
});
test('findWordQuestion finds every kind', () => {
  for (const id of ['h-杯', 'v-玻璃', 's1', 'l1']) assert.equal(Q.findWordQuestion(W, id, rng(5)).id, id);
  assert.equal(Q.findWordQuestion(W, 'q1', rng(5)), null);
});
