// 端對端測試：生字變成語（認識、排字、情境題）
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { start } = require('./server.js');
const W = require('../../data/lesson06.words.js');
const Q = require('../../assets/core/wordq.js');

const PORT = 8185, BASE = `http://localhost:${PORT}/`;
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




async function tapTiles(p, word) {
  for (const ch of word) {
    const i = await p.$$eval('.order-tile', (ts, c) => ts.findIndex(t => !t.disabled && t.textContent.replace(/[\uDB40][\uDDE0-\uDDEF]/g, '') === c), ch);
    await p.click(`.order-tile[data-i="${i}"]`);
  }
}

test('生字變成語：排錯會提示、可以拿回字，排對再做情境題', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/idiom?s=bear');
  let first = true;
  for (let g = 0; g < 3; g++) {
    await p.waitForSelector('.idiom-card');
    await p.click('.btn-next:not([hidden])');
    for (let k = 0; k < 2; k++) {
      await p.waitForSelector('.order-tile');
      const prompt = await p.textContent('.prompt h2');
      const it = W.idioms.find(x => prompt.includes(x.meaning));
      assert.ok(it, prompt);
      if (first) {
        first = false;
        /* 拿回一個字 */
        await tapTiles(p, it.idiom.slice(0, 1));
        await p.click('.order-slot.filled');
        assert.equal(await p.$$eval('.order-slot.filled', x => x.length), 0);
        /* 排錯：提示不說整個答案 */
        await tapTiles(p, it.idiom.split('').reverse().join(''));
        await p.waitForSelector('.feedback.hint');
        assert.ok(!(await p.textContent('.feedback.hint')).includes(it.idiom));
        await p.waitForFunction(() => document.querySelectorAll('.order-slot.filled').length === 0);
      }
      await tapTiles(p, it.idiom);
      await p.waitForSelector('.feedback.ok');
      await p.click('.btn-next:not([hidden])');
      /* 排完接著：哪一句適合填入這個成語？ */
      await p.waitForSelector('.option:not(:disabled)');
      assert.equal(await p.textContent('.prompt h2'), '哪一句適合填入「' + it.idiom + '」？');
      const right = it.fill.options[0];
      const fi = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent === a), right);
      await p.click(`.option[data-index="${fi}"]`);
      await p.click('.btn-next:not([hidden])');
    }
  }
  for (let k = 0; k < 6; k++) {
    await p.waitForSelector('.option:not(:disabled)');
    const t = await p.textContent('.prompt h2');
    const it = W.idioms.find(x => t.includes(x.situation));
    assert.ok(it, t);
    const idx = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent === a), it.idiom);
    await p.click(`.option[data-index="${idx}"]`);
    await p.click('.btn-next:not([hidden])');
  }
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});
