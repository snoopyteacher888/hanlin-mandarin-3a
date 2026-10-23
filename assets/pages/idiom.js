/* 生字變成語：兩個成語一組，先認識（意思＋例句），再排字；最後用生活情境題把六個成語混在一起考 */
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
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [];
    for (var i = 0; i < list.length; i += GROUP) {
      var part = list.slice(i, i + GROUP);
      qs.push(learnSlide(part));
      part.forEach(function (x) { qs.push(Q.idiomOrderQuestion(x, r)); if (x.fill) qs.push(Q.idiomFillQuestion(x, r)); });
    }
    qs = qs.concat(H3A.quizgen.shuffle(list, r).map(function (x) { return Q.idiomSituationQuestion(x, list, r); }));
    F.run(main, ctx, 'idiom', qs, function () { run(main, ctx); });
  };
})(this);
