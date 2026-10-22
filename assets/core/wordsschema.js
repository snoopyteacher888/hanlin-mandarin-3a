/* 檢查字詞練習資料（生字、語詞、形近字、聽聽看），回傳錯誤訊息清單 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.wordsschema = m; }
})(this, function () {
  function nonEmpty(s) { return typeof s === 'string' && s.trim().length > 0; }
  function unique(arr) { return arr.filter(function (x, i) { return arr.indexOf(x) === i; }).length === arr.length; }
  function validateWords(w) {
    var errs = [], seen = {};
    if (!w) return ['沒有字詞資料'];
    ['hanzi', 'vocab', 'similar', 'listen'].forEach(function (k) { if (!Array.isArray(w[k])) errs.push('缺少 ' + k); });
    if (errs.length) return errs;
    function useId(id) {
      if (!nonEmpty(id)) { errs.push('有題目缺少 id'); return; }
      if (seen[id]) errs.push('id 重複：' + id);
      seen[id] = true;
    }
    function opts(id, list, min) {
      if (!Array.isArray(list) || list.length < min || list.length > 4) errs.push(id + ' 的選項數量不對');
      else if (!unique(list)) errs.push(id + ' 的選項重複');
    }
    w.hanzi.forEach(function (h) {
      useId(h.id);
      ['char', 'zhuyin', 'radical', 'say', 'cloze', 'clue', 'explain'].forEach(function (k) { if (!nonEmpty(h[k])) errs.push(h.id + ' 缺少 ' + k); });
      if (!(h.strokes > 0)) errs.push(h.id + ' 缺少筆畫數');
      if (!Array.isArray(h.words) || !h.words.length) errs.push(h.id + ' 缺少語詞');
      opts(h.id, h.options, 4);
      if (Array.isArray(h.options) && h.options[0] !== h.char) errs.push(h.id + ' 的第一個選項要是正確的字');
      if (nonEmpty(h.cloze) && h.cloze.indexOf('＿') < 0) errs.push(h.id + ' 的挖空要有＿');
    });
    w.vocab.forEach(function (v) {
      useId(v.id);
      if (!nonEmpty(v.word) || !nonEmpty(v.meaning)) errs.push(v.id + ' 缺少語詞或解釋');
      if (!nonEmpty(v.example) || v.example.indexOf('＿') < 0) errs.push(v.id + ' 的例句要有＿');
      opts(v.id, v.options, 4);
      if (Array.isArray(v.options) && v.options[0] !== v.word) errs.push(v.id + ' 的第一個選項要是正確的語詞');
    });
    w.similar.forEach(function (s) {
      useId(s.id);
      if (!nonEmpty(s.sentence) || s.sentence.split('＿').length !== 2) errs.push(s.id + ' 的句子要剛好一個＿');
      opts(s.id, s.options, 2);
      if (Array.isArray(s.options) && s.options.indexOf(s.answer) < 0) errs.push(s.id + ' 的答案不在選項裡');
      if (!nonEmpty(s.clue) || !nonEmpty(s.explain)) errs.push(s.id + ' 缺少線索或說明');
    });
    w.listen.forEach(function (l) {
      useId(l.id);
      if (!nonEmpty(l.text)) errs.push(l.id + ' 缺少句子');
      opts(l.id, (l.options || []).map(function (o) { return o.text; }), 4);
      if (!(l.answer >= 0 && l.answer < (l.options || []).length)) errs.push(l.id + ' 的答案編號不對');
    });
    return errs;
  }
  return { validateWords: validateWords };
});
