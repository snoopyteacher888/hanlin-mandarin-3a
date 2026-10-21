/* 單元測驗：隨機 8 題、不給提示，分數存最近 3 次 */
(function (root) {
  var H3A = root.H3A;
  var COUNT = 8;
  H3A.pages.test = function run(main, ctx) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var pool = ctx.lesson.quiz.concat(ctx.lesson.testExtra);
    var questions = H3A.quizgen.pickN(pool, COUNT, r).map(function (q) { return H3A.quizgen.prepare(q, r); });
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'test', onDone: function (summary) {
      H3A.session.saveTestScore(ctx.student, ctx.lessonId, summary.score, H3A.review.todayStr(new Date()));
      H3A.ui.finishActivity(main, ctx, 'test', summary, function () { run(main, ctx); }, true);
    } });
  };
})(this);
