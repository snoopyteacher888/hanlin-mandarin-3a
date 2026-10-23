const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const W = require('../../data/lesson06.words.js');

test('lesson06 words valid', () => { assert.deepEqual(validateWords(W), []); });
test('counts', () => {
  assert.equal(W.hanzi.length, 14); assert.equal(W.vocab.length, 12); assert.equal(W.similar.length, 11); assert.equal(W.listen.length, 8);
  assert.equal(W.hanzi.map(h => h.char).join(''), '墨製部芯斷機器凹槽入另治桿削');
});
test('all images exist', () => {
  const imgs = [...W.hanzi.map(h => h.img).filter(Boolean), ...W.vocab.map(v => v.img), ...W.listen.flatMap(l => l.options.map(o => o.img))];
  for (const f of imgs) assert.ok(fs.existsSync(path.join(__dirname, '../../images/L06', f)), f);
});
test('cloze plus char forms one of the words', () => {
  for (const h of W.hanzi) assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id);
});
test('clues never contain the answer character', () => {
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id + ': ' + s.clue);
  for (const h of W.hanzi) assert.ok(!h.clue.includes(h.char), h.id + ': ' + h.clue);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id + ': ' + v.example);
});

/* B 批新圖片：還沒上傳前，列在 docs/image-list.md 的「B 批（待生成）」就先放行 */
const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L06', f)) || pendingImgs.includes(f);

test('batch B counts', () => {
  const p = W.phrase;
  assert.equal(p.pick.length, 8); assert.equal(p.say.length, 2); assert.equal(p.choose.length, 4); assert.equal(p.make.length, 2);
  assert.deepEqual(p.words.map(x => x.word), ['混合', '斷裂']);
  assert.deepEqual(W.pattern.map(x => x.key), ['zhiyao', 'ruguo']);
  for (const pt of W.pattern) {
    assert.equal(pt.match.length, 3); assert.equal(pt.conj.length, 3); assert.equal(pt.half.length, 2); assert.equal(pt.whole.length, 1);
  }
  assert.deepEqual(W.rhetoric.cards.map(c => c.name), ['擬人', '譬喻', '疊字', '設問']);
  assert.equal(W.rhetoric.quiz.length, 8);
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
});
test('batch B images exist or are pending', () => {
  const p = W.phrase;
  const imgs = [p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img), ...W.pattern.map(x => x.img)];
  for (const f of imgs) assert.ok(imgOk(f), f);
});
test('batch B text has no textbook sentence', () => {
  const all = JSON.stringify([W.phrase, W.pattern, W.rhetoric.quiz]);
  ['直接拿筆芯來書寫', '輕輕的按一按', '一道道的凹槽', '幫忙解決問題了'].forEach(t => assert.ok(!all.includes(t), t));
});

test('rhetoric levels: show, 2 yes/no, picks with 2,2,3,3,4,4 options', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['personify', 'simile', 'redup', 'question']);
  for (const c of W.rhetoric.cards) {
    assert.ok(c.show && c.show.sentence && imgOk(c.show.img), c.key);
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
});
test('rhetoric level answers are unambiguous', () => {
  const AA = /([\u4e00-\u9fff])\1/;
  const card = k => W.rhetoric.cards.find(c => c.key === k);
  for (const p of card('redup').pick) { assert.ok(AA.test(p.options[0]), p.id); p.options.slice(1).forEach(o => assert.ok(!AA.test(o), p.id + ' ' + o)); }
  for (const p of card('question').pick) { assert.match(p.options[0], /？./, p.id); p.options.slice(1).forEach(o => assert.ok(!o.includes('？'), p.id + ' ' + o)); }
  for (const k of ['personify', 'simile']) for (const p of card(k).pick) {
    assert.ok(!AA.test(p.options[0]) && !p.options[0].includes('？'), p.id);
    if (k === 'simile') { assert.ok(p.options[0].includes('像'), p.id); p.options.slice(1).forEach(o => assert.ok(!o.includes('像'), p.id + ' ' + o)); }
  }
});

test('every revealed rhetoric answer has something to circle', () => {
  const Q = require('../../assets/core/wordq.js');
  for (const c of W.rhetoric.cards) {
    c.yesno.filter(y => y.answer).forEach(y => assert.ok(Q.rhetoricMarks(c.key, y.sentence, y.mark).length, y.id));
    c.pick.forEach(p => assert.ok(Q.rhetoricMarks(c.key, p.options[0], p.mark).length, p.id));
  }
  for (const x of W.rhetoric.quiz) {
    const c = W.rhetoric.cards.find(k => k.name === x.answer);
    assert.ok(Q.rhetoricMarks(c.key, x.sentence, x.mark).length, x.id);
  }
  const all = [].concat(...W.rhetoric.cards.map(c => c.yesno.concat(c.pick)), W.rhetoric.quiz);
  all.filter(x => x.mark).forEach(x => x.mark.forEach(m => assert.ok((x.sentence || x.options[0]).includes(m), x.id + ' ' + m)));
});
