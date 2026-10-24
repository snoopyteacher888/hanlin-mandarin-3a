/* 句型：先選句型，再分五步：認識句型 → 前後配對 → 拖拉造句 → 說後半句 → 自己說一句 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function halfQ(pt, x) { return Q.speakQuestion(x, { kind: 'pattern', key: pt.key, front: x.front }, '說說看：把句子說完'); }
  function wholeQ(pt, x) { return Q.speakQuestion(x, { kind: 'pattern', key: pt.key }, '用「' + pt.title + '」說一句話'); }

  /* 句型公式：🟧關聯詞、🟦條件（假設）、🟩結果 */
  var FORMULA = {
    zhiyao: [['只要', 'conj'], ['要做到的事', 'cond'], ['就', 'conj'], ['會有的結果', 'res1']],
    ruguo: [['如果', 'conj'], ['假設做了什麼事', 'cond'], ['不但', 'conj'], ['第一個結果', 'res1'], ['還', 'conj'], ['第二個結果', 'res2']]
  };
  var LABEL = { zhiyao: { cond: '條件', res1: '結果' }, ruguo: { cond: '假設', res1: '結果一', res2: '結果二' } };

  function formulaRow(key) {
    return h('div', { class: 'pt-formula' }, FORMULA[key].map(function (f) {
      return h('span', { class: 'pt-chip ' + f[1] }, f[0]);
    }));
  }
  /* 例句切成色塊：關聯詞（如果、不但、還、只要、就）是獨立的橘色框，跟上面的公式一樣；
     其他的字放在藍／綠色塊裡，下面標「條件／結果」 */
  function clauseBlocks(text, key) {
    var out = [];
    Q.patternClauses(text, key).forEach(function (c) {
      var labeled = false;
      c.parts.forEach(function (p) {
        if (p.conj) { out.push(h('span', { class: 'pt-chip conj pt-conj-chip' }, p.text)); return; }
        out.push(h('span', { class: 'pt-block ' + c.kind },
          h('span', { class: 'pt-text' }, p.text),
          h('span', { class: 'pt-label' }, labeled ? '' : (LABEL[key][c.kind] || ''))));
        labeled = true;
      });
    });
    return h('div', { class: 'pt-sentence' }, out, H3A.ui.speaker(text, null));
  }

  function introSlide(ctx, pt) {
    return F.learn('認識句型：' + pt.title, function () {
      return h('div', { class: 'learn-box' },
        formulaRow(pt.key),
        h('div', { class: 'prompt-img' }, H3A.ui.picture(ctx.lessonId, pt.img, pt.title)),
        F.sayLine(pt.meaning),
        h('p', { class: 'learn-label' }, '📝 例句'),
        pt.examples.map(function (e) { return clauseBlocks(e, pt.key); }));
    }, pt.title.replace(/…+/g, '，') + '。' + pt.meaning + '例如：' + pt.examples.join(''), pt.title);
  }

  function choose(main, ctx, list) {
    var say = '你想練習哪一個句型？';
    main.appendChild(h('div', { class: 'prompt' }, H3A.ui.sayable(h('h2', {}, say), say)));
    main.appendChild(h('div', { class: 'activity-grid' }, list.map(function (pt) {
      return h('div', { class: 'activity-card' },
        h('button', { type: 'button', class: 'activity-main', 'data-pattern': pt.key, onclick: function () { ctx.go('#/' + ctx.lessonId + '/pattern?p=' + pt.key); } },
          H3A.ui.activityIcon('pattern', '🧩'), h('span', { class: 'activity-name' }, pt.title)),
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
    var S = H3A.quizgen.shuffle;
    H3A.ui.runSteps(main, ctx, 'pattern', [
      { key: 'intro', name: '認識句型', say: '看一看「' + pt.title + '」怎麼用。', make: function () { return [introSlide(ctx, pt)]; } },
      { key: 'match', name: '前後配對', say: '看圖，選出接在後面最合理的句子。', make: function (r) { return S(pt.match, r).map(function (y) { return Q.matchQuestion(y, r); }); } },
      { key: 'fill', name: '拖拉造句', say: '把句子的每一塊拖到對的空格裡。', make: function (r) {
        return S(pt.conj, r).map(function (y) { return y.full ? Q.patternFillQuestion(y, pt.key, r) : Q.conjQuestion(y, r); });
      } },
      { key: 'half', name: '說後半句', say: '前半句已經說好了，把後半句說完。', make: function () { return pt.half.map(function (y) { return halfQ(pt, y); }); } },
      { key: 'whole', name: '自己說一句', say: '用「' + pt.title + '」自己說一句話。', make: function () { return pt.whole.map(function (y) { return wholeQ(pt, y); }); } }
    ], function () { run(main, ctx); }, { backHash: '#/' + ctx.lessonId + '/pattern', backText: '回到句型' });
  };
})(this);
