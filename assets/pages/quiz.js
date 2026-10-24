/* 理解提問：照課文順序分成三步（每一步標出是第幾段到第幾段），最後一步是「說說你的想法」（🎤，老師批改） */
(function (root) {
  var H3A = root.H3A;
  function talkQ(t) { return H3A.wordq.speakQuestion(t, { kind: 'free', min: t.min || 6 }, t.prompt); }
  var PARTS = 3;
  /* 依題目根據的段落，照順序平均分成三組 */
  function groups(lesson) {
    var qs = lesson.quiz.map(function (q) {
      var loc = H3A.locate ? H3A.locate.locate(lesson, q.evidence) : { paras: [] };
      return { q: q, para: loc.paras.length ? Math.min.apply(null, loc.paras) : 0 };
    });
    var n = Math.min(PARTS, qs.length), out = [];
    for (var i = 0, at = 0; i < n; i++) {
      var size = Math.ceil((qs.length - at) / (n - i)), part = qs.slice(at, at + size); at += size;
      var ps = part.map(function (x) { return x.para; }).filter(function (x) { return x; });
      var lo = ps.length ? Math.min.apply(null, ps) : 0, hi = ps.length ? Math.max.apply(null, ps) : 0;
      out.push({ list: part.map(function (x) { return x.q; }), name: lo ? (lo === hi ? '第 ' + lo + ' 段' : '第 ' + lo + '～' + hi + ' 段') : '第 ' + (i + 1) + ' 部分' });
    }
    return out;
  }
  H3A.pages.quiz = function run(main, ctx) {
    var talk = ctx.lesson.talk || [];
    var retry = ctx.params && ctx.params.retry;
    var t = talk.filter(function (x) { return x.id === retry; })[0];
    if (t) return H3A.ui.flow.retry(main, ctx, talkQ(t));
    function prep(q, r) {
      var x = H3A.quizgen.prepare(q, r);
      /* 沒有圖的選項文字比較長，一個選項一行比較好讀 */
      if (!x.options.some(function (o) { return o.img; })) x.list = true;
      return x;
    }
    var steps = groups(ctx.lesson).map(function (g, i) {
      return { key: 'p' + (i + 1), name: g.name, say: '讀一讀課文' + g.name + '，回答問題。', make: function (r) { return g.list.map(function (q) { return prep(q, r); }); } };
    });
    if (talk.length) steps.push({ key: 'talk', name: '說說你的想法', say: '按麥克風，說說你的想法，老師會批改。', make: function () { return talk.map(talkQ); } });
    H3A.ui.runSteps(main, ctx, 'quiz', steps, function () { run(main, ctx); });
  };
})(this);
