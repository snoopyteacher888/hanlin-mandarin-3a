/* 生字語詞：每個生字再學一個語詞。分兩半，每半先認識 7 個語詞，再看句子選語詞 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow;
  var HALF = 7;

  function backSay(c) { return c.word + '：' + c.meaning + (c.charMeaning ? c.char + '：' + c.charMeaning : ''); }
  /* 翻翻卡：正面是圖、生字、語詞；點一下翻到背面看意思。每張都翻過才出現「下一步」 */
  function learnSlide(ctx, list, n) {
    return F.learn('認識生字語詞（' + n + '）：點卡片翻翻看', function (ready) {
      var seen = {};
      return h('div', { class: 'flip-grid' }, list.map(function (c) {
        var card = h('button', { type: 'button', class: 'flip-card', 'data-id': c.id, 'aria-label': c.word + '，點一下翻面' },
          h('span', { class: 'flip-inner' },
            h('span', { class: 'flip-front' },
              h('span', { class: 'flip-pic' }, H3A.ui.picture(ctx.lessonId, c.img, c.word)),
              h('span', { class: 'flip-char' }, c.char),
              h('span', { class: 'flip-word' }, c.word)),
            h('span', { class: 'flip-back' },
              h('span', { class: 'flip-word' }, c.word),
              h('span', { class: 'flip-mean' }, c.meaning),
              c.charMeaning ? h('span', { class: 'flip-charmean' }, h('span', { class: 'char-mark' }, c.char), '：' + c.charMeaning) : null)));
        card.onclick = function () {
          var back = !card.classList.contains('flipped');
          card.classList.toggle('flipped', back);
          H3A.tts.speak(back ? backSay(c) : c.char + '，' + c.word);
          if (back && !seen[c.id]) {
            seen[c.id] = true;
            if (Object.keys(seen).length === list.length) ready();
          }
        };
        return h('div', { class: 'flip-wrap' }, card, H3A.ui.speaker(c.word, null));
      }));
    }, '點一點卡片，翻過來看看意思。每一張都翻過，就可以按下一步。', null, true);
  }

  H3A.pages.charword = function run(main, ctx) {
    var list = ctx.words && ctx.words.charwords; if (!list) return F.missing(main);
    var chars = ctx.words.hanzi.map(function (x) { return x.char; });
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var qs = [];
    for (var i = 0; i < list.length; i += HALF) {
      var part = list.slice(i, i + HALF);
      qs.push(learnSlide(ctx, part, i / HALF + 1));
      qs = qs.concat(H3A.quizgen.shuffle(part, r).map(function (c) { return H3A.wordq.charWordQuestion(c, r, chars); }));
    }
    F.run(main, ctx, 'charword', qs, function () { run(main, ctx); });
  };
})(this);
