/* 一題一題作答：點選項就作答；答錯給提示；答對要按「下一題 ▶」才繼續 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;

  function dots(total, done) {
    var d = h('div', { class: 'dots', 'aria-label': '第 ' + (done + 1) + ' 題，共 ' + total + ' 題' });
    for (var i = 0; i < total; i++) d.appendChild(h('span', { class: 'dot' + (i < done ? ' done' : i === done ? ' now' : '') }));
    return d;
  }

  /* 選項裡要標顏色的語詞（例如「混合」） */
  function marked(o) {
    if (!o.mark || o.text.indexOf(o.mark) < 0) return o.text;
    return o.text.split(o.mark).reduce(function (acc, part, i) {
      if (i) acc.push(h('span', { class: 'mark-word' }, o.mark));
      if (part) acc.push(part);
      return acc;
    }, []);
  }

  function runQuestions(main, ctx, opts) {
    var questions = opts.questions, practice = opts.mode !== 'test';
    var idx = 0, items = [], startedAt = Date.now();

    function finish() {
      var results = items.map(function (it) { return it.result; });
      var correct = results.filter(function (r) { return r === 'first'; }).length;
      var rate = H3A.scoring.firstTryRate(results);
      opts.onDone({
        items: items, firstTryRate: rate, stars: H3A.scoring.starsFor(rate),
        score: practice ? null : H3A.scoring.testScore(correct, questions.length),
        durationSec: Math.round((Date.now() - startedAt) / 1000)
      });
    }

    function show() {
      var q = questions[idx];
      if (q.type === 'learn') return showLearn(q);
      var speak = q.type === 'speak';
      var hs = speak ? null : H3A.hints.create(q.options.length, q.answer);
      var hints = speak ? q.hints : q.hints || (ctx.lesson && q.evidence ? H3A.wordq.readingHints(ctx.lesson, q) : null) ||
        { h1: { text: '再想想看。' }, h2: { text: '再仔細看一次題目。' }, teach: { text: '答案是「' + q.options[q.answer].text + '」。' } };
      var locked = false;
      H3A.ui.clear(main);
      var buttons = [];
      var nextBtn = h('button', { type: 'button', class: 'btn-next', hidden: true, onclick: function () {
        if (nextBtn.disabled) return;
        nextBtn.disabled = true;
        H3A.tts.stop();
        idx++;
        if (idx < questions.length) show(); else finish();
      } }, idx + 1 < questions.length ? '下一題 ▶' : '看結果 ▶');
      var feedback = h('div', { class: 'feedback', role: 'status' });

      function done(result, wrongTexts, extra) {
        locked = true;
        if (items.length && items[items.length - 1].q === q.id && items.length === idx + 1) return;
        var item = { q: q.id, result: result, wrong: wrongTexts };
        if (extra) { item.said = extra.said; item.status = extra.status; }
        items.push(item);
        buttons.forEach(function (b) { b.disabled = true; });
        nextBtn.hidden = false;
        nextBtn.focus();
      }
      function wrongTexts() { return hs.wrongPicked.map(function (i) { return q.options[i].text; }); }

      function pick(i) {
        if (locked || hs.disabled.indexOf(i) >= 0) return;
        if (i === q.answer) {
          buttons[i].classList.add('is-correct');
          feedback.textContent = '答對了！';
          feedback.className = 'feedback ok';
          H3A.sfx.correct(); H3A.tts.speak('答對了！');
          done(practice ? H3A.hints.result(hs) : (hs.wrongCount ? 'wrong' : 'first'), wrongTexts());
          return;
        }
        if (!practice) {
          hs = H3A.hints.pickWrong(hs, i, Math.random);
          buttons[i].classList.add('is-wrong');
          buttons[q.answer].classList.add('is-correct');
          feedback.textContent = '正確答案是：' + q.options[q.answer].text;
          feedback.className = 'feedback info';
          H3A.sfx.wrong();
          H3A.tts.speak(feedback.textContent, '正確答案是' + (q.options[q.answer].say || q.options[q.answer].text));
          done('wrong', wrongTexts());
          return;
        }
        hs = H3A.hints.pickWrong(hs, i);
        hs.disabled.forEach(function (d) { buttons[d].classList.add('is-off'); buttons[d].disabled = true; });
        buttons[i].classList.remove('shake'); void buttons[i].offsetWidth; buttons[i].classList.add('shake');
        if (H3A.hints.mustTeach(hs)) {
          /* 老師教你：標出答案並說明，按「我懂了」才算完成這題 */
          locked = true;
          buttons.forEach(function (b) { b.disabled = true; });
          buttons[q.answer].classList.add('is-correct');
          H3A.ui.showTeach(feedback, hints.teach, function () { done('taught', wrongTexts()); nextBtn.click(); });
          return;
        }
        var hint = hs.wrongCount === 1 ? hints.h1 : hints.h2;
        if (hint.showText) { promptText.hidden = false; if (showBtn) showBtn.remove(); }
        H3A.ui.showHint(feedback, hint, ctx);
      }

      var grid = h('div', { class: speak ? 'speak-area' : 'options' + (q.list ? ' list' : '') + (q.optionsClass ? ' ' + q.optionsClass : '') });
      if (speak) H3A.ui.speakQuestion(grid, ctx, q, function (result, extra) { done(result, [], extra); }, feedback);
      else q.options.forEach(function (o, i) {
        var b = o.big
          ? h('button', { type: 'button', class: 'option big', 'data-index': i, onclick: function () { pick(i); } }, h('span', { class: 'option-text' }, o.text))
          : h('button', { type: 'button', class: 'option' + (o.img ? '' : ' text-only'), 'data-index': i, onclick: function () { pick(i); } },
            o.img ? H3A.ui.picture(ctx.lessonId, o.img, o.text) : null,
            o.icon ? h('span', { class: 'option-icon', 'aria-hidden': 'true' }, o.icon) : null, h('span', { class: 'option-text' }, marked(o)));
        buttons.push(b);
        grid.appendChild(h('div', { class: 'option-wrap' }, b, H3A.ui.speaker(o.text, o.say)));
      });

      main.appendChild(dots(questions.length, idx));
      var promptText = h('h2', { hidden: !!q.hideText }, q.prompt);
      var showBtn = q.hideText ? h('button', { type: 'button', class: 'btn-secondary small-btn', onclick: function () { promptText.hidden = false; showBtn.remove(); } }, '👀 看文字') : null;
      main.appendChild(h('div', { class: 'prompt' + (q.img ? ' with-img' : '') + (q.promptClass ? ' ' + q.promptClass : '') },
        q.img ? h('div', { class: 'prompt-img' }, H3A.ui.picture(ctx.lessonId, q.img, '')) : null,
        q.hideText ? h('span', { class: 'listen-icon', 'aria-hidden': 'true' }, '👂') : null,
        promptText, showBtn, H3A.ui.speaker(q.prompt, q.say)));
      main.appendChild(feedback);
      main.appendChild(grid);
      main.appendChild(h('div', { class: 'next-bar' }, nextBtn));
      if (q.autoSay) H3A.tts.speak(q.autoSay);
      else if (ctx.auto) H3A.tts.speak(q.prompt, q.say);
    }
    /* 認識頁：只看、只聽，不算分；按「下一步 ▶」繼續 */
    function showLearn(q) {
      H3A.ui.clear(main);
      main.appendChild(dots(questions.length, idx));
      main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, q.prompt), H3A.ui.speaker(q.prompt, q.say)));
      main.appendChild(q.render());
      var next = h('button', { type: 'button', class: 'btn-next', onclick: function () {
        if (next.disabled) return;
        next.disabled = true; H3A.tts.stop();
        idx++;
        if (idx < questions.length) show(); else finish();
      } }, '下一步 ▶');
      /* 學生比較沒耐心：說明念完才出現「下一步」。
         保險：瀏覽器沒回報念完時，等大約念完的時間就出現；沒有語音就馬上出現 */
      var say = q.autoSay || q.prompt, my = idx, shown = false;
      var wait = h('p', { class: 'learn-wait', role: 'status' }, '👂 聽完說明，就會出現「下一步」');
      next.hidden = true;
      main.appendChild(h('div', { class: 'next-bar' }, wait, next));
      function reveal() {
        if (shown || my !== idx) return;
        shown = true; wait.remove(); next.hidden = false; next.classList.add('pop-in');
      }
      /* 念完（true）或沒有語音（undefined）就出現；被別的喇叭打斷（false）就等時間到 */
      H3A.tts.speak(say).then(function (ok) { if (ok !== false) reveal(); }, reveal);
      setTimeout(reveal, String(say).length * 400 + 5000);
    }
    show();
  }

  function uuid() {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
  function buildRecord(ctx, activity, summary) {
    return {
      id: uuid(), ts: new Date().toISOString(), student: ctx.student, place: ctx.place,
      lesson: ctx.lessonId, activity: activity, items: summary.items,
      firstTryRate: summary.firstTryRate, score: summary.score, stars: summary.stars, durationSec: summary.durationSec
    };
  }
  H3A.ui.runQuestions = runQuestions;
  H3A.ui.buildRecord = buildRecord;
})(this);
