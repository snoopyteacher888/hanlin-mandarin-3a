/* 生字變成語：分步驟——看成語卡、排成語、放進句子、看情境選成語、配對遊戲 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;
  var GROUP = 2;

  function hl(text, ch) {
    return text.split(ch).reduce(function (acc, part, i) { if (i) acc.push(h('span', { class: 'char-mark' }, ch)); if (part) acc.push(part); return acc; }, []);
  }
  function learnSlide(list) {
    return F.learn('認識成語：' + list.map(function (x) { return x.idiom; }).join('、'), function () {
      return h('div', { class: 'idiom-list' }, list.map(function (x) {
        return h('div', { class: 'idiom-card' },
          h('div', { class: 'idiom-head' }, h('span', { class: 'idiom-word' }, hl(x.idiom, x.char)), H3A.ui.speaker(x.idiom, null),
            h('span', { class: 'idiom-from' }, '生字「' + x.char + '」')),
          H3A.ui.infoLine('意思：', x.meaning, x.meaning),
          H3A.ui.infoLine('💬 ', hl(x.example, x.idiom), x.example, '例句'));
      }));
    }, list.map(function (x) { return x.idiom + '。意思是：' + x.meaning + '例如：' + x.example; }).join(''));
  }

  H3A.pages.idiom = function run(main, ctx) {
    var list = ctx.words && ctx.words.idioms; if (!list) return F.missing(main);
    var fills = list.filter(function (x) { return x.fill; });
    H3A.ui.runSteps(main, ctx, 'idiom', [
      { key: 'cards', name: '看成語卡', say: '聽聽每個成語的意思和例句。', make: function () {
        var qs = [];
        for (var i = 0; i < list.length; i += GROUP) qs.push(learnSlide(list.slice(i, i + GROUP)));
        return qs;
      } },
      { key: 'order', name: '排成語', say: '看意思，把字排成成語。', make: function (r) {
        return H3A.quizgen.shuffle(list, r).map(function (x) { return Q.idiomOrderQuestion(x, r); });
      } },
      fills.length ? { key: 'fill', name: '放進句子', say: '把成語拖到適合的句子裡。', make: function (r) {
        return H3A.quizgen.shuffle(fills, r).map(function (x) {
          var q = Q.idiomFillQuestion(x, r);
          q.dragChip = x.idiom;
          q.prompt = '把「' + x.idiom + '」拖到適合的句子裡。';
          q.say = '把' + x.idiom + '拖到適合的句子裡。';
          return q;
        });
      } } : {},
      { key: 'situation', name: '看情境選成語', say: '看圖和句子，選出正確的成語。', make: function (r) {
        return H3A.quizgen.shuffle(list, r).map(function (x) { return Q.idiomSituationQuestion(x, list, r); });
      } },
      { key: 'match', name: '配對遊戲', say: '把成語拖到它的意思上。', make: function (r) {
        return F.matchRounds('im', '配對遊戲：把成語拖到它的意思上', H3A.quizgen.shuffle(list, r), 3, function (x) {
          return { id: 'is-' + x.idiom, left: { text: x.idiom }, right: { text: x.meaning }, say: x.idiom };
        });
      } }
    ], function () { run(main, ctx); });
  };
})(this);
