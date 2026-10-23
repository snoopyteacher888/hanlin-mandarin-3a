// 端對端測試：理解提問最後的「說說你的想法」、生字語詞
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { start } = require('./server.js');
const W = require('../../data/lesson06.words.js');
const Q = require('../../assets/core/wordq.js');

const PORT = 8183, BASE = `http://localhost:${PORT}/`;
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


const ANSWERS = { '小水杯是用什麼做的？': '玻璃', '水杯可以做什麼？': '裝水', '做杯子要先做什麼？': '把沙子燒熱' };

test('理解提問：選擇題做完，最後說想法，送給老師批改', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/quiz?s=bear');
  await p.fill('input[type=password]', 'test-pass'); await p.click('button[type=submit]');
  for (let k = 0; k < 3; k++) {
    await p.waitForSelector('.option:not(:disabled)');
    const idx = await p.evaluate(m => [...document.querySelectorAll('.option')].findIndex(o => o.querySelector('.option-text').textContent === m[document.querySelector('.prompt h2').textContent]), ANSWERS);
    await p.click(`.option[data-index="${idx}"]`); await p.click('.btn-next:not([hidden])');
  }
  await p.waitForSelector('.mic-btn');
  assert.match(await p.textContent('.prompt h2'), /以後你會怎麼使用杯子/);
  /* 太短 → 提示方法 */
  await p.evaluate(() => window.__sayNext.push('杯子'));
  await p.click('.mic-btn'); await p.waitForSelector('.said-box:not([hidden])'); await p.click('.speak-actions >> text=✅ 送出');
  await p.waitForSelector('.feedback.hint');
  assert.match(await p.textContent('.feedback.hint'), /自己的想法/);
  await p.evaluate(() => window.__sayNext.push('我會小心的拿杯子'));
  await p.click('.mic-btn'); await p.waitForSelector('.said-box:not([hidden])'); await p.click('.speak-actions >> text=✅ 送出');
  await p.waitForSelector('.feedback.ok >> text=等老師批改');
  const s = srv.speech.filter(x => x.qid === 'k1').at(-1);
  assert.equal(s.activity, 'quiz'); assert.equal(s.status, 'pending'); assert.equal(s.said, '我會小心的拿杯子');
  await p.click('.btn-next:not([hidden])');
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});

test('生字語詞：先認識，再看句子選語詞，十四個生字都練到', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/charword?s=bear');
  const seen = [];
  for (let half = 0; half < 2; half++) {
    await p.waitForSelector('.charword-row');
    seen.push(...await p.$$eval('.charword-char', x => x.map(e => e.textContent)));
    await p.click('text=下一步 ▶');
    for (let i = 0; i < 7; i++) {
      await p.waitForSelector('.option:not(:disabled)');
      const t = await p.textContent('.prompt h2');
      const c = W.charwords.find(x => x.example === t);
      assert.ok(c, '找不到題目 ' + t);
      assert.equal(await p.$$eval('.option .char-mark', x => x.length), 4);
      const idx = await p.$$eval('.option', (os, w) => os.findIndex(o => o.querySelector('.option-text').textContent === w), c.word);
      await p.click(`.option[data-index="${idx}"]`);
      await p.click('.btn-next:not([hidden])');
    }
  }
  await p.waitForSelector('.result');
  assert.equal(seen.join(''), W.hanzi.map(h => h.char).join(''));
  assert.deepEqual(p.errors, []);
});
