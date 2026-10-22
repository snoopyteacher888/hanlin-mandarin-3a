/* 語音：優先使用台灣口音（zh-TW）的語音 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else {
    root.H3A = root.H3A || {}; root.H3A.ttsLib = m;
    root.H3A.tts = m.make(root.speechSynthesis || null, root.SpeechSynthesisUtterance || null);
  }
})(this, function () {
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
        var u = new Utterance(String(say || text).replace(/[\uDB40][\uDDE0-\uDDEF]/g, ''));
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
  return { pickVoice: pickVoice, isTaiwan: isTaiwan, make: make };
});
