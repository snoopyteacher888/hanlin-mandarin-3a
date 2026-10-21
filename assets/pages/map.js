/* 課文地圖：點圖卡依順序放進空格；每一格算一題，放錯套用提示規則 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  H3A.pages.map = function run(main, ctx) {
    var steps = ctx.lesson.mapSteps;
    var order = H3A.quizgen.shuffle(steps.map(function (_, i) { return i; }), H3A.quizgen.rng(Date.now() & 0xffffffff));
    var placed = [];            // 已放好的步驟（steps 的索引）
    var items = [], startedAt = Date.now(), hs;
    var slotEls = [], cardEls = {};
    var feedback = h('div', { class: 'feedback', role: 'status' });

    function newSlotState() {
      var s = H3A.hints.create(steps.length, placed.length);
      s.disabled = placed.slice();
      return s;
    }
    function refresh() {
      slotEls.forEach(function (el, i) { el.classList.toggle('now', i === placed.length); });
      steps.forEach(function (_, i) {
        var c = cardEls[i];
        c.disabled = placed.indexOf(i) >= 0 || hs.disabled.indexOf(i) >= 0;
        c.classList.toggle('is-off', placed.indexOf(i) < 0 && hs.disabled.indexOf(i) >= 0);
        c.parentNode.hidden = placed.indexOf(i) >= 0;
      });
    }
    function pick(i) {
      if (placed.length >= steps.length || placed.indexOf(i) >= 0 || hs.disabled.indexOf(i) >= 0) return;
      var slot = placed.length, step = steps[slot];
      if (i === slot) {
        items.push({ q: step.id, result: H3A.hints.result(hs), wrong: hs.wrongPicked.map(function (w) { return steps[w].text; }) });
        placed.push(i);
        var el = slotEls[slot]; H3A.ui.clear(el);
        el.appendChild(H3A.ui.picture(ctx.lessonId, step.img, step.text));
        el.appendChild(h('span', { class: 'slot-text' }, step.text));
        el.classList.add('filled');
        H3A.sfx.correct();
        feedback.className = 'feedback ok'; feedback.textContent = '答對了！';
        H3A.tts.speak(step.text, step.say);
        if (placed.length === steps.length) {
          var results = items.map(function (x) { return x.result; });
          var rate = H3A.scoring.firstTryRate(results);
          setTimeout(function () {
            H3A.ui.finishActivity(main, ctx, 'map', { items: items, firstTryRate: rate, stars: H3A.scoring.starsFor(rate), score: null,
              durationSec: Math.round((Date.now() - startedAt) / 1000) }, function () { run(main, ctx); }, true);
          }, 900);
          return;
        }
        hs = newSlotState();
        refresh();
        return;
      }
      hs = H3A.hints.pickWrong(hs, i, Math.random);
      var card = cardEls[i];
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      H3A.sfx.wrong();
      feedback.className = 'feedback hint'; H3A.ui.clear(feedback);
      feedback.appendChild(h('span', {}, '再想想看。課文說：「' + step.evidence + '」'));
      feedback.appendChild(H3A.ui.speaker(step.evidence, null));
      H3A.tts.speak('再想想看').then(function (ok) { if (ok) H3A.tts.speak(step.evidence); });
      refresh();
    }

    H3A.ui.clear(main);
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, '鉛筆是怎麼做出來的？請依照順序點圖卡'),
      H3A.ui.speaker('鉛筆是怎麼做出來的？請依照順序點圖卡', null)));
    main.appendChild(feedback);
    var slots = h('ol', { class: 'map-slots' });
    steps.forEach(function (_, i) {
      var el = h('li', { class: 'map-slot' }, h('span', { class: 'slot-no' }, String(i + 1)));
      slotEls.push(el); slots.appendChild(el);
    });
    main.appendChild(slots);
    var cards = h('div', { class: 'map-cards' });
    order.forEach(function (i) {
      var s = steps[i];
      var b = h('button', { type: 'button', class: 'option map-card', 'data-step': s.id, onclick: function () { pick(i); } },
        H3A.ui.picture(ctx.lessonId, s.img, s.text), h('span', { class: 'option-text' }, s.text));
      cardEls[i] = b;
      cards.appendChild(h('div', { class: 'option-wrap' }, b, H3A.ui.speaker(s.text, s.say)));
    });
    main.appendChild(cards);
    hs = newSlotState();
    refresh();
    if (ctx.auto) H3A.tts.speak('鉛筆是怎麼做出來的？請依照順序點圖卡');
  };
})(this);
