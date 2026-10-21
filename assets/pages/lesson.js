/* 課次頁：5 個活動；錯題複習只有在有題目可以複習時才出現 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var CARDS = [
    { a: 'read', icon: '📖' }, { a: 'map', icon: '🗺️' }, { a: 'quiz', icon: '❓' },
    { a: 'review', icon: '🔁' }, { a: 'test', icon: '📝' }
  ];
  function starsText(n) { return n ? '⭐'.repeat(n) : ''; }
  H3A.pages.lesson = function (main, ctx) {
    var prog = (H3A.session.progress(ctx.student)[ctx.lessonId]) || {};
    var stars = prog.stars || {};
    var dueCount = H3A.review.due(H3A.session.reviewQueue(ctx.student), H3A.review.todayStr(new Date())).length;
    var grid = h('div', { class: 'activity-grid' });
    CARDS.forEach(function (c) {
      if (c.a === 'review' && !dueCount) return;
      var name = H3A.pages.activityTitle(c.a);
      var extra = c.a === 'review' ? dueCount + ' 題' :
        c.a === 'test' && prog.tests && prog.tests.length ? '上次 ' + prog.tests[prog.tests.length - 1].score + ' 分' : starsText(stars[c.a]);
      grid.appendChild(h('div', { class: 'activity-card' },
        h('button', { type: 'button', class: 'activity-main', 'data-activity': c.a, onclick: function () { ctx.go('#/' + ctx.lessonId + '/' + c.a); } },
          h('span', { class: 'activity-icon', 'aria-hidden': 'true' }, c.icon),
          h('span', { class: 'activity-name' }, name),
          h('span', { class: 'activity-extra' }, extra)),
        H3A.ui.speaker(name, null)));
    });
    main.appendChild(grid);
  };
})(this);
