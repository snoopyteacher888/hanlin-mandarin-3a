/* 字詞練習：生字、語詞、形近字、聽聽看 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  function rng() { return H3A.quizgen.rng(Date.now() & 0xffffffff); }
  function practice(main, ctx, activity, questions, again) {
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      H3A.ui.finishActivity(main, ctx, activity, summary, again, true);
    } });
  }
  function missing(main) { main.appendChild(h('p', { class: 'notice' }, '這一課的字詞練習還沒準備好。')); }
  function intro(main, title, cards, onStart) {
    H3A.ui.clear(main);
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, title), H3A.ui.speaker(title, null)));
    main.appendChild(cards);
    main.appendChild(h('div', { class: 'next-bar' }, h('button', { type: 'button', class: 'btn-next', onclick: onStart }, '開始練習 ▶')));
  }

  H3A.pages.hanzi = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    intro(main, '生字卡：點一個字看看', H3A.ui.hanziCards(w.hanzi), function () {
      var r = rng();
      practice(main, ctx, 'hanzi', H3A.quizgen.shuffle(w.hanzi, r).map(function (x) { return H3A.wordq.hanziQuestion(x, r); }), function () { run(main, ctx); });
    });
  };
  H3A.pages.vocab = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    intro(main, '語詞卡：點一張看看', H3A.ui.vocabCards(ctx.lessonId, w.vocab), function () {
      var r = rng();
      var qs = H3A.quizgen.shuffle(w.vocab, r).map(function (x, i) {
        return H3A.wordq.vocabQuestion(x, x.noPic || i % 2 ? 'meaning' : 'pic', r);
      });
      practice(main, ctx, 'vocab', qs, function () { run(main, ctx); });
    });
  };
  H3A.pages.similar = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var r = rng();
    practice(main, ctx, 'similar', H3A.quizgen.shuffle(w.similar, r).map(function (x) { return H3A.wordq.similarQuestion(x, r); }), function () { run(main, ctx); });
  };
  H3A.pages.listen = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var r = rng();
    practice(main, ctx, 'listen', H3A.quizgen.shuffle(w.listen, r).map(function (x) { return H3A.wordq.listenQuestion(x, r); }), function () { run(main, ctx); });
  };
})(this);
