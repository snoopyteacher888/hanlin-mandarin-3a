/* 修辭：四張認識卡（擬人、譬喻、疊字、設問）→ 聽句子選修辭 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function cardSlide(c) {
    return F.learn('認識修辭：' + c.name, function () {
      return h('div', { class: 'learn-box rhetoric-card' },
        h('h3', {}, c.name, H3A.ui.speaker(c.name, null)),
        F.sayLine(c.meaning),
        h('p', { class: 'learn-label' }, '📖 課文裡'),
        F.sayLine(c.example, 'example'),
        h('p', { class: 'learn-label' }, '🏠 生活中'),
        (c.life || []).map(function (e) { return F.sayLine(e, 'example'); }));
    }, c.name + '。' + c.meaning);
  }

  H3A.pages.rhetoric = function run(main, ctx) {
    var rh = ctx.words && ctx.words.rhetoric; if (!rh) return F.missing(main);
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = rh.cards.map(cardSlide)
      .concat(H3A.quizgen.shuffle(rh.quiz, r).map(function (x) { return Q.rhetoricQuestion(x, rh.cards, r); }));
    F.run(main, ctx, 'rhetoric', qs, function () { run(main, ctx); });
  };
})(this);
