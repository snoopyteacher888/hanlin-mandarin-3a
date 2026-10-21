/* 理解提問 */
(function (root) {
  var H3A = root.H3A;
  H3A.pages.quiz = function run(main, ctx) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var questions = ctx.lesson.quiz.map(function (q) { return H3A.quizgen.prepare(q, r); });
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      H3A.ui.finishActivity(main, ctx, 'quiz', summary, function () { run(main, ctx); }, true);
    } });
  };
})(this);
