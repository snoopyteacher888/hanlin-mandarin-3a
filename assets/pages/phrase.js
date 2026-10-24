/* 短語短句：分步驟——認識短語 → 看圖選疊字 → 看圖說說看。
   課本「短句」用語詞造句的部分（例如混合、斷裂），老師要求放到「學會語詞」裡（sentenceSteps） */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow, Q = H3A.wordq;

  function sayQ(x) { return Q.speakQuestion(x, { kind: 'phrase', accept: x.accept }, '看圖說說看：這是什麼樣的' + x.noun + '？'); }
  function makeQ(x) { return Q.speakQuestion(x, { kind: 'word', word: x.word, min: 6 }, '用「' + x.word + '」說一句話'); }

  function introSlide(ctx, p) {
    var it = p.intro;
    var say = it.example + '。' + it.parts.map(function (x) { return x.role ? x.text + '，' + x.role : x.text; }).join('，') +
      '。「' + it.parts[0].text + '」是用來形容東西的樣子，加上「的」，再說出是什麼東西，就能把東西說得更清楚。';
    return F.learn('認識短語：' + it.example, function () {
      return h('div', { class: 'learn-box' },
        h('div', { class: 'prompt-img' }, H3A.ui.picture(ctx.lessonId, it.img, it.example)),
        h('div', { class: 'phrase-parts' }, it.parts.map(function (x, i) {
          return h('button', { type: 'button', class: 'phrase-part part-' + i, onclick: function () { H3A.tts.speak(x.text); } },
            h('span', { class: 'part-text' }, x.text), x.role ? h('span', { class: 'part-role' }, x.role) : null);
        })),
        F.sayLine('「' + it.parts[0].text + '」是用來形容東西的樣子，加上「的」，再說出是什麼東西，就能把東西說得更清楚。'));
    }, say, it.example);
  }
  function wordsSlide(ctx, p) {
    return F.learn('認識語詞：' + p.words.map(function (w) { return w.word; }).join('、'), function () {
      return h('div', { class: 'word-grid vocab-grid' }, p.words.map(function (w) {
        return h('div', { class: 'word-card learn-word' }, H3A.ui.picture(ctx.lessonId, w.img, w.word),
          h('strong', {}, w.word, H3A.ui.speaker(w.word, null)), F.sayLine(w.meaning));
      }));
    }, p.words.map(function (w) { return w.word + '，' + w.meaning; }).join(''));
  }

  /* 課本「短句」的部分（用課本語詞造句）放在「學會語詞」裡，這裡提供給 words.js 用 */
  H3A.pages.sentenceSteps = function (ctx, p) {
    if (!p || !p.words || !p.words.length) return [{}];
    var names = p.words.map(function (w) { return w.word; });
    /* 「語詞用得對」老師要求拿掉；造句前先看語詞卡 */
    return [
      (p.make || []).length ? { key: 'make', name: '用語詞造句', say: '先認識「' + names.join('」「') + '」，再用它說一句話。', make: function () {
        return [wordsSlide(ctx, p)].concat(p.make.map(makeQ));
      } } : {}
    ];
  };
  H3A.pages.sentenceRetry = function (main, ctx, p, id) {
    var m = p && (p.make || []).filter(function (x) { return x.id === id; })[0];
    if (!m) return false;
    F.retry(main, ctx, makeQ(m)); return true;
  };
  H3A.pages.phrase = function run(main, ctx) {
    var p = ctx.words && ctx.words.phrase; if (!p) return F.missing(main);
    var retry = ctx.params && ctx.params.retry;
    if (retry) {
      var s = p.say.filter(function (x) { return x.id === retry; })[0], m = p.make.filter(function (x) { return x.id === retry; })[0];
      if (s || m) return F.retry(main, ctx, s ? sayQ(s) : makeQ(m));
    }
    var S = H3A.quizgen.shuffle;
    H3A.ui.runSteps(main, ctx, 'phrase', [
      { key: 'intro', name: '認識短語', say: '看一看，短語是怎麼組成的。', make: function () { return [introSlide(ctx, p)]; } },
      { key: 'pick', name: '看圖選疊字', say: '看圖，選出最適合的疊字。', make: function (r) {
        return S(p.pick, r).map(function (x) { return Q.phrasePickQuestion(x, r); });
      } },
      p.say.length ? { key: 'say', name: '看圖說說看', say: '看圖，用短語說說看。', make: function () { return p.say.map(sayQ); } } : {}
    ], function () { run(main, ctx); });
  };
})(this);
