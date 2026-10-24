const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const { validateLesson } = require('../../assets/core/lessonschema.js');
const { locate } = require('../../assets/core/locate.js');
const W = require('../../data/lesson09.words.js');

const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L09', f)) || pendingImgs.includes(f);

test('第 9 課字詞資料格式正確', () => { assert.deepEqual(validateWords(W), []); });
test('第 9 課 13 個生字都在課本語詞和生字語詞裡', () => {
  assert.equal(W.hanzi.map(h => h.char).join(''), '挑戰交隨導鳳投繼續淺岸沿踩疊般');
  const words = W.vocab.map(v => v.word).join('');
  W.hanzi.forEach(h => assert.ok(words.includes(h.char), h.char));
  assert.equal(W.charwords.map(c => c.char).join(''), W.hanzi.map(h => h.char).join(''));
  W.hanzi.forEach(h => assert.ok(h.parts.length && h.story && h.sentence.includes(h.char), h.id));
});
test('第 9 課生字挖空、線索不說答案', () => {
  for (const h of W.hanzi) { assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id); assert.ok(!h.clue.includes(h.char), h.id); }
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id);
});
test('第 9 課圖片都在 images/L09，或列在待生成清單', () => {
  const p = W.phrase;
  const imgs = [...W.hanzi.map(h => h.img), ...W.vocab.map(v => v.img), ...W.charwords.map(c => c.img), ...W.idioms.map(x => x.situationImg),
    ...W.listen.flatMap(l => l.options.map(o => o.img)), p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img),
    p.phrase2.intro.img, ...p.phrase2.fill.map(x => x.img), ...W.pattern.flatMap(pt => [pt.img, ...pt.match.map(x => x.img), ...pt.conj.map(x => x.img)])];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 9 課句型：……才……、一邊……一邊……，例句和拖拉句子都用到關聯詞', () => {
  assert.deepEqual(W.pattern.map(pt => pt.key), ['cai', 'yibian']);
  const S = require('../../assets/core/speechcheck.js');
  for (const pt of W.pattern) for (const t of pt.examples.concat(pt.conj.map(c => c.full))) assert.equal(S.check({ kind: 'pattern', key: pt.key }, t).status, 'pending', t);
});
test('第 9 課修辭：擬人、疊字、類疊，每關 2 題是不是、6 題選選看', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['personify', 'redup', 'repeat']);
  for (const c of W.rhetoric.cards) {
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
});
test('第 9 課公開資料裡沒有課文原句', () => {
  const all = JSON.stringify(W);
  ['挑戰了著名的阿塱壹古道', '弟弟指著前方的樹叢', '前方好像沒路了，走近一看才發現還有木棧道', '海水的顏色由天邊深深的藍',
    '浪花一曲曲輕唱', '我們一聲聲歡笑', '踩著大大小小的石頭', '一邊是山，一邊是海', '美石、美景才能長久'].forEach(t => assert.ok(!all.includes(t), t));
});
test('第 9 課課文原稿（有的話）格式正確、依據句找得到', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson09.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson09.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.paragraphs.length, 4);
  l.quiz.concat(l.testExtra, [l.storyMap.tail]).filter(q => !q.hints).forEach(q => assert.ok(locate(l, q.evidence).sentIds.length, q.id));
  l.storyMap.bones.forEach(b => assert.ok(locate(l, b.evidence).sentIds.length, b.id));
  const imgs = [l.storyMap.head.img, ...l.storyMap.bones.flatMap(b => b.cards.map(c => c.img)), ...l.storyMap.decoys.map(c => c.img),
    ...l.vocab.map(v => v.img), ...l.quiz.concat(l.testExtra).flatMap(q => q.options.map(o => o.img))];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
