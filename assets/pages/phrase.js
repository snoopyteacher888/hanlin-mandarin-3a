/* 短語短句：認識短語 → 看圖選疊字 → 看圖說說看 → 認識語詞 → 哪一句用得對 → 說一句話 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function sayQ(x) { return Q.speakQuestion(x, { kind: 'phrase', accept: x.accept }, '看圖說說看：這是什麼樣的' + x.noun + '？'); }
  function makeQ(x) { return Q.speakQuestion(x, { kind: 'word', word: x.word, min: 6 }, '用「' + x.word + '」說一句話'); }

  function introSlide(ctx, p) {
    var it = p.intro;
    var say = it.example + '。' + it.parts.map(function (x) { return x.role ? x.text + '，是' + x.role : x.text; }).join('，');
    return F.learn('認識短語：' + it.example, function () {
      return h('div', { class: 'learn-box' },
        h('div', { class: 'prompt-img' }, H3A.ui.picture(ctx.lessonId, it.img, it.example)),
        h('div', { class: 'phrase-parts' }, it.parts.map(function (x, i) {
          return h('button', { type: 'button', class: 'phrase-part part-' + i, onclick: function () { H3A.tts.speak(x.text); } },
            h('span', { class: 'part-text' }, x.text), x.role ? h('span', { class: 'part-role' }, x.role) : null);
        })),
        F.sayLine('用「怎麼樣」的字，加上「的」，再加上東西，就能把東西說得更清楚。'));
    }, say);
  }
  function wordsSlide(ctx, p) {
    return F.learn('認識語詞', function () {
      return h('div', { class: 'word-grid vocab-grid' }, p.words.map(function (w) {
        return h('div', { class: 'word-card learn-word' }, H3A.ui.picture(ctx.lessonId, w.img, w.word),
          h('strong', {}, w.word, H3A.ui.speaker(w.word, null)), F.sayLine(w.meaning));
      }));
    }, p.words.map(function (w) { return w.word + '，' + w.meaning; }).join(''));
  }

  H3A.pages.phrase = function run(main, ctx) {
    var p = ctx.words && ctx.words.phrase; if (!p) return F.missing(main);
    var retry = ctx.params && ctx.params.retry;
    if (retry) {
      var s = p.say.filter(function (x) { return x.id === retry; })[0], m = p.make.filter(function (x) { return x.id === retry; })[0];
      if (s || m) return F.retry(main, ctx, s ? sayQ(s) : makeQ(m));
    }
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [introSlide(ctx, p)]
      .concat(H3A.quizgen.shuffle(p.pick, r).map(function (x) { return Q.phrasePickQuestion(x, r); }))
      .concat(p.say.map(sayQ))
      .concat([wordsSlide(ctx, p)])
      .concat(H3A.quizgen.shuffle(p.choose, r).map(function (x) { return Q.chooseQuestion(x, r); }))
      .concat(p.make.map(makeQ));
    F.run(main, ctx, 'phrase', qs, function () { run(main, ctx); });
  };
})(this);
