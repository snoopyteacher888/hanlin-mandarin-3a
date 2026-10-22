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
