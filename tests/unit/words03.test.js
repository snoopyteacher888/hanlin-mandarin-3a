const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const { validateLesson } = require('../../assets/core/lessonschema.js');
const { locate } = require('../../assets/core/locate.js');
const W = require('../../data/lesson03.words.js');

const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L03', f)) || pendingImgs.includes(f);

test('第 3 課字詞資料格式正確', () => { assert.deepEqual(validateWords(W), []); });
test('第 3 課 15 個生字都在課本語詞和生字語詞裡', () => {
  assert.equal(W.hanzi.map(h => h.char).join(''), '統票角板業本該喊文具理此餘備易');
  const words = W.vocab.map(v => v.word).join('');
  W.hanzi.forEach(h => assert.ok(words.includes(h.char), h.char));
  assert.equal(W.charwords.map(c => c.char).join(''), W.hanzi.map(h => h.char).join(''));
  W.hanzi.forEach(h => assert.ok(h.parts.length && h.story && h.sentence.includes(h.char), h.id));
});
test('第 3 課生字挖空、線索不說答案', () => {
  for (const h of W.hanzi) { assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id); assert.ok(!h.clue.includes(h.char), h.id); }
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id);
});
test('第 3 課圖片都在 images/L03，或列在待生成清單', () => {
  const p = W.phrase;
  const imgs = [...W.hanzi.map(h => h.img), ...W.vocab.map(v => v.img), ...W.charwords.map(c => c.img), ...W.idioms.map(x => x.situationImg),
    ...W.listen.flatMap(l => l.options.map(o => o.img)), p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img),
    p.phrase2.intro.img, ...p.phrase2.fill.map(x => x.img), ...W.pattern.flatMap(pt => [pt.img, ...pt.match.map(x => x.img), ...pt.conj.map(x => x.img)])];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 3 課句型：……，讓……、因為……所以……，例句和拖拉句子都用到關聯詞', () => {
  assert.deepEqual(W.pattern.map(pt => pt.key), ['rang', 'yinsuo']);
  const S = require('../../assets/core/speechcheck.js');
  for (const pt of W.pattern) for (const t of pt.examples.concat(pt.conj.map(c => c.full))) assert.equal(S.check({ kind: 'pattern', key: pt.key }, t).status, 'pending', t);
});
test('第 3 課修辭：疊字、設問、類疊，每關 2 題是不是、6 題選選看', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['redup', 'question', 'repeat']);
  for (const c of W.rhetoric.cards) {
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
});
test('第 3 課公開資料裡沒有課文原句', () => {
  const all = JSON.stringify(W);
  ['有趣的小統計', '三天內丟了四樣東西', '你丟了公車票', '你丟了筆跟三角板', '你還丟了作業本', '都是因為「匆忙」', '該上學去的時候', '我的公車票呢？我的筆呢？', '你總是那麼匆匆忙忙', '書本和文具都整理好', '到時候再說吧', '現在我得去睡覺了', '匆忙慌張的原因', '你是不計畫的', '全靠「到時候再說」', '我做事喜歡先計畫', '讓時間足夠、有餘', '都有足夠的時間回來拿', '不趕就不容易出錯', '你也試試看', '媽媽是不遲到的', '哥哥是不賴床的', '爸爸是不抽菸的', '假花是不凋謝的', '不做就不可能成功', '不玩就不會沉迷', '不買就不必花錢', '不想就不會生氣', '按住帽子', '看卡通節目', '來不及坐校車', '老師就要收考卷', '足夠的勇氣', '能力和經驗', '足夠的準備', '拒絕這個任務', '讓弟弟鼓起勇氣', '秋天的衣裳', '長得十分肥美', '陰晴不定', '總是會分心', '折疊傘', '忘了帶鑰匙', '忘了暖身', '藉由電話', '安居樂業的生活', '越弄越糟', '憂心不已', '談吐不俗', '合情合理'].forEach(t => assert.ok(!all.includes(t), t));
});
test('第 3 課課文原稿（有的話）格式正確、依據句找得到', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson03.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson03.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.paragraphs.length, 6);
  l.quiz.concat(l.testExtra, [l.storyMap.tail]).filter(q => !q.hints).forEach(q => assert.ok(locate(l, q.evidence).sentIds.length, q.id));
  l.storyMap.bones.forEach(b => assert.ok(locate(l, b.evidence).sentIds.length, b.id));
  const imgs = [l.storyMap.head.img, ...l.storyMap.bones.flatMap(b => b.cards.map(c => c.img)), ...l.storyMap.decoys.map(c => c.img),
    ...l.vocab.map(v => v.img), ...l.quiz.concat(l.testExtra).flatMap(q => q.options.map(o => o.img))];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
