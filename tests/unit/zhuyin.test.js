const test = require('node:test');
const assert = require('node:assert/strict');
const { mark, strip, RULES } = require('../../assets/core/zhuyin.js');
const V = n => String.fromCodePoint(0xE01E0 + n);

test('部分 picks the 2nd reading of 分', () => { assert.equal(mark('鉛筆最重要的部分'), '鉛筆最重要的部分' + V(1)); });
test('分 elsewhere keeps default', () => { assert.equal(mark('五分鐘'), '五分鐘'); });
test('意思 uses neutral tone (3rd reading)', () => { assert.equal(mark('意思'), '意思' + V(2)); });
test('both characters of 處處', () => { assert.equal(mark('處處'), '處' + V(1) + '處' + V(1)); });
test('媽媽 only the second', () => { assert.equal(mark('媽媽用刀子'), '媽媽' + V(1) + '用刀子' + V(1)); });
test('因為 and 以為 differ', () => { assert.equal(mark('因為以為'), '因為' + V(1) + '以為'); });
test('idempotent', () => { const once = mark('部分和木頭'); assert.equal(mark(once), once); });
test('strip removes selectors', () => { assert.equal(strip(mark('木頭的意思')), '木頭的意思'); });
test('cloze blank before 分', () => { assert.equal(mark('好幾個＿分。'), '好幾個＿分' + V(1) + '。'); });
test('every rule names characters inside its phrase', () => {
  for (const [phrase, picks] of RULES) for (const i of Object.keys(picks)) assert.ok(+i < [...phrase].length, phrase);
});
