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

test('生字變成語：五個步驟——成語卡、排成語、放進句子、看情境、配對', async () => {
  const p = await page(); await p.goto(BASE + '#/L06/idiom?s=bear');
  assert.deepEqual(await p.$$eval('.step-tab', x => x.map(e => e.dataset.step)), ['cards', 'order', 'fill', 'situation', 'match']);
  for (let g = 0; g < 3; g++) {
    await p.waitForSelector('.idiom-card');
    await p.click('.btn-next:not([hidden])');
  }
  await p.click('.step-go');
  let first = true;
  for (let k = 0; k < W.idioms.length; k++) {
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
      /* 提示：老師幫忙放好第一個字（鎖住，點了也拿不回來） */
      await p.waitForFunction(() => document.querySelectorAll('.order-slot.given').length === 1);
      assert.equal(await p.textContent('.order-slot.given'), it.idiom[0]);
      await p.click('.order-slot.given');
      assert.equal(await p.$$eval('.order-slot.filled', x => x.length), 1);
      await tapTiles(p, it.idiom.slice(1));
    } else await tapTiles(p, it.idiom);
    await p.waitForSelector('.order-slots .big-check');
    await p.click('.btn-next:not([hidden])');
  }
  await p.click('.step-go');
  /* 放進句子：把成語拖到適合的句子上 */
  for (let k = 0; k < W.idioms.filter(x => x.fill).length; k++) {
    await p.waitForSelector('.drag-chip');
    const chip = await p.textContent('.drag-chip');
    const it = W.idioms.find(x => x.idiom === chip);
    const fi = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent === a), it.fill.options[0]);
    const a = await (await p.$('.drag-chip')).boundingBox(), b = await (await p.$(`.option[data-index="${fi}"]`)).boundingBox();
    await p.mouse.move(a.x + 20, a.y + 10); await p.mouse.down();
    await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 10 }); await p.mouse.up();
    await p.waitForSelector('.option.is-correct');
    await p.click('.btn-next:not([hidden])');
  }
  await p.click('.step-go');
  for (let k = 0; k < 6; k++) {
    await p.waitForSelector('.option:not(:disabled)');
    const t = await p.textContent('.prompt h2');
    const it = W.idioms.find(x => t.includes(x.situation));
    assert.ok(it, t);
    const idx = await p.$$eval('.option', (os, a) => os.findIndex(o => o.querySelector('.option-text').textContent === a), it.idiom);
    await p.click(`.option[data-index="${idx}"]`);
    await p.click('.btn-next:not([hidden])');
  }
  await p.click('.step-go');
  for (let round = 0; round < 3; round++) {
    await p.waitForSelector('.match-col.left .match-card:not(:disabled)');
    for (const id of await p.$$eval('.match-col.left .match-card', cs => cs.map(c => c.dataset.id))) {
      await p.click(`.match-col.left [data-id="${id}"]`); await p.click(`.match-col.right [data-id="${id}"]`);
    }
    await p.waitForSelector('.match-board .big-check');
    await p.click('.btn-next:not([hidden])');
    if (await p.$('.result')) break;
  }
  await p.waitForSelector('.result');
  assert.deepEqual(p.errors, []);
});
