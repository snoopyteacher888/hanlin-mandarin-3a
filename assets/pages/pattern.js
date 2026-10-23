/* 句型：先選句型，再走五步：認識 → 前後配對 → 選關聯詞 → 說後半句 → 自己說一整句 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function halfQ(pt, x) { return Q.speakQuestion(x, { kind: 'pattern', key: pt.key, front: x.front }, '說說看：把句子說完'); }
  function wholeQ(pt, x) { return Q.speakQuestion(x, { kind: 'pattern', key: pt.key }, '用「' + pt.title + '」說一句話'); }

  /* 把關聯詞標上顏色 */
  function colored(text, key) {
    var words = H3A.speechcheck.PATTERNS[key], out = [], rest = text;
    while (rest) {
      var best = -1, w = null;
      words.forEach(function (k) { var i = rest.indexOf(k); if (i >= 0 && (best < 0 || i < best)) { best = i; w = k; } });
      if (best < 0) { out.push(rest); break; }
      if (best > 0) out.push(rest.slice(0, best));
      out.push(h('span', { class: 'conj-word' }, w));
      rest = rest.slice(best + w.length);
    }
    return out;
  }

  function introSlide(ctx, pt) {
    return F.learn('認識句型：' + pt.title, function () {
      return h('div', { class: 'learn-box' },
        h('div', { class: 'prompt-img' }, H3A.ui.picture(ctx.lessonId, pt.img, pt.title)),
        F.sayLine(pt.meaning),
        h('div', { class: 'examples' }, pt.examples.map(function (e) {
          return h('p', { class: 'learn-line example' }, h('span', {}, colored(e, pt.key)), H3A.ui.speaker(e, null));
        })));
    }, pt.title.replace(/…+/g, '，') + '。' + pt.meaning + '例如：' + pt.examples.join(''));
  }

  function choose(main, ctx, list) {
    var say = '你想練習哪一個句型？';
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, say), H3A.ui.speaker(say, null)));
    main.appendChild(h('div', { class: 'activity-grid' }, list.map(function (pt) {
      return h('div', { class: 'activity-card' },
        h('button', { type: 'button', class: 'activity-main', 'data-pattern': pt.key, onclick: function () { ctx.go('#/' + ctx.lessonId + '/pattern?p=' + pt.key); } },
          h('span', { class: 'activity-icon', 'aria-hidden': 'true' }, '🧩'), h('span', { class: 'activity-name' }, pt.title)),
        H3A.ui.speaker(pt.title, pt.title.replace(/…+/g, '，')));
    })));
    if (ctx.auto) H3A.tts.speak(say);
  }

  H3A.pages.pattern = function run(main, ctx) {
    var list = ctx.words && ctx.words.pattern; if (!list) return F.missing(main);
    var params = ctx.params || {};
    if (params.retry) {
      for (var i = 0; i < list.length; i++) {
        var pt0 = list[i];
        var x = pt0.half.filter(function (y) { return y.id === params.retry; })[0];
        if (x) return F.retry(main, ctx, halfQ(pt0, x));
        x = pt0.whole.filter(function (y) { return y.id === params.retry; })[0];
        if (x) return F.retry(main, ctx, wholeQ(pt0, x));
      }
    }
    var pt = list.filter(function (y) { return y.key === params.p; })[0];
    if (!pt) return choose(main, ctx, list);
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [introSlide(ctx, pt)]
      .concat(H3A.quizgen.shuffle(pt.match, r).map(function (y) { return Q.matchQuestion(y, r); }))
      .concat(H3A.quizgen.shuffle(pt.conj, r).map(function (y) { return Q.conjQuestion(y, r); }))
      .concat(pt.half.map(function (y) { return halfQ(pt, y); }))
      .concat(pt.whole.map(function (y) { return wholeQ(pt, y); }));
    F.run(main, ctx, 'pattern', qs, function () { run(main, ctx); });
  };
})(this);
