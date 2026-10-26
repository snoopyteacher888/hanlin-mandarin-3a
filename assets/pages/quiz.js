/* 理解提問：照課本學習單的分類分步驟——提取訊息 → 推論訊息 → 詮釋整合 → 比較評估。
   每題屬於哪一類寫在字詞資料的 quizLevels（只有題號）；「說說你的想法」（🎤，老師批改）放在它所屬的那一類 */
(function (root) {
  var H3A = root.H3A;
  function talkQ(t) { return H3A.wordq.speakQuestion(t, { kind: 'free', min: t.min || 6 }, t.prompt); }
  var LEVELS = [
    /* 小標用孩子聽得懂的說法（老師要求：學生不懂「提取訊息、推論訊息、詮釋整合、比較評估」） */
    { key: 'extract', name: '找答案', say: '答案就寫在課文裡，回去課文找一找。' },
    { key: 'infer', name: '動動腦', say: '課文沒有直接寫出來，要動動腦想一想。' },
    { key: 'interpret', name: '前後連起來', say: '把課文前面和後面連起來，想一想整課在說什麼。' },
    { key: 'evaluate', name: '我的看法', say: '說說你自己的想法和看法。' }
  ];
  H3A.pages.quiz = function run(main, ctx) {
    var talk = ctx.lesson.talk || [];
    var retry = ctx.params && ctx.params.retry;
    var t = talk.filter(function (x) { return x.id === retry; })[0];
    if (t) return H3A.ui.flow.retry(main, ctx, talkQ(t));
    var levels = (ctx.words && ctx.words.quizLevels) || {};
    function lv(id, fallback) { return levels[id] || fallback; }
    function prep(q, r) {
      var x = H3A.quizgen.prepare(q, r);
      /* 選項不放圖，一個選項一行比較好讀 */
      x.list = true;
      return x;
    }
    var steps = LEVELS.map(function (L) {
      var qs = ctx.lesson.quiz.filter(function (q) { return lv(q.id, 'extract') === L.key; });
      var ts = talk.filter(function (x) { return lv(x.id, 'evaluate') === L.key; });
      if (!qs.length && !ts.length) return {};
      return { key: L.key, name: L.name, say: L.say, make: function (r) { return qs.map(function (q) { return prep(q, r); }).concat(ts.map(talkQ)); } };
    });
    H3A.ui.runSteps(main, ctx, 'quiz', steps, function () { run(main, ctx); });
  };
})(this);
