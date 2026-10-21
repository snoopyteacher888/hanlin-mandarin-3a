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
  await p.goto(BASE + '#/L06?s=bear');
  await p.fill('input[type=password]', 'nope'); await p.click('button[type=submit]');
  await p.waitForFunction(() => document.querySelector('.error').textContent === '密碼不對，請問老師');
  await p.fill('input[type=password]', 'test-pass'); await p.click('button[type=submit]');
  await p.waitForSelector('.activity-main');
  assert.deepEqual(p.errors, []);
});

test('quiz hints and next', async () => {
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear'); await p.waitForSelector('.option');
  const a = await answerIndex(p);
  let en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.equal((await enabled(p)).length, 3);
  assert.equal(await p.$eval('.btn-next', b => b.hidden), true);
  await p.waitForFunction(() => window.__spoken.includes('再想想看'));
  await p.waitForFunction(() => window.__spoken.some(s => s.includes('玻璃做的')));
  en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.equal((await enabled(p)).length, 2);
  en = await enabled(p); await p.click(`.option[data-index="${en.find(i => i !== a)}"]`);
  assert.deepEqual(await enabled(p), [a]);
  await p.click(`.option[data-index="${a}"]`);
  assert.equal(await p.$eval('.btn-next', b => b.hidden), false);
});

test('double tap advances once', async () => {
  const p = await page(); await unlock(p, '#/L06/quiz?s=bear'); await p.waitForSelector('.option');
  await p.click(`.option[data-index="${await answerIndex(p)}"]`);
  await p.dblclick('.btn-next');
  assert.equal(await p.$$eval('.dot.done', x => x.length), 1);
});

test('map ordering', async () => {
  const p = await page(); await unlock(p, '#/L06/map?s=cat'); await p.waitForSelector('.map-card');
  for (const id of ['m1', 'm2', 'm3']) await p.click(`.map-card[data-step="${id}"]`);
  await p.waitForSelector('.result', { timeout: 3000 });
  assert.equal(await p.textContent('.result p'), '第一次就答對 3 題，共 3 題');
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
  const p = await page(() => localStorage.setItem('h3a.settings', JSON.stringify({ mode: 'class' })));
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
