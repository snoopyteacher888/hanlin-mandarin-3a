/* 語詞挑戰：🧩 組合字（上下組合、左右組合，選出缺的那一塊）、🃏 翻牌配對（圖片和語詞配成一對）。都不計時 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h; var F = H3A.ui.flow;
  var PAIRS = 4;

  function back(ctx) { return { starKey: null, backHash: '#/' + ctx.lessonId + '/challenge', backText: '回到語詞挑戰' }; }
  function go(ctx, key) { ctx.go('#/' + ctx.lessonId + '/challenge' + (key ? '?p=' + key : '')); }

  function menu(main, ctx) {
    var say = '語詞挑戰：選一個遊戲';
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, say), H3A.ui.speaker(say, null)));
    var p = H3A.session.progress(ctx.student)[ctx.lessonId] || {};
    var stars = p.stars || {};
    main.appendChild(h('div', { class: 'activity-grid' }, [['build', '🧩', '組合字'], ['memory', '🃏', '翻牌配對']].map(function (g) {
      var n = stars['challenge-' + g[0]] || 0;
      return h('div', { class: 'activity-card' + (n ? ' done' : '') },
        h('button', { type: 'button', class: 'activity-main', 'data-game': g[0], onclick: function () { go(ctx, g[0]); } },
          H3A.ui.activityIcon(g[0], g[1]), h('span', { class: 'activity-name' }, g[2]),
          h('span', { class: 'activity-extra' }, n ? '⭐'.repeat(n) : '')),
        H3A.ui.speaker(g[2], null));
    })));
    if (ctx.auto) H3A.tts.speak(say);
  }

  function build(main, ctx, w) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var list = w.hanzi.filter(function (x) { return x.build; });
    var intro = F.learn('組合字', function () {
      return h('div', { class: 'learn-box combo-intro' },
        h('div', { class: 'combo-row' },
          h('div', { class: 'combo-ex' }, h('span', { class: 'combo-stack tb' }, h('span', { class: 'parts-chip' }, '黑'), h('span', { class: 'parts-chip' }, '土')),
            h('span', { class: 'parts-op' }, '→'), h('span', { class: 'parts-chip parts-result' }, '墨'), h('span', { class: 'combo-tag' }, '上下組合')),
          h('div', { class: 'combo-ex' }, h('span', { class: 'combo-stack lr' }, h('span', { class: 'parts-chip' }, '木'), h('span', { class: 'parts-chip' }, '幾')),
            h('span', { class: 'parts-op' }, '→'), h('span', { class: 'parts-chip parts-result' }, '機'), h('span', { class: 'combo-tag' }, '左右組合'))),
        F.sayLine('有的字是上下組合，有的字是左右組合。看看少了哪一塊，把字組起來！'));
    }, '有的字是上下組合，像墨，上面是黑，下面是土。有的字是左右組合，像機，左邊是木，右邊是幾。看看少了哪一塊，把字組起來！');
    var qs = [intro].concat(H3A.quizgen.shuffle(list, r).map(function (x) { return H3A.wordq.buildQuestion(x, r); }));
    var ex = back(ctx); ex.starKey = 'challenge-build';
    F.run(main, ctx, 'challenge', qs, function () { go(ctx, 'build'); }, ex);
  }

  /* ---------- 翻牌配對 ---------- */
  function memory(main, ctx, w) {
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);
    var pool = H3A.quizgen.shuffle(w.vocab.filter(function (v) { return v.img && !v.noPic; }), r);
    /* 平均分回合，每回最多 PAIRS 對（10 對 → 4、3、3） */
    var n = Math.ceil(pool.length / PAIRS), rounds = [];
    for (var i = 0, at = 0; i < n; i++) { var size = Math.ceil((pool.length - at) / (n - i)); rounds.push(pool.slice(at, at + size)); at += size; }
    var misses = {}, tries = 0, startedAt = Date.now();

    function finish() {
      var pairs = pool.length, extra = tries - pairs;
      var items = pool.map(function (v) { var m = misses[v.id] || 0; return { q: v.id, result: m === 0 ? 'first' : m === 1 ? 'hint1' : 'hint2', wrong: [] }; });
      var summary = { items: items, firstTryRate: H3A.scoring.firstTryRate(items.map(function (x) { return x.result; })),
        stars: extra <= pairs ? 3 : extra <= pairs * 2 ? 2 : 1, score: null, durationSec: Math.round((Date.now() - startedAt) / 1000) };
      var ex = back(ctx); ex.starKey = 'challenge-memory';
      H3A.ui.finishActivity(main, ctx, 'challenge', summary, function () { go(ctx, 'memory'); }, false, ex);
    }

    function round(n) {
      if (n >= rounds.length) return finish();
      var set = rounds[n];
      var cards = H3A.quizgen.shuffle(set.map(function (v) { return { v: v, kind: 'pic' }; }).concat(set.map(function (v) { return { v: v, kind: 'word' }; })), r);
      var open = [], busy = false, left = set.length;
      H3A.ui.clear(main);
      var say = '翻牌配對：找出一樣的圖片和語詞';
      main.appendChild(h('p', { class: 'round-no' }, '第 ' + (n + 1) + ' / ' + rounds.length + ' 回'));
      main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, say), H3A.ui.speaker(say, '翻牌配對：翻開兩張牌，找出一樣的圖片和語詞')));
      var feedback = h('div', { class: 'feedback', role: 'status' });
      var grid = h('div', { class: 'mem-grid' });
      var nextBtn = h('button', { type: 'button', class: 'btn-next', hidden: true, onclick: function () { H3A.tts.stop(); round(n + 1); } },
        n + 1 < rounds.length ? '下一回 ▶' : '看結果 ▶');
      cards.forEach(function (c) {
        var face = c.kind === 'pic' ? H3A.ui.picture(ctx.lessonId, c.v.img, c.v.word) : h('span', { class: 'mem-word' }, c.v.word);
        var btn = h('button', { type: 'button', class: 'mem-card', 'data-id': c.v.id, 'data-kind': c.kind, 'aria-label': '翻牌' },
          h('span', { class: 'mem-back', 'aria-hidden': 'true' }, '❓'), h('span', { class: 'mem-face' }, face));
        btn.onclick = function () {
          if (busy || btn.classList.contains('open') || btn.classList.contains('matched')) return;
          btn.classList.add('open'); H3A.tts.speak(c.v.word);
          open.push({ btn: btn, c: c });
          if (open.length < 2) return;
          tries++;
          var a = open[0], b = open[1]; open = [];
          if (a.c.v.id === b.c.v.id) {
            a.btn.classList.add('matched'); b.btn.classList.add('matched');
            H3A.sfx.correct();
            feedback.className = 'feedback ok'; feedback.textContent = '配對成功！' + c.v.word;
            if (--left === 0) {
              feedback.textContent = '這一回全部配對成功！';
              H3A.tts.speak('這一回全部配對成功！');
              nextBtn.hidden = false;
            }
            return;
          }
          misses[a.c.v.id] = (misses[a.c.v.id] || 0) + 1;
          if (b.c.v.id !== a.c.v.id) misses[b.c.v.id] = (misses[b.c.v.id] || 0) + 1;
          busy = true;
          feedback.className = 'feedback'; feedback.textContent = '不一樣，記住它們的位置，再試一次。';
          setTimeout(function () { a.btn.classList.remove('open'); b.btn.classList.remove('open'); busy = false; }, 1600);
        };
        grid.appendChild(btn);
      });
      main.appendChild(feedback);
      main.appendChild(grid);
      main.appendChild(h('div', { class: 'next-bar' }, nextBtn));
      if (ctx.auto) H3A.tts.speak('翻牌配對：翻開兩張牌，找出一樣的圖片和語詞');
    }
    round(0);
  }

  H3A.pages.challenge = function (main, ctx) {
    var w = ctx.words; if (!w) return F.missing(main);
    var key = ctx.params && ctx.params.p;
    if (key === 'build') return build(main, ctx, w);
    if (key === 'memory') return memory(main, ctx, w);
    menu(main, ctx);
  };
})(this);
