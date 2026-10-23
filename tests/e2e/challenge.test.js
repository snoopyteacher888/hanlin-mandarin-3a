// 端對端測試：語詞挑戰（部件組字、翻牌配對）
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { start } = require('./server.js');
const W = require('../../data/lesson06.words.js');
const Q = require('../../assets/core/wordq.js');

const PORT = 8184, BASE = `http://localhost:${PORT}/`;
let srv, browser;
test.before(async () => {
  srv = await start(PORT, { encFile: require('node:path').join(__dirname, '../fixtures/fake06talk.enc.js') });
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



test('部件組字：選出缺的部件，部首念名稱', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/challenge?s=bear');
  await p.click('[data-game="build"]');
  await p.waitForSelector('.btn-next:not([hidden])'); await p.click('.btn-next:not([hidden])');
  const list = W.hanzi.filter(x => x.build);
  for (let i = 0; i < list.length; i++) {
    await p.waitForSelector('.option:not(:disabled)');
    const t = await p.textContent('.prompt h2');
    const hz = list.find(x => t.startsWith(x.char));
    assert.ok(hz, t);
    if (i === 0) {
      /* 錯一次：提示不說答案 */
      const wrong = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent !== a), hz.build.answer);
      await p.click(`.option[data-index="${wrong}"]`);
      await p.waitForSelector('.feedback.hint');
      assert.ok(!(await p.textContent('.feedback.hint')).includes('「' + hz.build.answer + '」'));
    }
    const idx = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent === a), hz.build.answer);
    await p.click(`.option[data-index="${idx}"]`);
    await p.click('.btn-next:not([hidden])');
  }
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});

test('翻牌配對：翻錯會蓋回去，全部配對完看結果', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/challenge?p=memory&s=bear');
  for (let round = 0; round < 5; round++) {
    await p.waitForSelector('.mem-card');
    if (round === 0) {
      const ids = await p.$$eval('.mem-card', cs => cs.map(c => c.dataset.id));
      const j = ids.findIndex(x => x !== ids[0]);
      await p.click('.mem-card >> nth=0'); await p.click(`.mem-card >> nth=${j}`);
      await p.waitForFunction(() => document.querySelectorAll('.mem-card.open').length === 0, null, { timeout: 4000 });
    }
    const ids = await p.$$eval('.mem-card', cs => cs.map(c => c.dataset.id));
    for (const id of [...new Set(ids)]) {
      const both = await p.$$(`.mem-card[data-id="${id}"]`);
      await both[0].click(); await both[1].click();
    }
    await p.waitForSelector('.btn-next:not([hidden])');
    const label = await p.textContent('.btn-next:not([hidden])');
    await p.click('.btn-next:not([hidden])');
    if (label.includes('看結果')) break;
  }
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});
