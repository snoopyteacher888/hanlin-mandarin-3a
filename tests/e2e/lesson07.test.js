// 端對端測試：第 7 課（詩歌）字詞活動都打得開；沒有句型就不顯示
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { start } = require('./server.js');
const W = require('../../data/lesson07.words.js');
const Q = require('../../assets/core/wordq.js');

const PORT = 8186, BASE = `http://localhost:${PORT}/`;
let srv, browser;
test.before(async () => {
  srv = await start(PORT, { openLessons: ['L07'] });
  browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', headless: false, args: ['--headless=new'] });
});
test.after(async () => { await browser.close(); await srv.close(); });

async function page() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  p.errors = []; p.on('pageerror', e => p.errors.push(e.message));
  await p.addInitScript(() => {
    try { localStorage.setItem('h3a.settings', JSON.stringify({ zhuyin: false })); } catch (e) {}
    window.__spoken = [];
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { getVoices: () => [{ lang: 'zh-TW', name: 'Mei-Jia' }], cancel() {},
      speak(u) { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 5); } } });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: function (t) { this.text = t; } });
    window.__sayNext = []; window.__sayError = null;
    function R() {}
    R.prototype.start = function () {
      const self = this;
      setTimeout(() => {
        if (window.__sayError) { self.onerror && self.onerror({ error: window.__sayError }); self.onend && self.onend(); return; }
        const t = window.__sayNext.shift();
        if (t) self.onresult && self.onresult({ results: [[{ transcript: t }]] });
        self.onend && self.onend();
      }, 10);
    };
    R.prototype.stop = function () {};
    window.SpeechRecognition = R; window.webkitSpeechRecognition = R;
  });
  return p;
}




test('第 7 課課次頁：有字詞活動，沒有句型', async () => {
  const p = await page(); await p.goto(BASE + '#/L07?s=bear');
  await p.waitForSelector('[data-activity="hanzi"]');
  const acts = await p.$$eval('[data-activity]', x => x.map(e => e.dataset.activity));
  ['hanzi', 'vocab', 'charword', 'similar', 'listen', 'phrase', 'rhetoric', 'challenge', 'idiom'].forEach(a => assert.ok(acts.includes(a), a));
  assert.ok(!acts.includes('pattern'));
  assert.deepEqual(p.errors, []);
});

test('第 7 課每個字詞活動的第一個畫面都正常', async () => {
  const p = await page();
  for (const a of ['hanzi', 'vocab', 'charword', 'similar', 'listen', 'phrase', 'rhetoric', 'challenge', 'idiom', 'challenge?p=build', 'challenge?p=memory', 'rhetoric?p=repeat']) {
    await p.goto(BASE + '#/L07/' + a + (a.includes('?') ? '&' : '?') + 's=bear');
    await p.waitForSelector('main .prompt, main h2', { timeout: 5000 });
    assert.equal(await p.$('.notice'), null, a + ' 顯示「還沒準備好」');
  }
  /* 修辭：三關加綜合挑戰 */
  await p.goto(BASE + '#/L07/rhetoric?s=bear');
  await p.waitForSelector('[data-level]');
  assert.deepEqual(await p.$$eval('[data-level]', x => x.map(e => e.dataset.level)), ['personify', 'redup', 'repeat', 'mix']);
  assert.deepEqual(p.errors, []);
});

test('第 7 課生字：選對字', async () => {
  const p = await page(); await p.goto(BASE + '#/L07/hanzi?s=bear');
  await p.click('.btn-next');
  for (let i = 0; i < W.hanzi.length; i++) {
    await p.waitForSelector('.option:not(:disabled)');
    const t = await p.textContent('.prompt h2');
    const hz = W.hanzi.find(x => x.cloze === t);
    assert.ok(hz, t);
    const idx = await p.$$eval('.option', (os, c) => os.findIndex(o => o.querySelector('.option-text').textContent === c), hz.char);
    await p.click(`.option[data-index="${idx}"]`);
    await p.click('.btn-next:not([hidden])');
  }
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});
