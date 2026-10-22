/* 把字詞資料轉成作答題（給 runQuestions 用） */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.quizgen || (typeof require === 'function' ? require('./quizgen.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.wordq = m; }
})(this, function (quizgen) {
  function shuffled(texts, correct, r, extra) {
    var order = quizgen.shuffle(texts, r);
    return { options: order.map(function (t) { var o = { text: t }; for (var k in extra) o[k] = extra[k]; return o; }), answer: order.indexOf(correct) };
  }
  function hanziQuestion(h, r) {
    var s = shuffled(h.options, h.char, r, { big: true });
    return { id: h.id, prompt: h.cloze, say: h.say, img: h.img, autoSay: h.say, options: s.options, answer: s.answer, hint: '仔細看，' + h.hint };
  }
  function vocabQuestion(v, kind, r) {
    var s = shuffled(v.options, v.word, r, {});
    var q = { id: v.id, options: s.options, answer: s.answer, hint: '「' + v.word + '」的意思是：' + v.meaning };
    if (kind === 'pic') { q.prompt = '圖片上是哪一個語詞？'; q.img = v.img; }
    else { q.prompt = '哪一個語詞的意思是：「' + v.meaning + '」'; q.say = '哪一個語詞的意思是：' + v.meaning; q.autoSay = v.meaning; }
    return q;
  }
  function similarQuestion(s, r) {
    var x = shuffled(s.options, s.answer, r, { big: true });
    return { id: s.id, prompt: s.sentence, say: s.sentence.replace('＿', s.answer), options: x.options, answer: x.answer, hint: s.hint };
  }
  function listenQuestion(l, r) {
    var order = quizgen.shuffle(l.options.map(function (_, i) { return i; }), r);
    return { id: l.id, prompt: l.text, say: l.text, hideText: true, autoSay: l.text, hint: l.text,
      options: order.map(function (i) { return l.options[i]; }), answer: order.indexOf(l.answer) };
  }
  function findWordQuestion(w, id, r) {
    var pick = function (list) { return (list || []).filter(function (x) { return x.id === id; })[0]; };
    var x;
    if ((x = pick(w.hanzi))) return hanziQuestion(x, r);
    if ((x = pick(w.vocab))) return vocabQuestion(x, r() < 0.5 ? 'pic' : 'meaning', r);
    if ((x = pick(w.similar))) return similarQuestion(x, r);
    if ((x = pick(w.listen))) return listenQuestion(x, r);
    return null;
  }
  return { hanziQuestion: hanziQuestion, vocabQuestion: vocabQuestion, similarQuestion: similarQuestion,
    listenQuestion: listenQuestion, findWordQuestion: findWordQuestion };
});
