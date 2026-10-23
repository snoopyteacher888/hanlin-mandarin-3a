/* 檢查字詞練習資料（生字、語詞、形近字、聽聽看），回傳錯誤訊息清單 */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.speechcheck || (typeof require === 'function' ? require('./speechcheck.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.wordsschema = m; }
})(this, function (speechcheck) {
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
      if (h.build) {
        if (!Array.isArray(h.build.show) || h.build.show.indexOf('？') < 0) errs.push(h.id + ' 的組字要有一個「？」');
        opts(h.id + ' 的組字', h.build.options, 4);
        if (Array.isArray(h.build.options) && h.build.options[0] !== h.build.answer) errs.push(h.id + ' 的組字第一個選項要是答案');
        if ((h.clue || '').indexOf(h.build.answer) >= 0 && h.build.answer.length === 1 && /[阝艹刂氵扌辶亻]/.test(h.build.answer)) errs.push(h.id + ' 的線索說出了答案');
      }
      /* 生字卡的拆一拆、例句（可以沒有；有的話要完整） */
      if (h.story !== undefined || h.parts !== undefined || h.sentence !== undefined) {
        if (!nonEmpty(h.story) || !Array.isArray(h.parts) || !h.parts.length) errs.push(h.id + ' 的拆一拆要有 parts 和 story');
        if (!nonEmpty(h.sentence) || h.sentence.indexOf(h.char) < 0) errs.push(h.id + ' 的例句要用到「' + h.char + '」');
      }
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
    if (w.charwords) charwords(w.charwords);
    if (w.idioms) w.idioms.forEach(function (x) {
      useId(x.id);
      ['idiom', 'char', 'meaning', 'example', 'situation'].forEach(function (k) { if (!nonEmpty(x[k])) errs.push(x.id + ' 缺少 ' + k); });
      if (nonEmpty(x.idiom) && x.idiom.indexOf(x.char) < 0) errs.push(x.id + ' 的成語裡沒有生字「' + x.char + '」');
      if (nonEmpty(x.idiom) && ((x.meaning || '') + (x.situation || '')).indexOf(x.idiom) >= 0) errs.push(x.id + ' 的意思或情境說出了答案');
      if (nonEmpty(x.idiom) && (x.example || '').indexOf(x.idiom) < 0) errs.push(x.id + ' 的例句要用到成語');
    });
    if (w.phrase) phrase(w.phrase);
    if (w.pattern) pattern(w.pattern);
    if (w.rhetoric) rhetoric(w.rhetoric);
    return errs;

    /* 生字語詞：每個生字都要有，解釋不能說出答案 */
    function charwords(list) {
      list.forEach(function (c) {
        useId(c.id);
        ['char', 'word', 'meaning', 'example'].forEach(function (k) { if (!nonEmpty(c[k])) errs.push(c.id + ' 缺少 ' + k); });
        if (!nonEmpty(c.word)) return;
        if (c.word.indexOf(c.char) < 0) errs.push(c.id + ' 的語詞裡沒有生字「' + c.char + '」');
        if ((c.example || '').indexOf(new Array(c.word.length + 1).join('＿')) < 0) errs.push(c.id + ' 的例句要有和語詞一樣長的＿');
        if ((c.meaning || '').indexOf(c.word) >= 0) errs.push(c.id + ' 的解釋說出了答案');
        opts(c.id, c.options, 4);
        if (Array.isArray(c.options) && c.options[0] !== c.word) errs.push(c.id + ' 的第一個選項要是正確的語詞');
      });
      w.hanzi.forEach(function (h) {
        if (!list.some(function (c) { return c.char === h.char; })) errs.push('生字語詞少了「' + h.char + '」');
      });
    }

    /* ---------- B 批 ---------- */
    function choice(x, min, answer) {
      useId(x.id);
      opts(x.id, x.options, min);
      if (!nonEmpty(x.clue) || !nonEmpty(x.explain)) errs.push(x.id + ' 缺少線索或說明');
      else if (x.clue.indexOf(answer) >= 0) errs.push(x.id + ' 的提示說出了答案');
    }
    function speak(x, rule) {
      useId(x.id);
      if (!nonEmpty(x.clue) || !nonEmpty(x.model)) { errs.push(x.id + ' 缺少線索或示範句'); return; }
      var full = (rule.front || '') + x.model;
      if (speechcheck.check(rule, full).status === 'bad') errs.push(x.id + ' 的示範句不符合句型');
    }
    function phrase(p) {
      if (!p.intro || !Array.isArray(p.intro.parts)) errs.push('phrase 缺少 intro');
      (p.pick || []).forEach(function (x) { choice(x, 4, x.options && x.options[0]); if (!nonEmpty(x.noun)) errs.push(x.id + ' 缺少 noun'); });
      (p.say || []).forEach(function (x) {
        if (!Array.isArray(x.accept) || !x.accept.length) errs.push(x.id + ' 缺少 accept');
        speak(x, { kind: 'phrase', accept: x.accept || [] });
      });
      (p.choose || []).forEach(function (x) { choice(x, 2, x.options && x.options[0]); });
      (p.make || []).forEach(function (x) { speak(x, { kind: 'word', word: x.word, min: 6 }); });
    }
    function pattern(list) {
      list.forEach(function (pt) {
        if (!speechcheck.PATTERNS[pt.key]) { errs.push('不認得的句型：' + pt.key); return; }
        if (!nonEmpty(pt.title) || !Array.isArray(pt.examples) || !pt.examples.length) errs.push(pt.key + ' 缺少標題或例句');
        (pt.match || []).forEach(function (x) { choice(x, 3, x.options && x.options[0]); });
        (pt.conj || []).forEach(function (x) {
          choice(x, 3, x.options && x.options[0]);
          if (!nonEmpty(x.sentence) || x.sentence.indexOf('＿') < 0) errs.push(x.id + ' 的句子要有＿');
        });
        (pt.half || []).forEach(function (x) {
          if (!nonEmpty(x.front)) errs.push(x.id + ' 缺少前半句');
          speak(x, { kind: 'pattern', key: pt.key, front: x.front });
        });
        (pt.whole || []).forEach(function (x) { speak(x, { kind: 'pattern', key: pt.key }); });
      });
    }
    function rhetoric(rh) {
      var names = (rh.cards || []).map(function (c) { return c.name; });
      if (names.length < 2 || names.length > 4 || !unique(names)) errs.push('修辭卡要 2～4 張、不重複');
      (rh.cards || []).forEach(function (c) {
        if (!nonEmpty(c.key) || !nonEmpty(c.meaning) || !c.show || !nonEmpty(c.show.sentence)) errs.push((c.name || '?') + ' 缺少 key、意思或例句');
        (c.yesno || []).forEach(function (y) {
          useId(y.id);
          if (typeof y.answer !== 'boolean' || !nonEmpty(y.sentence) || !nonEmpty(y.clue) || !nonEmpty(y.explain)) errs.push(y.id + ' 缺少句子、答案、線索或說明');
          else if (/是/.test(y.clue) && y.clue.indexOf(c.name) >= 0) errs.push(y.id + ' 的提示說出了答案');
        });
        (c.pick || []).forEach(function (x) { choice(x, 2, x.options && x.options[0]); });
      });
      (rh.quiz || []).forEach(function (x) {
        useId(x.id);
        if (names.indexOf(x.answer) < 0) errs.push(x.id + ' 的答案不是修辭卡');
        if (!nonEmpty(x.sentence) || !nonEmpty(x.clue) || !nonEmpty(x.explain)) errs.push(x.id + ' 缺少句子、線索或說明');
        else if (x.clue.indexOf(x.answer) >= 0) errs.push(x.id + ' 的提示說出了答案');
      });
    }
  }
  return { validateWords: validateWords };
});
