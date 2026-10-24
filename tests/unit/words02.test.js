const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const { validateLesson } = require('../../assets/core/lessonschema.js');
const { locate } = require('../../assets/core/locate.js');
const W = require('../../data/lesson02.words.js');

const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L02', f)) || pendingImgs.includes(f);

test('第 2 課字詞資料格式正確', () => { assert.deepEqual(validateWords(W), []); });
test('第 2 課 17 個生字都在課本語詞和生字語詞裡', () => {
  assert.equal(W.hanzi.map(h => h.char).join(''), '貼使醒隔準睡鐘效序而且排冰箱原條況');
  const words = W.vocab.map(v => v.word).join('');
  W.hanzi.forEach(h => assert.ok(words.includes(h.char), h.char));
  assert.equal(W.charwords.map(c => c.char).join(''), W.hanzi.map(h => h.char).join(''));
  W.hanzi.forEach(h => assert.ok(h.parts.length && h.story && h.sentence.includes(h.char), h.id));
});
test('第 2 課生字挖空、線索不說答案', () => {
  for (const h of W.hanzi) { assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id); assert.ok(!h.clue.includes(h.char), h.id); }
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id);
});
test('第 2 課圖片都在 images/L02，或列在待生成清單', () => {
  const p = W.phrase;
  const imgs = [...W.hanzi.map(h => h.img), ...W.vocab.map(v => v.img), ...W.charwords.map(c => c.img), ...W.idioms.map(x => x.situationImg),
    ...W.listen.flatMap(l => l.options.map(o => o.img)), p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img),
    p.phrase2.intro.img, ...p.phrase2.fill.map(x => x.img), ...W.pattern.flatMap(pt => [pt.img, ...pt.match.map(x => x.img), ...pt.conj.map(x => x.img)])];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 2 課句型：為了……、……，而且……，例句和拖拉句子都用到關聯詞', () => {
  assert.deepEqual(W.pattern.map(pt => pt.key), ['weile', 'erqie']);
  const S = require('../../assets/core/speechcheck.js');
  for (const pt of W.pattern) for (const t of pt.examples.concat(pt.conj.map(c => c.full))) assert.equal(S.check({ kind: 'pattern', key: pt.key }, t).status, 'pending', t);
});
test('第 2 課修辭：疊字、類疊，每關 2 題是不是、6 題選選看', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['redup', 'repeat']);
  for (const c of W.rhetoric.cards) {
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
});
test('第 2 課公開資料裡沒有課文原句', () => {
  const all = JSON.stringify(W);
  ['做事還是慢吞吞', '記不住還有什麼事情要完成', '貼在明顯的地方', '時時刻刻提醒自己', '全家人要在七點前出門', '為了能準時出門', '只要完成一件事就打個勾', '睡覺前還先設定好鬧鐘', '果然在七點前出門', '做事變得有次序', '都能按時完成計畫', '學會怎麼安排時間', '原來是小真寫的便條', '不由得笑了', '寫在空白的內頁', '種在肥沃的土地', '躺在舒服的床上', '坐在冰冷的地上', '說話變得有道理', '穿著變得有品味', '敘述變得有條理', '走路變得有自信', '陰沉沉的，不一會兒', '入夜後果然', '愛不釋手', '意猶未盡', '為了趕上公車', '到圖書館複習', '田徑賽', '為了保暖', '寬敞又舒適', '拼讀注音', '外表紅通通', '適得其反', '居然輕而易舉', '人生只有一次', '人心驚肉跳', '只有不怕冷的動物', '捨不得拆開'].forEach(t => assert.ok(!all.includes(t), t));
});
test('第 2 課課文原稿（有的話）格式正確、依據句找得到', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson02.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson02.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.paragraphs.length, 4);
  l.quiz.concat(l.testExtra, [l.storyMap.tail]).filter(q => !q.hints).forEach(q => assert.ok(locate(l, q.evidence).sentIds.length, q.id));
  l.storyMap.bones.forEach(b => assert.ok(locate(l, b.evidence).sentIds.length, b.id));
  const imgs = [l.storyMap.head.img, ...l.storyMap.bones.flatMap(b => b.cards.map(c => c.img)), ...l.storyMap.decoys.map(c => c.img),
    ...l.vocab.map(v => v.img), ...l.quiz.concat(l.testExtra).flatMap(q => q.options.map(o => o.img))];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
