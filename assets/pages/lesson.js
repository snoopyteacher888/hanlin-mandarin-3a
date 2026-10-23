/* 課次頁：分「閱讀理解」「字詞練習」兩區；錯題複習只有在有題目可以複習時才出現 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var SECTIONS = [
    { title: '📖 閱讀理解', cards: [{ a: 'map', icon: '🗺️' }, { a: 'quiz', icon: '❓' }] },
    { title: '✏️ 字詞練習', words: true, cards: [{ a: 'hanzi', icon: '✍️' }, { a: 'vocab', icon: '📚' }, { a: 'charword', icon: '🔤' }, { a: 'similar', icon: '🔍' }, { a: 'listen', icon: '👂' },
      { a: 'phrase', icon: '📒' }, { a: 'pattern', icon: '🧩' }, { a: 'rhetoric', icon: '🎨' }, { a: 'challenge', icon: '🎮' }, { a: 'idiom', icon: '📜' }] },
    { title: '🌟 複習與測驗', cards: [{ a: 'review', icon: '🔁' }, { a: 'test', icon: '📝' }] }
  ];
  /* 字詞活動要用到的資料；這一課沒有就不顯示（例如第 7 課沒有句型） */
  var NEEDS = { hanzi: 'hanzi', vocab: 'vocab', charword: 'charwords', similar: 'similar', listen: 'listen', phrase: 'phrase',
    pattern: 'pattern', rhetoric: 'rhetoric', challenge: 'hanzi', idiom: 'idioms' };
  function hasData(words, a) {
    var k = NEEDS[a]; if (!k) return true;
    var v = words && words[k];
    return !!v && (!Array.isArray(v) || v.length > 0);
  }
  function starsText(n) { return n ? '⭐'.repeat(n) : ''; }
  H3A.pages.lesson = function (main, ctx) {
    var prog = (H3A.session.progress(ctx.student)[ctx.lessonId]) || {};
    var stars = prog.stars || {};
    var dueCount = H3A.review.due(H3A.session.reviewQueue(ctx.student), H3A.review.todayStr(new Date())).length;
    /* 老師批改過說說看的句子，就在最上面出現「老師的批改」 */
    var fbSlot = h('div', { class: 'fb-banner-slot' });
    main.appendChild(fbSlot);
    H3A.feedback.unseenCount(ctx).then(function (n) {
      if (!n.total) return;
      var text = n.unseen ? '老師批改了 ' + n.unseen + ' 題' : '老師的批改';
      fbSlot.appendChild(h('div', { class: 'fb-banner' + (n.unseen ? ' new' : '') },
        h('button', { type: 'button', class: 'btn-primary', onclick: function () { ctx.go('#/' + ctx.lessonId + '/feedback'); } }, H3A.ui.teacherFace(), text),
        H3A.ui.speaker(text, null)));
    });
    SECTIONS.forEach(function (sec) {
      if (sec.words && !ctx.words) return;
      var grid = h('div', { class: 'activity-grid' });
      sec.cards.forEach(function (c) {
        if (c.a === 'review' && !dueCount) return;
        if (sec.words && !hasData(ctx.words, c.a)) return;
        var name = H3A.pages.activityTitle(c.a);
        var extra = c.a === 'review' ? dueCount + ' 題' :
          c.a === 'test' && prog.tests && prog.tests.length ? '上次 ' + prog.tests[prog.tests.length - 1].score + ' 分' : starsText(stars[c.a]);
        grid.appendChild(h('div', { class: 'activity-card' },
          h('button', { type: 'button', class: 'activity-main', 'data-activity': c.a, onclick: function () { ctx.go('#/' + ctx.lessonId + '/' + c.a); } },
            H3A.ui.activityIcon(c.a, c.icon),
            h('span', { class: 'activity-name' }, name),
            h('span', { class: 'activity-extra' }, extra)),
          H3A.ui.speaker(name, null)));
      });
      main.appendChild(h('section', { class: 'menu-section' }, h('h2', { class: 'menu-title' }, sec.title), grid));
    });
  };
})(this);
