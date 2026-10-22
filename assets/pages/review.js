/* 錯題複習：只出已經隔一天以上的錯題；連續 2 次第一次就答對才移除 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  H3A.pages.review = function run(main, ctx) {
    var today = H3A.review.todayStr(new Date());
    var due = H3A.review.due(H3A.session.reviewQueue(ctx.student), today);
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    /* 閱讀題要有解鎖的課文；字詞題不用 */
    var questions = [];
    due.forEach(function (id) {
      var q = ctx.words ? H3A.wordq.findWordQuestion(ctx.words, id, r) : null;
      if (!q && ctx.lesson) q = H3A.reviewgen.buildReviewQuestions(ctx.lesson, [id], r)[0] || null;
      if (q) questions.push(q);
    });
    if (!questions.length) {
      H3A.ui.clear(main);
      main.appendChild(h('div', { class: 'result' }, h('h2', {}, '今天沒有要複習的題目 🎉', H3A.ui.speaker('今天沒有要複習的題目', null)),
        h('button', { type: 'button', class: 'btn-primary', onclick: function () { ctx.go('#/' + ctx.lessonId); } }, '回到第 ' + parseInt(ctx.lessonId.slice(1), 10) + ' 課')));
      return;
    }
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      var q = H3A.session.reviewQueue(ctx.student);
      summary.items.forEach(function (it) { q = H3A.review.recordReview(q, it.q, it.result === 'first', today); });
      H3A.session.saveReviewQueue(ctx.student, q);
      H3A.ui.finishActivity(main, ctx, 'review', summary, function () { ctx.go('#/' + ctx.lessonId); }, false);
    } });
  };
})(this);
