/* 配對遊戲：左邊（圖或語詞）配右邊（語詞或意思）。把左邊的卡拖到右邊，或先點左邊再點右邊。
   q = { type:'match', id, prompt, pairs:[{ id, left:{ text, img }, right:{ text }, say }] }
   每一對各自記結果（id 是原本的題目 id，錯題複習時出原本那一題）。同一對錯 3 次，老師幫忙配好。 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var COLORS = ['#E07A2E', '#2E86C1', '#2E9E5B', '#8E44AD', '#C0392B', '#B7950B'];

  function matchQuestion(box, ctx, q, done, feedback, r) {
    var misses = {}, taught = {}, left = q.pairs.length, picked = null, finished = false, color = 0;
    var rights = H3A.quizgen.shuffle(q.pairs.slice(), r || Math.random);
    var L = {}, R = {};
    var lcol = h('div', { class: 'match-col left' }), rcol = h('div', { class: 'match-col right' });
    q.pairs.forEach(function (p) {
      var el = h('button', { type: 'button', class: 'match-card' + (p.left.img ? ' has-pic' : ''), 'data-id': p.id },
        p.left.img ? H3A.ui.picture(ctx.lessonId, p.left.img, p.left.text) : null,
        p.left.img ? null : h('span', { class: 'match-text' }, p.left.text));
      L[p.id] = el;
      H3A.ui.dragTo(el, openRights, function (t) { pick(p.id); drop(t.getAttribute('data-id')); }, function () { pick(p.id); });
      lcol.appendChild(el);
    });
    rights.forEach(function (p) {
      var el = h('button', { type: 'button', class: 'match-card right', 'data-id': p.id, onclick: function () { if (picked) drop(p.id); else H3A.tts.speak(p.right.text); } },
        h('span', { class: 'match-text' }, p.right.text));
      R[p.id] = el; rcol.appendChild(el);
    });
    var bulb = h('button', { type: 'button', class: 'hint-btn', 'aria-label': '提示', onclick: hint }, '💡');
    box.appendChild(h('div', { class: 'match-board' }, lcol, h('div', { class: 'match-mid', 'aria-hidden': 'true' }, '🔗'), rcol));
    box.appendChild(h('div', { class: 'match-tools' }, bulb));

    function openRights() { return Object.keys(R).filter(function (k) { return !R[k].disabled; }).map(function (k) { return R[k]; }); }
    function pick(id) {
      if (finished || L[id].disabled) return;
      if (picked) L[picked].classList.remove('picked');
      picked = id; L[id].classList.add('picked');
      var p = q.pairs.filter(function (x) { return x.id === id; })[0];
      H3A.tts.speak(p.say || p.left.text);
    }
    function drop(rid) {
      if (!picked || finished) return;
      var id = picked;
      if (rid === id) return pair(id);
      misses[id] = (misses[id] || 0) + 1;
      [L[id], R[rid]].forEach(function (el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); });
      if (misses[id] >= 3) { taught[id] = true; pair(id, true); return; }
      H3A.ui.showHint(feedback, { text: misses[id] === 1 ? '不是這一個，再想一想。' : '再看一次左邊這一個，聽聽看它是什麼。' }, ctx, false);
    }
    function pair(id, byTeacher) {
      var c = COLORS[color++ % COLORS.length];
      [L[id], R[id]].forEach(function (el) { el.disabled = true; el.classList.remove('picked'); el.classList.add('matched'); el.style.setProperty('--pair', c); });
      picked = null;
      var p = q.pairs.filter(function (x) { return x.id === id; })[0];
      if (byTeacher) H3A.ui.showHint(feedback, { text: '老師幫你配好了：' + p.left.text + '，' + p.right.text + '。' }, ctx, true);
      else { H3A.ui.clear(feedback); feedback.className = 'feedback'; H3A.sfx.correct(); H3A.tts.speak(p.right.text); }
      if (--left > 0) return;
      finished = true; bulb.remove();
      H3A.ui.celebrate(feedback, null, null, box.querySelector('.match-board'));
      var items = q.pairs.map(function (x) {
        var m = misses[x.id] || 0;
        return { q: x.id, result: taught[x.id] ? 'taught' : ['first', 'hint1', 'hint2'][Math.min(m, 2)], wrong: [] };
      });
      done(items);
    }
    /* 💡：把還沒配好的第一對，左右兩張一起閃一下（算用了一次提示） */
    function hint() {
      if (finished) return;
      var id = picked || q.pairs.filter(function (x) { return !L[x.id].disabled; })[0].id;
      misses[id] = (misses[id] || 0) + 1;
      [L[id], R[id]].forEach(function (el) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); });
      H3A.ui.showHint(feedback, { text: '看！一閃一閃的兩張是一對。' }, ctx, true);
    }
  }
  H3A.ui.matchQuestion = matchQuestion;
})(this);
