/* 語音：優先使用台灣口音（zh-TW）的語音 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else {
    root.H3A = root.H3A || {}; root.H3A.ttsLib = m;
    root.H3A.tts = m.make(root.speechSynthesis || null, root.SpeechSynthesisUtterance || null);
  }
})(this, function () {
  /* 語音引擎常念錯、但只有一種讀音的字：念的時候換成同音字（畫面上的字不變） */
  /* 三聲＋三聲的詞，第一個字要變二聲：換成只有一個讀音的二聲同音字（老師要求）。
     沒有合適同音字的詞（所以、短短、找找、整理、點點、數數、小狗）交給語音引擎自己變調。 */
  var SAY_FIX = [
    [/筆桿/g, '鼻感'], [/桿/g, '感'],
    [/可以/g, '咳以'], [/只有/g, '直有'], [/好(?=[好幾久短找])/g, '豪'], [/想想/g, '詳想'],
    [/理解/g, '離解'], [/網址/g, '王址'], [/老虎/g, '勞虎'], [/火腿/g, '活腿'],
    [/引起/g, '銀起'], [/碗裡/g, '完裡'], [/兩種/g, '梁種'], [/雨點/g, '魚點'], [/洗手/g, '習手'], [/哪裡/g, '拿裡'], [/雨傘/g, '魚傘'], [/眨眼/g, '札眼'], [/舔(?=[舔嘴])/g, '甜'],
    /* 電腦語音會用大陸讀音：削、梢、識、夾、液、企，換成台灣讀音的同音字 */
    [/削/g, '消'], [/梢/g, '燒'], [/識/g, '是'], [/夾/g, '莢'], [/液/g, '亦'], [/企/g, '器']
  ];
  function fixSay(t) { SAY_FIX.forEach(function (f) { t = t.replace(f[0], f[1]); }); return t; }
  function norm(lang) { return String(lang || '').replace('_', '-').toLowerCase(); }
  function isTaiwan(v) {
    var l = norm(v.lang);
    return l === 'zh-tw' || l.indexOf('zh-hant') === 0 || /taiwan|臺灣|台灣/i.test(v.name || '');
  }
  function isChinese(v) { var l = norm(v.lang); return l === 'zh' || l.indexOf('zh-') === 0 || l.indexOf('cmn') === 0; }
  function pickVoice(voices) {
    var list = voices || [];
    var tw = list.filter(function (v) { return isChinese(v) && isTaiwan(v); });
    if (tw.length) return tw[0];
    var cn = list.filter(function (v) { return norm(v.lang) === 'zh-cn'; });
    if (cn.length) return cn[0];
    var zh = list.filter(isChinese);
    return zh.length ? zh[0] : null;
  }
  function make(synth, Utterance) {
    var token = 0;
    function voice() { return synth ? pickVoice(synth.getVoices()) : null; }
    function stop() { token++; if (synth) synth.cancel(); }
    function speak(text, say) {
      stop();
      var my = token;
      if (!synth || !Utterance) return Promise.resolve();
      return new Promise(function (resolve) {
        var u = new Utterance(fixSay(String(say || text).replace(/[\uDB40][\uDDE0-\uDDEF]/g, '')));
        var v = voice();
        if (v) u.voice = v;
        u.lang = v ? v.lang : 'zh-TW';
        u.rate = 0.9;
        var done = function () { resolve(my === token); };
        u.onend = done; u.onerror = done;
        try { synth.speak(u); } catch (e) { resolve(false); }
      });
    }
    function status() {
      var v = voice();
      if (!v) return 'none';
      return isTaiwan(v) ? 'taiwan' : 'other';
    }
    function unlock() { if (synth && Utterance) { var u = new Utterance(''); u.volume = 0; synth.speak(u); } }
    return { speak: speak, stop: stop, status: status, unlock: unlock, hasChinese: function () { return status() !== 'none'; } };
  }
  return { pickVoice: pickVoice, isTaiwan: isTaiwan, make: make, fixSay: fixSay };
});
