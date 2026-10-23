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

test('phrase pick question: blank then noun, answer is first option', () => {
  const q = Q.phrasePickQuestion(W.phrase.pick[0], rng(2));
  assert.equal(q.prompt, '＿＿＿的杯子'); assert.equal(q.img, 'cup.png');
  assert.equal(q.options[q.answer].text, '亮晶晶'); assert.ok(!leaks(q)); assert.match(q.hints.teach.text, /亮晶晶/);
});
test('choose question: answer is first sentence', () => {
  const q = Q.chooseQuestion(W.phrase.choose[0], rng(3));
  assert.equal(q.options[q.answer].text, '杯子裡裝滿了水。'); assert.match(q.prompt, /「裝滿」/); assert.equal(q.options.length, 2);
});
test('match question: front shown, answer is first option', () => {
  const q = Q.matchQuestion(W.pattern[0].match[0], rng(4));
  assert.equal(q.prompt, '只要你把杯子洗乾淨，……'); assert.equal(q.options[q.answer].text, '就能裝果汁了。');
});
test('conj question: blanks spoken as 什麼', () => {
  const q = Q.conjQuestion(W.pattern[0].conj[0], rng(5));
  assert.equal(q.options[q.answer].text, '只要……就……'); assert.ok(!q.say.includes('＿')); assert.ok(!leaks(q));
});
test('rhetoric options are plain text', () => {
  const q = Q.rhetoricQuestion(W.rhetoric.quiz[0], W.rhetoric.cards, rng(6));
  assert.equal(q.options.length, 4); assert.ok(q.options.every(o => !o.icon && !o.img));
  assert.equal(q.options[q.answer].text, '擬人'); assert.equal(q.autoSay, W.rhetoric.quiz[0].sentence); assert.ok(!leaks(q));
});
test('speak question has rule and hints', () => {
  const q = Q.speakQuestion(W.pattern[0].half[0], { kind: 'pattern', key: 'zhiyao', front: '只要我每天練習，' }, '把句子說完');
  assert.equal(q.type, 'speak'); assert.equal(q.front, '只要我每天練習，'); assert.equal(q.rule.key, 'zhiyao');
  assert.match(q.hints.h1.text, /只要/); assert.equal(q.hints.h2.text, W.pattern[0].half[0].clue); assert.match(q.hints.teach.text, /就會越來越厲害/);
});
test('findWordQuestion finds rh and pt match', () => {
  assert.equal(Q.findWordQuestion(W, 'rh1', rng(1)).options.length, 4);
  assert.equal(Q.findWordQuestion(W, 'pt-zy-m1', rng(1)).id, 'pt-zy-m1');
  assert.equal(Q.findWordQuestion(W, 'pt-zy-c1', rng(1)).id, 'pt-zy-c1');
  assert.equal(Q.findWordQuestion(W, 'ph1', rng(1)).id, 'ph1');
  assert.equal(Q.findWordQuestion(W, 'pw1', rng(1)).id, 'pw1');
});
test('findWordQuestion skips speak ids', () => {
  ['ps1', 'pm1', 'pt-zy-h1', 'pt-zy-w1'].forEach(id => assert.equal(Q.findWordQuestion(W, id, rng(1)), null));
});
test('sentence options are shown as a one-column list', () => {
  assert.equal(Q.chooseQuestion(W.phrase.choose[0], rng(1)).list, true);
  assert.equal(Q.matchQuestion(W.pattern[0].match[0], rng(1)).list, true);
  assert.equal(Q.conjQuestion(W.pattern[0].conj[0], rng(1)).list, true);
  assert.ok(!Q.phrasePickQuestion(W.phrase.pick[0], rng(1)).list);
});
test('patternClauses splits condition and results and marks conjunctions', () => {
  const c = Q.patternClauses('只要多喝水，身體就會更健康。', 'zhiyao');
  assert.deepEqual(c.map(x => x.kind), ['cond', 'res1']);
  assert.deepEqual(c[0].parts, [{ text: '只要', conj: true }, { text: '多喝水，', conj: false }]);
  assert.deepEqual(c[1].parts, [{ text: '身體', conj: false }, { text: '就', conj: true }, { text: '會更健康。', conj: false }]);
  const r = Q.patternClauses('如果你不吃早餐，不但肚子會餓，上課還會沒精神。', 'ruguo');
  assert.deepEqual(r.map(x => x.kind), ['cond', 'res1', 'res2']);
  assert.equal(r.map(x => x.parts.map(p => p.text).join('')).join(''), '如果你不吃早餐，不但肚子會餓，上課還會沒精神。');
  const s = Q.patternClauses('妹妹只要聽到音樂，就會開心的跳舞。', 'zhiyao');
  assert.deepEqual(s[0].parts[0], { text: '妹妹', conj: false });
});
test('match and conj questions carry pattern colors', () => {
  const m = Q.matchQuestion(W.pattern[0].match[0], rng(1));
  assert.equal(m.promptClass, 'pt-cond'); assert.equal(m.optionsClass, 'pt-res');
  assert.equal(Q.conjQuestion(W.pattern[0].conj[0], rng(1)).optionsClass, 'pt-conj');
});
