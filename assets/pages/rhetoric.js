/* 修辭闖關：一關一種修辭（認識 → 看圖聽例句 → 是不是 → 二選一 → 三選一 → 四選一），四關都過了才能玩綜合挑戰 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function starKey(key) { return 'rhetoric-' + key; }
  function starsOf(ctx, key) {
    var p = H3A.session.progress(ctx.student)[ctx.lessonId] || {};
    return (p.stars || {})[starKey(key)] || 0;
  }
  function go(ctx, key) { ctx.go('#/' + ctx.lessonId + '/rhetoric' + (key ? '?p=' + key : '')); }

  function menu(main, ctx, rh) {
    var say = '修辭闖關：選一關開始';
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, say), H3A.ui.speaker(say, null)));
    var allDone = rh.cards.every(function (c) { return starsOf(ctx, c.key) > 0; });
    var grid = h('div', { class: 'activity-grid level-grid' }, rh.cards.map(function (c, i) {
      var n = starsOf(ctx, c.key);
      return h('div', { class: 'activity-card' + (n ? ' done' : '') },
        h('button', { type: 'button', class: 'activity-main', 'data-level': c.key, onclick: function () { go(ctx, c.key); } },
          h('span', { class: 'level-no' }, '第 ' + (i + 1) + ' 關'),
          h('span', { class: 'activity-name' }, c.name),
          h('span', { class: 'activity-extra' }, n ? '⭐'.repeat(n) : '')),
        H3A.ui.speaker('第' + (i + 1) + '關，' + c.name, null));
    }));
    var mixStars = starsOf(ctx, 'mix');
    grid.appendChild(h('div', { class: 'activity-card mix' + (allDone ? '' : ' locked') },
      h('button', { type: 'button', class: 'activity-main', 'data-level': 'mix', disabled: !allDone, onclick: function () { go(ctx, 'mix'); } },
        h('span', { class: 'level-no' }, allDone ? '🏆' : '🔒'),
        h('span', { class: 'activity-name' }, '綜合挑戰'),
        h('span', { class: 'activity-extra' }, allDone ? (mixStars ? '⭐'.repeat(mixStars) : '') : '四關都過了才能玩')),
      H3A.ui.speaker(allDone ? '綜合挑戰' : '綜合挑戰，四關都過了才能玩', null)));
    main.appendChild(grid);
    if (ctx.auto) H3A.tts.speak(say);
  }

  function introSlide(c) {
    return F.learn('認識修辭：' + c.name, function () {
      return h('div', { class: 'learn-box rhetoric-card' },
        F.sayLine(c.meaning),
        c.keywords ? h('div', { class: 'pt-formula keyword-row' }, h('span', { class: 'learn-label-inline' }, '🔑 關鍵詞'),
          c.keywords.map(function (k) { return h('span', { class: 'pt-chip conj' }, k); })) : null,
        F.sayLine(c.example, 'example'));
    }, c.name + '。' + c.meaning + c.example, c.name);
  }
  function showSlide(ctx, c) {
    return F.learn('看圖聽一聽', function () {
      return h('div', { class: 'learn-box rhetoric-show' },
        h('div', { class: 'show-img' }, H3A.ui.picture(ctx.lessonId, c.show.img, '')),
        F.sayLine(c.show.sentence, 'example'));
    }, c.show.sentence);
  }

  function level(main, ctx, rh, c) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [introSlide(c), showSlide(ctx, c)]
      .concat(H3A.quizgen.shuffle(c.yesno, r).map(function (y) { return Q.rhYesNoQuestion(y, c); }))
      .concat(c.pick.map(function (p) { return Q.rhPickQuestion(p, c, r); }));
    F.run(main, ctx, 'rhetoric', qs, function () { go(ctx, c.key); },
      { starKey: starKey(c.key), backHash: '#/' + ctx.lessonId + '/rhetoric', backText: '回到闖關地圖' });
  }
  function mix(main, ctx, rh) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = H3A.quizgen.shuffle(rh.quiz, r).map(function (x) { return Q.rhetoricQuestion(x, rh.cards, r); });
    F.run(main, ctx, 'rhetoric', qs, function () { go(ctx, 'mix'); },
      { starKey: starKey('mix'), backHash: '#/' + ctx.lessonId + '/rhetoric', backText: '回到闖關地圖' });
  }

  H3A.pages.rhetoric = function (main, ctx) {
    var rh = ctx.words && ctx.words.rhetoric; if (!rh) return F.missing(main);
    var key = ctx.params && ctx.params.p;
    if (key === 'mix') return mix(main, ctx, rh);
    var c = rh.cards.filter(function (x) { return x.key === key; })[0];
    if (c) return level(main, ctx, rh, c);
    menu(main, ctx, rh);
  };
})(this);
