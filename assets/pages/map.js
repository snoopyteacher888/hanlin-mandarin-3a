/* 課文地圖：依 storyMap.type 畫不同架構。第 6 課是魚骨圖：一根骨頭一根骨頭找圖卡，最後選魚尾（結論） */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var FB = H3A.fishbone;

  function fishbone(main, ctx) {
    var map = ctx.lesson.storyMap;
    var steps = map.bones.map(function (b) { return b.id; }).concat(['tail']);
    var stepIdx = 0, placed = [], items = [], startedAt = Date.now(), bs = null, ts = null, tailOrder = null;
    var cardEls = {}, boneEls = {}, finished = false;
    var r = H3A.quizgen.rng(Date.now() & 0xffffffff);

    H3A.ui.clear(main);
    var promptEl = h('div', { class: 'prompt' });
    var feedback = h('div', { class: 'feedback', role: 'status' });
    var fish = h('div', { class: 'fish' }, h('div', { class: 'fish-spine', 'aria-hidden': 'true' }));
    var tailBox = h('div', { class: 'fish-tail-box' }, h('span', { class: 'fish-label' }, '結論'), h('span', { class: 'fish-q' }, '？'));
    var headBox = h('div', { class: 'fish-head-box' },
      h('span', { class: 'fish-label' }, '主題'), h('strong', {}, map.head.text), H3A.ui.speaker(map.head.text, map.head.say));
    fish.appendChild(tailBox); fish.appendChild(headBox);
    map.bones.forEach(function (b, i) {
      var slots = h('div', { class: 'bone-slots' });
      b.cards.forEach(function () { slots.appendChild(h('span', { class: 'bone-slot' })); });
      var el = h('div', { class: 'bone-box bone-' + (i + 1), 'data-bone': b.id },
        h('div', { class: 'bone-title' }, b.title, H3A.ui.speaker(b.title, null)), slots);
      boneEls[b.id] = el; fish.appendChild(el);
    });
    var pool = h('div', { class: 'map-cards' });
    var nextBar = h('div', { class: 'next-bar' });
    main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, '用魚骨圖整理課文重點'), H3A.ui.speaker('用魚骨圖整理課文重點', null)));
    main.appendChild(fish);
    main.appendChild(promptEl);
    main.appendChild(feedback);
    main.appendChild(pool);
    main.appendChild(nextBar);

    var bulb = null;
    function setPrompt(text, say, onHint) {
      H3A.ui.clear(promptEl);
      promptEl.appendChild(h('h2', { class: 'step-q' }, '👉 ' + text));
      promptEl.appendChild(H3A.ui.speaker(text, say));
      bulb = onHint ? h('button', { type: 'button', class: 'hint-btn', 'aria-label': '提示', onclick: function () { if (!finished) onHint(); } }, '💡') : null;
      if (bulb) promptEl.appendChild(bulb);
      if (ctx.auto) H3A.tts.speak(text, say);
    }
    function dropBulb() { if (bulb) { bulb.remove(); bulb = null; } }
    function ok(text, say) {
      H3A.ui.celebrate(feedback, text, say);
    }
    function cardButton(c, onPick) {
      var b = h('button', { type: 'button', class: 'option map-card', 'data-card': c.id, onclick: function () { onPick(c.id); } },
        c.img ? H3A.ui.picture(ctx.lessonId, c.img, c.text) : null, h('span', { class: 'option-text' }, c.text));
      return h('div', { class: 'option-wrap' }, b, H3A.ui.speaker(c.text, c.say));
    }

    /* 骨頭 */
    function showBone() {
      var b = FB.bone(map, steps[stepIdx]);
      bs = FB.createBone(map, b.id, placed);
      Object.keys(boneEls).forEach(function (id) { boneEls[id].classList.toggle('now', id === b.id); });
      setPrompt(b.prompt, null, function () { bs = FB.askHint(bs); boneHint(true); });
      H3A.ui.clear(pool); cardEls = {};
      H3A.quizgen.shuffle(FB.allCards(map), r).forEach(function (c) {
        if (placed.indexOf(c.id) >= 0) return;
        var wrap = cardButton(c, pickCard);
        cardEls[c.id] = wrap.firstChild; pool.appendChild(wrap);
      });
    }
    function refreshCards() {
      var enabled = FB.enabledCards(map, bs);
      Object.keys(cardEls).forEach(function (id) {
        var on = enabled.indexOf(id) >= 0;
        cardEls[id].disabled = !on;
        cardEls[id].classList.toggle('is-off', !on && bs.placed.indexOf(id) < 0);
      });
    }
    /* 骨頭的提示：放錯（asked=false）或自己按 💡（asked=true）都往上一層 */
    function boneHint(asked) {
      var b = FB.bone(map, bs.bone);
      var loc = H3A.locate.locate(ctx.lesson, b.evidence);
      var where = loc.paras.length ? '答案在課文第 ' + loc.paras.join('、') + ' 段。' : '';
      if (FB.mustTeach(bs)) {
        dropBulb();
        var left = bs.needed.map(function (nid) { return FB.card(map, nid); });
        left.forEach(function (c) { if (cardEls[c.id]) cardEls[c.id].classList.add('is-correct', 'pulse'); });
        H3A.ui.showTeach(feedback, { text: '「' + b.title + '」還要找：' + left.map(function (c) { return '「' + c.text + '」'; }).join('') +
          '。因為課文說：「' + b.evidence + '」' }, function () { feedback.className = 'feedback'; H3A.ui.clear(feedback); });
        return;
      }
      var lead = asked ? '想想看，哪些卡跟「' + b.title + '」有關？' : '再想想看，這張卡跟「' + b.title + '」有關嗎？';
      H3A.ui.showHint(feedback, bs.level === 1
        ? { text: lead + where, para: { paras: loc.paras, sentIds: loc.sentIds, highlight: false } }
        : { text: '再找找看，注意亮起來的句子。', para: { paras: loc.paras, sentIds: loc.sentIds, highlight: true } }, ctx, asked);
    }
    function pickCard(id) {
      if (finished) return;
      var b = FB.bone(map, bs.bone);
      var res = FB.pick(bs, id, Math.random);
      if (res.outcome === 'ignored') return;
      bs = res.state;
      if (res.outcome === 'wrong') {
        var el = cardEls[id]; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
        refreshCards();
        boneHint(false);
        return;
      }
      var c = FB.card(map, id);
      placed.push(id);
      cardEls[id].parentNode.remove(); delete cardEls[id];
      var slot = boneEls[b.id].querySelector('.bone-slot:empty');
      slot.appendChild(H3A.ui.picture(ctx.lessonId, c.img, c.text));
      slot.appendChild(h('span', {}, c.text));
      slot.setAttribute('role', 'button'); slot.setAttribute('tabindex', '0');
      slot.addEventListener('click', function () { H3A.tts.speak(c.text, c.say); });
      ok(c.text, c.say);
      refreshCards();
      if (res.boneDone) {
        items.push({ q: b.id, result: FB.result(bs), wrong: FB.wrongTexts(map, bs) });
        boneEls[b.id].classList.remove('now'); boneEls[b.id].classList.add('done');
        stepIdx++;
        setTimeout(function () { if (steps[stepIdx] === 'tail') showTail(); else showBone(); }, 700);
      }
    }

    /* 魚尾（結論）：4 選 1，提示規則跟理解提問一樣 */
    function showTail() {
      var t = map.tail;
      tailBox.classList.add('now');
      var q = H3A.quizgen.prepare(t, r);
      tailOrder = q;
      ts = H3A.hints.create(q.options.length, q.answer);
      setPrompt(q.prompt, q.say, function () { ts = H3A.hints.askHint(ts); tailHint(true); });
      H3A.ui.clear(pool); cardEls = {};
      q.options.forEach(function (o, i) {
        var wrap = cardButton({ id: 'opt' + i, text: o.text, img: o.img, say: o.say }, function () { pickTail(i); });
        cardEls[i] = wrap.firstChild; pool.appendChild(wrap);
      });
    }
    function tailHint(asked) {
      var q = tailOrder;
      var th = H3A.wordq.readingHints(ctx.lesson, q);
      if (H3A.hints.mustTeach(ts)) {
        dropBulb();
        Object.keys(cardEls).forEach(function (k) { cardEls[k].disabled = +k !== q.answer; });
        cardEls[q.answer].classList.add('is-correct', 'pulse');
        H3A.ui.showTeach(feedback, th.teach, function () { feedback.className = 'feedback'; H3A.ui.clear(feedback); });
        return;
      }
      H3A.ui.showHint(feedback, ts.level === 1 ? th.h1 : th.h2, ctx, asked);
    }
    function pickTail(i) {
      if (finished || ts.disabled.indexOf(i) >= 0) return;
      var q = tailOrder;
      if (i !== q.answer) {
        ts = H3A.hints.pickWrong(ts, i);
        ts.disabled.forEach(function (d) { cardEls[d].classList.add('is-off'); cardEls[d].disabled = true; });
        tailHint(false);
        return;
      }
      finished = true;
      items.push({ q: 'tail', result: H3A.hints.result(ts), wrong: ts.wrongPicked.map(function (k) { return q.options[k].text; }) });
      var o = q.options[i];
      H3A.ui.clear(tailBox);
      tailBox.classList.remove('now'); tailBox.classList.add('done');
      tailBox.appendChild(h('span', { class: 'fish-label' }, '結論'));
      tailBox.appendChild(h('span', {}, o.text));
      tailBox.appendChild(H3A.ui.speaker(o.text, o.say));
      ok(o.text, o.say);
      H3A.ui.clear(pool);
      feedback.className = 'feedback'; feedback.textContent = '';
      fish.classList.add('complete');
      H3A.ui.clear(promptEl);
      promptEl.appendChild(h('h2', { class: 'step-q' }, '🎉 魚骨圖完成了！點上面的圖卡可以再聽一次'));
      nextBar.appendChild(h('button', { type: 'button', class: 'btn-next', onclick: function (e) {
        e.currentTarget.disabled = true;
        var rate = H3A.scoring.firstTryRate(items.map(function (x) { return x.result; }));
        H3A.ui.finishActivity(main, ctx, 'map', { items: items, firstTryRate: rate, stars: H3A.scoring.starsFor(rate), score: null,
          durationSec: Math.round((Date.now() - startedAt) / 1000) }, function () { fishbone(main, ctx); }, true);
      } }, '看結果 ▶'));
    }

    showBone();
  }

  H3A.pages.map = function (main, ctx) {
    var map = ctx.lesson.storyMap;
    if (map && map.type === 'fishbone') { fishbone(main, ctx); return; }
    main.appendChild(h('p', { class: 'notice' }, '這一課的課文地圖還沒準備好。'));
  };
})(this);
