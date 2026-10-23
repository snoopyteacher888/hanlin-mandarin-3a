/* 字詞練習：生字、語詞（分步驟）、形近字、聽聽看 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow;
  function rng() { return H3A.quizgen.rng(Date.now() & 0xffffffff); }
  function practice(main, ctx, activity, questions, again) {
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      H3A.ui.finishActivity(main, ctx, activity, summary, again, false);
    } });
  }
  function missing(main) { main.appendChild(h('p', { class: 'notice' }, '這一課的字詞練習還沒準備好。')); }
  function shuffle(list, r) { return H3A.quizgen.shuffle(list, r); }

  /* 組合字的說明頁 */
  function buildIntro() {
    return F.learn('組合字', function () {
      return h('div', { class: 'learn-box combo-intro' },
        h('div', { class: 'combo-row' },
          h('div', { class: 'combo-ex' }, h('span', { class: 'combo-stack tb' }, h('span', { class: 'parts-chip' }, '黑'), h('span', { class: 'parts-chip' }, '土')),
            h('span', { class: 'parts-op' }, '→'), h('span', { class: 'parts-chip parts-result' }, '墨'), h('span', { class: 'combo-tag' }, '上下組合')),
          h('div', { class: 'combo-ex' }, h('span', { class: 'combo-stack lr' }, h('span', { class: 'parts-chip' }, '木'), h('span', { class: 'parts-chip' }, '幾')),
            h('span', { class: 'parts-op' }, '→'), h('span', { class: 'parts-chip parts-result' }, '機'), h('span', { class: 'combo-tag' }, '左右組合'))),
        F.sayLine('有的字是上下組合，有的字是左右組合。看看少了哪一塊，把字組起來！'));
    }, '有的字是上下組合，像墨，上面是黑，下面是土。有的字是左右組合，像機，左邊是木，右邊是幾。看看少了哪一塊，把字組起來！');
  }

  H3A.pages.hanzi = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var PER = 5, pages = Math.ceil(w.hanzi.length / PER);
    var builds = w.hanzi.filter(function (x) { return x.build; });
    H3A.ui.runSteps(main, ctx, 'hanzi', [
      { key: 'learn', name: '認識生字', say: '點一點每一張卡片，聽聽這個字是怎麼組成的。', make: function () {
        var qs = [];
        for (var i = 0; i < w.hanzi.length; i += PER) {
          (function (part, n) {
            qs.push(F.learn('認識生字（' + n + '／' + pages + '）：點一點卡片', function (ready) {
              var heard = {};
              return h('div', { class: 'hl-list' }, part.map(function (x) {
                return H3A.ui.hanziLearnCard(ctx.lessonId, x, function () { heard[x.id] = true; if (Object.keys(heard).length === part.length) ready(); });
              }));
            }, '點一點每一張卡片，聽聽這個字是怎麼組成的。每一張都點過，就可以按下一步。', null, true));
          })(w.hanzi.slice(i, i + PER), i / PER + 1);
        }
        return qs;
      } },
      { key: 'pick', name: '拖字填空', say: '把正確的字拖到空格裡。', make: function (r) {
        return shuffle(w.hanzi, r).map(function (x) { return F.dragify(H3A.wordq.hanziQuestion(x, r)); });
      } },
      builds.length ? { key: 'build', name: '組合字', say: '看看少了哪一塊，把字組起來。', make: function (r) {
        return [buildIntro()].concat(shuffle(builds, r).map(function (x) { return H3A.wordq.buildQuestion(x, r); }));
      } } : {},
      w.fix ? { key: 'fix', name: '改錯字', say: '句子裡有一個字寫錯了，找出來，改成正確的字。', make: function (r) {
        return shuffle(w.fix, r).map(function (x) { return H3A.wordq.fixQuestion(x, r); });
      } } : {}
    ], function () { run(main, ctx); });
  };

  H3A.pages.vocab = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var pics = w.vocab.filter(function (v) { return v.img && !v.noPic; });
    H3A.ui.runSteps(main, ctx, 'vocab', [
      { key: 'cards', name: '看語詞卡', say: '點一張語詞卡，看看圖片，聽聽意思。', make: function () {
        return [F.learn('語詞卡：點一張看看', function () { return H3A.ui.vocabCards(ctx.lessonId, w.vocab); }, '點一張語詞卡，看看圖片，聽聽意思。')];
      } },
      pics.length ? { key: 'picmatch', name: '圖片連連看', say: '從圖片拉一條線，連到對的語詞。', make: function (r) {
        return F.matchRounds('vm', '連連看：從圖片拉一條線，連到對的語詞', shuffle(pics, r), 4, function (v) {
          return { id: v.id, left: { text: v.word, img: v.img }, right: { text: v.word }, say: v.word };
        });
      } } : {},
      { key: 'choose', name: '選語詞', say: '看圖或看句子，選出正確的語詞。', make: function (r) {
        return shuffle(w.vocab, r).map(function (x, i) { return F.dragify(H3A.wordq.vocabQuestion(x, H3A.wordq.vocabKind(x, i % 2), r)); });
      } },
      pics.length >= 3 ? { key: 'memory', name: '翻牌配對', say: '翻開兩張牌，找出一樣的圖片和語詞。', custom: function (stage, c, done) {
        H3A.ui.memoryGame(stage, c, pics, done);
      } } : {}
    ], function () { run(main, ctx); });
  };
  H3A.pages.similar = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var r = rng();
    practice(main, ctx, 'similar', shuffle(w.similar, r).map(function (x) { return F.dragify(H3A.wordq.similarQuestion(F.plainSimilar(x), r)); }), function () { run(main, ctx); });
  };
  H3A.pages.listen = function run(main, ctx) {
    var w = ctx.words; if (!w) return missing(main);
    var r = rng();
    practice(main, ctx, 'listen', shuffle(w.listen, r).map(function (x) { return H3A.wordq.listenQuestion(x, r); }), function () { run(main, ctx); });
  };
})(this);
