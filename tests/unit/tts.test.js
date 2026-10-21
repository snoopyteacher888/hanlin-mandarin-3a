const test = require('node:test');
const assert = require('node:assert/strict');
const { pickVoice, isTaiwan, make } = require('../../assets/tts.js');

test('pickVoice prefers zh-TW', () => {
  assert.equal(pickVoice([{ lang: 'zh-CN', name: 'a' }, { lang: 'zh-TW', name: 'b' }]).name, 'b');
  assert.equal(pickVoice([{ lang: 'zh_TW', name: 'c' }, { lang: 'zh-CN', name: 'a' }]).name, 'c');
  assert.equal(pickVoice([{ lang: 'zh-CN', name: 'a' }, { lang: 'zh', name: 'Google 國語（臺灣）' }]).name, 'Google 國語（臺灣）');
  assert.equal(pickVoice([{ lang: 'zh-HK', name: 'h' }, { lang: 'zh-CN', name: 'a' }]).lang, 'zh-CN');
  assert.equal(pickVoice([{ lang: 'en-US', name: 'a' }]), null);
});
test('isTaiwan', () => {
  assert.ok(isTaiwan({ lang: 'zh-TW', name: 'x' })); assert.ok(isTaiwan({ lang: 'zh-Hant', name: 'x' }));
  assert.ok(!isTaiwan({ lang: 'zh-CN', name: 'Tingting' }));
});

function fakeSynth(voices) {
  const s = { spoken: [], cancels: 0, getVoices: () => voices, cancel() { s.cancels++; },
    speak(u) { s.spoken.push(u); setTimeout(() => u.onend && u.onend(), 0); } };
  return s;
}
function Utt(text) { this.text = text; }

test('speak cancels previous', async () => {
  const s = fakeSynth([{ lang: 'zh-TW', name: 'Mei' }]); const t = make(s, Utt);
  t.speak('一'); await t.speak('二'); assert.ok(s.cancels >= 2); assert.equal(s.spoken[1].text, '二');
});
test('speak uses say over text and sets voice', async () => {
  const s = fakeSynth([{ lang: 'zh-TW', name: 'Mei' }]); const t = make(s, Utt);
  await t.speak('石墨＋黏土', '石墨加黏土'); assert.equal(s.spoken[0].text, '石墨加黏土');
  assert.equal(s.spoken[0].voice.name, 'Mei'); assert.equal(s.spoken[0].lang, 'zh-TW');
});
test('status reports taiwan / other / none', () => {
  assert.equal(make(fakeSynth([{ lang: 'zh-TW', name: 'a' }]), Utt).status(), 'taiwan');
  assert.equal(make(fakeSynth([{ lang: 'zh-CN', name: 'a' }]), Utt).status(), 'other');
  assert.equal(make(fakeSynth([]), Utt).status(), 'none');
});
test('no synth resolves silently', async () => { const t = make(null, null); await t.speak('x'); assert.equal(t.status(), 'none'); });
