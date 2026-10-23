/* 生字語詞：每個生字再學一個語詞。分兩半，每半先認識 7 個語詞，再看句子選語詞 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow;
  var HALF = 7;

  function rowSay(c) { return c.char + '，' + c.word + '。' + c.meaning; }
  function learnSlide(ctx, list, n) {
    return F.learn('認識生字語詞（' + n + '）', function () {
      return h('div', { class: 'charword-list' }, list.map(function (c) {
        return h('div', { class: 'charword-row' },
          h('div', { class: 'charword-pic' }, H3A.ui.picture(ctx.lessonId, c.img, c.word)),
          h('button', { type: 'button', class: 'charword-char', onclick: function () { H3A.tts.speak(c.char); } }, c.char),
          h('button', { type: 'button', class: 'charword-word', onclick: function () { H3A.tts.speak(c.word); } }, c.word),
          h('span', { class: 'charword-meaning' }, c.meaning),
          H3A.ui.speaker(rowSay(c), null));
      }));
    }, list.map(rowSay).join(''));
  }

  H3A.pages.charword = function run(main, ctx) {
    var list = ctx.words && ctx.words.charwords; if (!list) return F.missing(main);
    var chars = ctx.words.hanzi.map(function (x) { return x.char; });
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [];
    for (var i = 0; i < list.length; i += HALF) {
      var part = list.slice(i, i + HALF);
      qs.push(learnSlide(ctx, part, i / HALF + 1));
      qs = qs.concat(H3A.quizgen.shuffle(part, r).map(function (c) { return H3A.wordq.charWordQuestion(c, r, chars); }));
    }
    F.run(main, ctx, 'charword', qs, function () { run(main, ctx); });
  };
})(this);
