const test = require('node:test');
const assert = require('node:assert/strict');
const Q = require('../../assets/core/wordq.js');
const { rng } = require('../../assets/core/quizgen.js');
const W = require('../fixtures/words.fake.js');
const leaks = (q) => [q.hints.h1, q.hints.h2].some(h => h.text.includes('「' + q.options[q.answer].text + '」'));

test('hanzi question: big options, ladder without the answer', () => {
  const q = Q.hanziQuestion(W.hanzi[0], rng(1));
  assert.equal(q.options[q.answer].text, '杯'); assert.ok(q.options.every(o => o.big && !o.img));
  assert.equal(q.hints.h1.say, '杯，杯子的杯'); assert.equal(q.hints.h2.text, '提示：這個字跟木頭有關');
  assert.match(q.hints.teach.text, /答案是「杯」/); assert.ok(!leaks(q));
});
test('vocab pic: h1 asks to look again, h2 gives example sentence', () => {
  const q = Q.vocabQuestion(W.vocab[0], 'pic', rng(2));
  assert.equal(q.img, 'glass.png'); assert.equal(q.hints.h2.text, '提示：窗戶是用＿＿做的。');
  assert.match(q.hints.teach.text, /答案是「玻璃」/); assert.ok(!leaks(q));
});
test('vocab meaning: h1 repeats meaning', () => {
  const q = Q.vocabQuestion(W.vocab[0], 'meaning', rng(2));
  assert.equal(q.autoSay, '透明、容易破的材料。'); assert.equal(q.hints.h1.text, '提示：透明、容易破的材料。'); assert.equal(q.hints.h1.say, '透明、容易破的材料。'); assert.ok(!leaks(q));
});
test('similar: h1 reads sentence with blank, h2 clue, teach explains', () => {
  const q = Q.similarQuestion(W.similar[0], rng(3));
  assert.equal(q.options[q.answer].text, '杯'); assert.equal(q.hints.h2.text, '提示：裝水的東西，跟木頭有關。');
  assert.equal(q.hints.teach.text, '答案是「杯」，「杯子」的杯左邊是木。');
  assert.ok(!q.hints.h1.say.includes('杯子')); assert.ok(!q.say.includes('杯子'));
});
test('listen: hides text, h1 repeats, h2 shows text slowly, teach explains', () => {
  const q = Q.listenQuestion(W.listen[0], rng(4));
  assert.equal(q.hideText, true); assert.equal(q.hints.h1.say, '我用杯子裝水。');
  assert.equal(q.hints.h2.showText, true); assert.match(q.hints.teach.text, /答案是「杯子」/);
});
test('findWordQuestion finds every kind', () => {
  for (const id of ['h-杯', 'v-玻璃', 's1', 'l1']) assert.equal(Q.findWordQuestion(W, id, rng(5)).id, id);
  assert.equal(Q.findWordQuestion(W, 'q1', rng(5)), null);
});
test('readingHints points to paragraph, highlights, then teaches with evidence', () => {
  const lesson = { paragraphs: [{ sentences: [{ id: 'p1s1', text: '甲。' }] }, { sentences: [{ id: 'p2s1', text: '水杯可以裝水。' }] }] };
  const h = Q.readingHints(lesson, { options: [{ text: '裝水' }], answer: 0, evidence: '水杯可以裝水。' });
  assert.equal(h.h1.text, '再想想看。答案在課文第 2 段。'); assert.deepEqual(h.h1.para, { paras: [2], sentIds: ['p2s1'], highlight: false });
  assert.equal(h.h2.para.highlight, true);
  assert.equal(h.teach.text, '答案是「裝水」。因為課文說：「水杯可以裝水。」');
});
