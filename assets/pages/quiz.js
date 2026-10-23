/* 理解提問：選擇題做完，最後是「說說你的想法」（🎤，老師批改） */
(function (root) {
  var H3A = root.H3A;
  function talkQ(t) { return H3A.wordq.speakQuestion(t, { kind: 'free', min: t.min || 6 }, t.prompt); }
  H3A.pages.quiz = function run(main, ctx) {
    var talk = ctx.lesson.talk || [];
    var retry = ctx.params && ctx.params.retry;
    var t = talk.filter(function (x) { return x.id === retry; })[0];
    if (t) return H3A.ui.flow.retry(main, ctx, talkQ(t));
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var questions = ctx.lesson.quiz.map(function (q) {
      var x = H3A.quizgen.prepare(q, r);
      /* 沒有圖的選項文字比較長，一個選項一行比較好讀 */
      if (!x.options.some(function (o) { return o.img; })) x.list = true;
      return x;
    }).concat(talk.map(talkQ));
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      H3A.ui.finishActivity(main, ctx, 'quiz', summary, function () { run(main, ctx); }, true);
    } });
  };
})(this);
