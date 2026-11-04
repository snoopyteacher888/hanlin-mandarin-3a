/* 成語小動畫（老師要求：認識成語那一頁用動畫解釋）：用表情符號當演員，一句旁白一段動作，邊演邊念。
   資料寫在字詞資料的 idioms[].anim：
     bg：背景（room 室內、school 教室、park 戶外、home 家、sky 天空、night 晚上、farm 田野）
     a：演員 { 名字: [表情符號, x%, y%, 大小(畫面寬的%), 'h' 一開始藏起來, 'f' 左右翻面, 'as:別的演員' 穿一樣的衣服] }
       人物的臉（🧒👩😠…）會自動加上衣服和手腳
     s：一段一段 [[旁白, [[動作, 演員, 參數], ...]], ...]
       動作：in 出現、out 消失、mv 移到 [x, y]、jump 跳、shake 搖、wig 晃、bob 上下飄、pop 放大一下、spin 轉一圈、grow 變大 [倍數]
   最後一段念完，畫面下方出現成語和意思。 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var STEP = 1800; /* 一段最少演多久（毫秒）；有語音時等念完 */
  /* 只有頭的人物表情符號：加上衣服、手腳（老師要求：只有頭看起來很可怕） */
  var FACES = ['🧒', '👦', '👧', '👩', '👨', '🧑', '👶', '👴', '👵', '🧓', '👱', '👲', '🧔',
    '🤐', '😠', '😡', '😢', '😭', '😊', '😄', '😮', '😴', '🤔', '😋', '😳', '😨', '🥵', '😵', '🥰', '😎', '🙂', '😟'];
  var SHIRTS = ['#E0603A', '#3A86C8', '#F2B233', '#5BAA5B', '#9A6BC4', '#E07AA8', '#2E9E9A'];
  var PANTS = ['#3B4A6B', '#6B4E3B', '#4A4A4A', '#2F5D8A'];
  function hash(k) { var n = 0; for (var i = 0; i < k.length; i++) n = (n * 31 + k.charCodeAt(i)) % 997; return n; }
  function figure(k, emoji) {
    if (FACES.indexOf(emoji) < 0) return h('span', { class: 'ia-actor', 'aria-hidden': 'true' }, emoji);
    var n = hash(k), baby = emoji === '👶';
    var el = h('span', { class: 'ia-actor ia-person' + (baby ? ' ia-baby' : ''), 'aria-hidden': 'true' },
      h('span', { class: 'ia-head' }, emoji),
      h('span', { class: 'ia-body' }, h('span', { class: 'ia-arm ia-arm-l' }), h('span', { class: 'ia-arm ia-arm-r' }),
        h('span', { class: 'ia-leg ia-leg-l' }), h('span', { class: 'ia-leg ia-leg-r' })));
    el.style.setProperty('--shirt', SHIRTS[n % SHIRTS.length]);
    el.style.setProperty('--pants', PANTS[n % PANTS.length]);
    return el;
  }

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function anim(el, frames, ms, keep) {
    if (!el.animate) return Promise.resolve();
    var a = el.animate(frames, { duration: ms, easing: 'ease-in-out', fill: keep ? 'forwards' : 'none' });
    return new Promise(function (r) { a.onfinish = r; a.oncancel = r; });
  }

  function build(x) {
    var A = x.anim;
    var stage = h('div', { class: 'ia-stage ia-' + (A.bg || 'room'), role: 'img', 'aria-label': x.idiom + '的動畫' });
    var cap = h('div', { class: 'ia-cap', 'aria-live': 'polite' });
    var end = h('div', { class: 'ia-end', hidden: true }, h('strong', {}, x.idiom), h('span', {}, x.meaning));
    var actors = {};
    function place() {
      var w = stage.clientWidth || 480;
      Object.keys(actors).forEach(function (k) { actors[k].el.style.fontSize = Math.round(w * actors[k].size / 100) + 'px'; });
    }
    function reset() {
      Object.keys(A.a).forEach(function (k) {
        var d = A.a[k], o = actors[k];
        /* 有身體的人物整個比較高，字小一點，才不會太大 */
        /* 'as:演員名'：換表情時穿一樣的衣服（例如小明變成 🤐） */
        var same = d.slice(4).filter(function (v) { return /^as:/.test(v); })[0];
        if (!o) { o = actors[k] = { el: figure(same ? same.slice(3) : k, d[0]), size: FACES.indexOf(d[0]) >= 0 ? d[3] * 0.85 : d[3] }; stage.appendChild(o.el); }
        o.el.getAnimations && o.el.getAnimations().forEach(function (an) { an.cancel(); });
        o.x = d[1]; o.y = d[2];
        o.flip = d.indexOf('f', 4) >= 4;
        o.el.style.left = o.x + '%'; o.el.style.top = o.y + '%';
        o.el.style.transform = 'translate(-50%, -50%)' + (o.flip ? ' scaleX(-1)' : '');
        o.el.style.opacity = d.indexOf('h', 4) >= 4 ? '0' : '1';
      });
      cap.textContent = ''; end.hidden = true;
      place();
    }
    function base(o) { return 'translate(-50%, -50%)' + (o.flip ? ' scaleX(-1)' : ''); }
    function act(step) {
      var o = actors[step[1]]; if (!o) return Promise.resolve();
      var el = o.el, b = base(o), arg = step[2];
      switch (step[0]) {
        case 'in': return anim(el, [{ opacity: 0, transform: b + ' scale(.3)' }, { opacity: 1, transform: b + ' scale(1)' }], 500, true).then(function () { el.style.opacity = '1'; });
        case 'out': return anim(el, [{ opacity: 1 }, { opacity: 0 }], 500, true).then(function () { el.style.opacity = '0'; });
        case 'mv':
          var from = { left: o.x + '%', top: o.y + '%' }, to = { left: arg[0] + '%', top: arg[1] + '%' };
          o.x = arg[0]; o.y = arg[1];
          return anim(el, [from, to], arg[2] || 1200, true).then(function () { el.style.left = to.left; el.style.top = to.top; });
        case 'jump': return anim(el, [{ transform: b }, { transform: b + ' translateY(-30%)' }, { transform: b }, { transform: b + ' translateY(-30%)' }, { transform: b }], 900);
        case 'shake': return anim(el, [{ transform: b }, { transform: b + ' translateX(-8%)' }, { transform: b + ' translateX(8%)' }, { transform: b + ' translateX(-8%)' }, { transform: b }], 600);
        case 'wig': return anim(el, [{ transform: b }, { transform: b + ' rotate(-15deg)' }, { transform: b + ' rotate(15deg)' }, { transform: b + ' rotate(-15deg)' }, { transform: b }], 900);
        case 'bob': return anim(el, [{ transform: b }, { transform: b + ' translateY(-15%)' }, { transform: b }, { transform: b + ' translateY(-15%)' }, { transform: b }], 1400);
        case 'pop': return anim(el, [{ transform: b }, { transform: b + ' scale(1.4)' }, { transform: b }], 600);
        case 'spin': return anim(el, [{ transform: b + ' rotate(0)' }, { transform: b + ' rotate(360deg)' }], 900);
        case 'grow': return anim(el, [{ transform: b }, { transform: b + ' scale(' + (arg || 1.6) + ')' }], 700, true);
      }
      return Promise.resolve();
    }
    var token = 0;
    function play() {
      var my = ++token;
      reset();
      btn.textContent = '⏹ 停止';
      var chain = Promise.resolve();
      A.s.forEach(function (seg) {
        chain = chain.then(function () {
          if (my !== token) return;
          cap.textContent = seg[0];
          var acts = (seg[1] || []).map(act);
          return Promise.all([Promise.all(acts), wait(STEP), H3A.tts.speak(seg[0])]);
        });
      });
      return chain.then(function () {
        if (my !== token) return;
        end.hidden = false; cap.textContent = '';
        return H3A.tts.speak(x.idiom + '。' + x.meaning);
      }).then(function () { if (my === token) btn.textContent = '▶ 再看一次'; });
    }
    function stop() { token++; H3A.tts.stop(); btn.textContent = '▶ 看動畫'; }
    var btn = h('button', { type: 'button', class: 'btn-secondary ia-play', onclick: function () { if (btn.textContent === '⏹ 停止') stop(); else play(); } }, '▶ 看動畫');
    var box = h('div', { class: 'ia-box' }, stage, cap, end, btn);
    reset();
    if (root.addEventListener) root.addEventListener('resize', place);
    setTimeout(place, 0);
    box.play = play;
    return box;
  }

  H3A.ui.idiomAnim = function (x) { return x && x.anim && x.anim.s ? build(x) : null; };
})(this);
