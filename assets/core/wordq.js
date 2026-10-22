/* 把字詞資料轉成作答題（給 runQuestions 用）。
   每題有三層提示 hints：h1 給方法、h2 給線索（都不說答案）、teach 第 3 次錯才說答案和原因。 */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.quizgen || (typeof require === 'function' ? require('./quizgen.js') : null),
    root.H3A && root.H3A.locate || (typeof require === 'function' ? require('./locate.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.wordq = m; }
})(this, function (quizgen, locator) {
  function shuffled(texts, correct, r, extra) {
    var order = quizgen.shuffle(texts, r);
    return { options: order.map(function (t) { var o = { text: t }; for (var k in extra) o[k] = extra[k]; return o; }), answer: order.indexOf(correct) };
  }
  function blankSay(s) { return s.replace('＿', '什麼'); }

  function hanziQuestion(h, r) {
    var s = shuffled(h.options, h.char, r, { big: true });
    return { id: h.id, prompt: h.cloze, say: h.say, img: h.img, autoSay: h.say, options: s.options, answer: s.answer,
      hints: { h1: { text: '再聽一次，想想看是哪一個字。', say: h.say }, h2: { text: '提示：' + h.clue }, teach: { text: h.explain } } };
  }
  function vocabQuestion(v, kind, r) {
    var s = shuffled(v.options, v.word, r, {});
    var q = { id: v.id, options: s.options, answer: s.answer };
    var teach = { text: '答案是「' + v.word + '」，意思是：' + v.meaning };
    var h2 = { text: '提示：' + v.example, say: '提示：' + v.example.replace(/＿+/, '什麼') };
    if (kind === 'pic') {
      q.prompt = '圖片上是哪一個語詞？'; q.img = v.img;
      q.hints = { h1: { text: '再仔細看看圖片，想想看它是什麼？' }, h2: h2, teach: teach };
    } else {
      q.prompt = '哪一個語詞的意思是：「' + v.meaning + '」'; q.say = '哪一個語詞的意思是：' + v.meaning; q.autoSay = v.meaning;
      q.hints = { h1: { text: '再聽一次意思：' + v.meaning, say: v.meaning }, h2: h2, teach: teach };
    }
    return q;
  }
  function similarQuestion(s, r) {
    var x = shuffled(s.options, s.answer, r, { big: true });
    return { id: s.id, prompt: s.sentence, say: blankSay(s.sentence), options: x.options, answer: x.answer,
      hints: { h1: { text: '再讀一次句子，想想這個詞是什麼意思。', say: blankSay(s.sentence) }, h2: { text: s.clue }, teach: { text: s.explain } } };
  }
  function listenQuestion(l, r) {
    var order = quizgen.shuffle(l.options.map(function (_, i) { return i; }), r);
    var right = l.options[l.answer].text;
    return { id: l.id, prompt: l.text, say: l.text, hideText: true, autoSay: l.text,
      options: order.map(function (i) { return l.options[i]; }), answer: order.indexOf(l.answer),
      hints: { h1: { text: '再仔細聽一次。', say: l.text }, h2: { text: '看著文字，再聽一次。', say: l.text, showText: true, slow: true },
        teach: { text: '答案是「' + right + '」，因為句子說：「' + l.text + '」' } } };
  }
  /* 閱讀題：h1 告訴在第幾段、h2 把相關句子亮起來、teach 才說答案和依據 */
  function readingHints(lesson, q) {
    var loc = locator.locate(lesson, q.evidence);
    var where = loc.paras.length ? '答案在課文第 ' + loc.paras.join('、') + ' 段。' : '回到課文找找看。';
    return {
      h1: { text: '再想想看。' + where, para: { paras: loc.paras, sentIds: loc.sentIds, highlight: false } },
      h2: { text: '再找找看，注意亮起來的句子。', para: { paras: loc.paras, sentIds: loc.sentIds, highlight: true } },
      teach: { text: '答案是「' + q.options[q.answer].text + '」。因為課文說：「' + q.evidence + '」' }
    };
  }
  function findWordQuestion(w, id, r) {
    var pick = function (list) { return (list || []).filter(function (x) { return x.id === id; })[0]; };
    var x;
    if ((x = pick(w.hanzi))) return hanziQuestion(x, r);
    if ((x = pick(w.vocab))) return vocabQuestion(x, x.noPic || r() < 0.5 ? 'meaning' : 'pic', r);
    if ((x = pick(w.similar))) return similarQuestion(x, r);
    if ((x = pick(w.listen))) return listenQuestion(x, r);
    return null;
  }
  return { hanziQuestion: hanziQuestion, vocabQuestion: vocabQuestion, similarQuestion: similarQuestion,
    listenQuestion: listenQuestion, readingHints: readingHints, findWordQuestion: findWordQuestion };
});
