/* 一題一題作答：點選項就作答；答錯給提示；答對要按「下一題 ▶」才繼續 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;

  function dots(total, done) {
    var d = h('div', { class: 'dots', 'aria-label': '第 ' + (done + 1) + ' 題，共 ' + total + ' 題' });
    for (var i = 0; i < total; i++) d.appendChild(h('span', { class: 'dot' + (i < done ? ' done' : i === done ? ' now' : '') }));
    return d;
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
      var hs = H3A.hints.create(q.options.length, q.answer);
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

      function done(result, wrongTexts) {
        locked = true;
        items.push({ q: q.id, result: result, wrong: wrongTexts });
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
        hs = H3A.hints.pickWrong(hs, i, Math.random);
        hs.disabled.forEach(function (d) { buttons[d].classList.add('is-off'); buttons[d].disabled = true; });
        feedback.className = 'feedback hint';
        H3A.ui.clear(feedback);
        feedback.appendChild(h('span', {}, '再想想看。課文說：「' + q.evidence + '」'));
        feedback.appendChild(H3A.ui.speaker(q.evidence, q.evidenceSay));
        H3A.sfx.wrong();
        H3A.tts.speak('再想想看').then(function (ok) { if (ok) H3A.tts.speak(q.evidence, q.evidenceSay); });
      }

      var grid = h('div', { class: 'options' });
      q.options.forEach(function (o, i) {
        var b = h('button', { type: 'button', class: 'option', 'data-index': i, onclick: function () { pick(i); } },
          H3A.ui.picture(ctx.lessonId, o.img, o.text), h('span', { class: 'option-text' }, o.text));
        buttons.push(b);
        grid.appendChild(h('div', { class: 'option-wrap' }, b, H3A.ui.speaker(o.text, o.say)));
      });

      main.appendChild(dots(questions.length, idx));
      main.appendChild(h('div', { class: 'prompt' }, h('h2', {}, q.prompt), H3A.ui.speaker(q.prompt, q.say)));
      main.appendChild(feedback);
      main.appendChild(grid);
      main.appendChild(h('div', { class: 'next-bar' }, nextBtn));
      if (ctx.auto) H3A.tts.speak(q.prompt, q.say);
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
