// 端對端測試：用虛構的 fake06 課次（密碼 test-pass）跑主要流程
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { start } = require('./server.js');

const PORT = 8181, BASE = `http://localhost:${PORT}/`;
const ANSWERS = { '小水杯是用什麼做的？': '玻璃', '水杯可以做什麼？': '裝水', '做杯子要先做什麼？': '把沙子燒熱', '吹成杯子之前要做什麼？': '把沙子燒熱' };
let srv, browser;

test.before(async () => {
  srv = await start(PORT);
  browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', headless: false, args: ['--headless=new'] });
});
test.after(async () => { await browser.close(); await srv.close(); });

async function page(init) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  p.errors = []; p.on('pageerror', e => p.errors.push(e.message));
  await p.addInitScript(() => {
    /* 大部分測試關掉注音，比對文字比較單純；注音另有專門測試 */
    try { const st = JSON.parse(localStorage.getItem('h3a.settings') || '{}'); if (!('zhuyin' in st)) { st.zhuyin = false; localStorage.setItem('h3a.settings', JSON.stringify(st)); } } catch (e) {}
    window.__spoken = [];
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { getVoices: () => [{ lang: 'zh-TW', name: 'Mei-Jia' }], cancel() {},
      speak(u) { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 5); } } });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: function (t) { this.text = t; } });
  });
  if (init) await p.addInitScript(init);
  return p;
}
async function unlock(p, hash) {
  await p.goto(BASE + hash);
  await p.fill('input[type=password]', 'test-pass'); await p.click('button[type=submit]');
}
const answerIndex = p => p.evaluate(map => {
  const t = document.querySelector('.prompt h2').textContent;
  return [...document.querySelectorAll('.option')].findIndex(o => o.querySelector('.option-text').textContent === map[t]);
}, ANSWERS);
const enabled = p => p.$$eval('.option:not(:disabled)', x => x.map(o => +o.dataset.index));
const submits = () => srv.posts.filter(x => x.action === 'submit').map(x => x.record);

test('unlock with test-pass', async () => {
  const p = await page();
  await p.goto(BASE + '#/L06/quiz?s=bear');
  await p.fill('input[type=password]', 'nope'); await p.click('button[type=submit]');
  await p.waitForFunction(() => document.querySelector('.error').textContent === '密碼不對，請問老師');
  await p.fill('input[type=password]', 'test-pass'); await p.click('button[type=submit]');
  await p.waitForSelector('.option');
  assert.deepEqual(p.errors, []);
});

test('quiz hints never reveal the answer, then teach', async () => {
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear'); await p.waitForSelector('.option');
  const a = await answerIndex(p);
  const answerText = await p.$eval(`.option[data-index="${a}"] .option-text`, e => e.textContent);
  let en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.match(await p.textContent('.feedback'), /答案在課文第 1 段/);
  assert.ok(!(await p.innerText('.feedback')).includes(answerText));
  assert.equal(await p.$eval('.btn-next', b => b.hidden), true);
  en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.ok((await enabled(p)).length >= 2);
  assert.ok(await p.$('.hint-para .sent.glow'));
  en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.match(await p.textContent('.feedback'), /老師教你/);
  assert.match(await p.textContent('.feedback'), new RegExp('答案是「' + answerText + '」'));
  await p.click('text=我懂了');
  await p.waitForFunction(() => document.querySelectorAll('.dot.done').length === 1);
});

test('double tap advances once', async () => {
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear'); await p.waitForSelector('.option');
  await p.click(`.option[data-index="${await answerIndex(p)}"]`);
  await p.dblclick('.btn-next');
  assert.equal(await p.$$eval('.dot.done', x => x.length), 1);
});

test('fishbone map', async () => {
  const p = await page(); await unlock(p, '#/L06/map?s=cat'); await p.waitForSelector('.map-card');
  await p.click('.map-card[data-card="c-lead"]');
  assert.equal(await p.$$eval('.map-card.is-off', x => x.length), 1);
  await p.waitForFunction(() => window.__spoken.some(s => s.includes('這張卡跟')));
  for (const id of ['c-sand', 'c-fire']) await p.click(`.map-card[data-card="${id}"]`);
  await p.waitForSelector('.bone-box[data-bone="b2"].now');
  await p.click('.map-card[data-card="c-blow"]');
  await p.waitForSelector('.bone-box[data-bone="b3"].now');
  await p.click('.map-card[data-card="c-water"]');
  await p.waitForSelector('.fish-tail-box.now');
  const idx = await p.$$eval('.map-card .option-text', x => x.findIndex(e => e.textContent === '水杯可以裝水'));
  await p.click(`.map-card[data-card="opt${idx}"]`);
  await p.waitForSelector('.fish.complete');
  await p.click('.btn-next'); await p.waitForSelector('.result');
  assert.equal(await p.textContent('.result p'), '第一次就答對 3 題，共 4 題');
  assert.deepEqual(p.errors, []);
});

test('record posted with student from link', async () => {
  const before = submits().length;
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear');
  for (let k = 0; k < 3; k++) { await p.waitForSelector('.option:not(:disabled)'); await p.click(`.option[data-index="${await answerIndex(p)}"]`); await p.click('.btn-next'); }
  await p.waitForSelector('.result');
  for (let i = 0; i < 20 && submits().length === before; i++) await p.waitForTimeout(50);
  const r = submits().at(-1);
  assert.equal(r.student, 'bear'); assert.equal(r.place, 'home'); assert.equal(r.activity, 'quiz'); assert.equal(r.stars, 3);
});

test('unknown student id shows picker', async () => {
  const p = await page(); await p.goto(BASE + '#/L06?s=ghost');
  await p.waitForSelector('.picker-card');
  assert.deepEqual(await p.$$eval('.picker-card', x => x.map(c => c.dataset.student)), ['bear', 'cat']);
});

test('class mode records class', async () => {
  const before = submits().length;
  const p = await page(() => localStorage.setItem('h3a.settings', JSON.stringify({ mode: 'class', zhuyin: false })));
  await unlock(p, '#/L06/read?s=bear');
  await p.click('text=我讀完了'); await p.waitForSelector('.result');
  for (let i = 0; i < 20 && submits().length === before; i++) await p.waitForTimeout(50);
  const r = submits().at(-1);
  assert.equal(r.student, 'class'); assert.equal(r.place, 'school');
});

test('review card appears next day', async () => {
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear'); await p.waitForSelector('.option');
  const a = await answerIndex(p);
  await p.click(`.option[data-index="${(await enabled(p)).find(i => i !== a)}"]`);
  await p.click(`.option[data-index="${a}"]`); await p.click('.btn-next');
  for (let k = 0; k < 2; k++) { await p.waitForSelector('.option:not(:disabled)'); await p.click(`.option[data-index="${await answerIndex(p)}"]`); await p.click('.btn-next'); }
  await p.waitForSelector('.result');
  await p.goto(BASE + '#/L06'); await p.waitForSelector('.activity-main');
  assert.equal(await p.$('.activity-main[data-activity="review"]'), null);
  await p.evaluate(() => { const q = JSON.parse(localStorage.getItem('h3a.review.bear')); for (const k in q) q[k].last = '2000-01-01'; localStorage.setItem('h3a.review.bear', JSON.stringify(q)); });
  await p.reload(); await p.waitForSelector('.activity-main');
  assert.equal(await p.textContent('.activity-main[data-activity="review"] .activity-extra'), '1 題');
});

test('voice bar when only non-Taiwan voice', async () => {
  const ctx = await browser.newContext(); const p = await ctx.newPage();
  await p.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { getVoices: () => [{ lang: 'zh-CN', name: 'Tingting' }], cancel() {}, speak() {} } });
  });
  await p.goto(BASE + '#/');
  assert.match(await p.textContent('.voice-bar'), /沒有台灣口音/);
});

/* ---------- 字詞練習 ---------- */
const WORDS = require('../../data/lesson06.words.js');

test('word practice works without unlock', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/hanzi?s=bear');
  await p.waitForSelector('.hanzi-card');
  assert.equal(await p.$$eval('.hanzi-card', x => x.length), 14);
  assert.equal(await p.$('input[type=password]'), null);
  await p.click('text=開始練習'); await p.waitForSelector('.option.big');
  assert.equal(await p.$$eval('.option.big', x => x.length), 4);
  assert.equal(await p.$$eval('.option.big .pic', x => x.length), 0);
});

test('hanzi card shows zhuyin and radical', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/hanzi?s=bear'); await p.waitForSelector('.hanzi-card');
  await p.click('.hanzi-card[data-id="h-芯"]');
  const t = await p.textContent('.hanzi-detail');
  assert.match(t, /ㄒㄧㄣ/); assert.match(t, /部首：艸/); assert.match(t, /8 畫/);
  assert.equal(await p.getAttribute('.stroke-link', 'href'), 'https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=33455&la=0');
  await p.evaluate(() => { location.hash = '#/L06'; }); await p.waitForSelector('.activity-main');
  assert.equal(await p.$('.vocab-pop'), null);
});

test('listen hides text and repeats on wrong', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/listen?s=bear'); await p.waitForSelector('.option');
  assert.equal(await p.$eval('.prompt h2', e => e.hidden), true);
  const text = await p.$eval('.prompt h2', e => e.textContent);
  const item = WORDS.listen.find(l => l.text === text);
  const right = item.options[item.answer].text;
  const wrongIdx = await p.$$eval('.option .option-text', (x, r) => x.findIndex(e => e.textContent !== r), right);
  await p.click(`.option[data-index="${wrongIdx}"]`);
  await p.waitForFunction(t => window.__spoken.filter(s => s === window.H3A.ttsLib.fixSay(t)).length >= 2, text);
  await p.click('text=看文字');
  assert.equal(await p.$eval('.prompt h2', e => e.hidden), false);
});

test('similar wrong shows hint', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/similar?s=bear'); await p.waitForSelector('.option.big');
  const sentence = await p.textContent('.prompt h2');
  const item = WORDS.similar.find(s => s.sentence === sentence);
  const wrongIdx = await p.$$eval('.option .option-text', (x, a) => x.findIndex(e => e.textContent !== a), item.answer);
  await p.click(`.option[data-index="${wrongIdx}"]`);
  assert.match(await p.textContent('.feedback'), /再讀一次句子/);
  assert.ok(!(await p.textContent('.feedback')).includes(item.answer));
  const second = await p.$$eval('.option:not(:disabled) .option-text', (x, a) => x.find(e => e.textContent !== a).closest('.option').dataset.index, item.answer);
  await p.click(`.option[data-index="${second}"]`);
  assert.equal(await p.textContent('.feedback .hint-text'), item.clue);
});

test('review without unlock shows word items only', async () => {
  const p = await page(() => localStorage.setItem('h3a.review.bear', JSON.stringify({ q1: { last: '2000-01-01', streak: 0 }, s1: { last: '2000-01-01', streak: 0 } })));
  await p.goto(BASE + '#/L06/review?s=bear'); await p.waitForSelector('.option');
  assert.equal(await p.$$eval('.dot', x => x.length), 1);
  assert.equal(await p.textContent('.prompt h2'), WORDS.similar[0].sentence);
});

test('word record posted with activity similar', async () => {
  const before = submits().length;
  const p = await page(); await p.goto(BASE + '#/L06/similar?s=cat');
  for (let k = 0; k < WORDS.similar.length; k++) {
    await p.waitForSelector('.option.big:not(:disabled)');
    const sentence = await p.textContent('.prompt h2');
    const ans = WORDS.similar.find(s => s.sentence === sentence).answer;
    const idx = await p.$$eval('.option .option-text', (x, a) => x.findIndex(e => e.textContent === a), ans);
    await p.click(`.option[data-index="${idx}"]`); await p.click('.btn-next');
  }
  await p.waitForSelector('.result');
  for (let i = 0; i < 20 && submits().length === before; i++) await p.waitForTimeout(50);
  const r = submits().at(-1);
  assert.equal(r.activity, 'similar'); assert.equal(r.student, 'cat'); assert.equal(r.items.length, 11); assert.equal(r.stars, 3);
});

test('zhuyin on: font class, polyphone marks, speech without marks', async () => {
  const p = await page(() => localStorage.setItem('h3a.settings', JSON.stringify({ zhuyin: true })));
  await p.goto(BASE + '#/L06/vocab?s=bear'); await p.waitForSelector('.word-card');
  assert.equal(await p.evaluate(() => document.documentElement.classList.contains('zhuyin')), true);
  const card = await p.$eval('.word-card[data-id="v-部分"] .option-text', e => e.textContent);
  assert.equal(card, '部分' + String.fromCodePoint(0xE01E1));
  await p.click('.word-card[data-id="v-部分"]');
  await p.waitForFunction(() => window.__spoken.includes('部分'));
  assert.ok(!(await p.evaluate(() => window.__spoken.some(s => /[\uDB40]/.test(s)))));
});
