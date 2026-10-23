/* 🎤 說說看：學生說話 → 轉成文字 → 念回來 → 送出。系統只檢查句型，合不合理交給老師批改。
   不支援語音辨識、麥克風被拒絕、連不上辨識服務時，改成「請大人幫忙打字」。 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var TYPE_ERRORS = ['not-allowed', 'service-not-allowed', 'network', 'audio-capture', 'language-not-supported'];

  function Recognition() { return root.SpeechRecognition || root.webkitSpeechRecognition || null; }

  /* listen(onText, onFail)：onFail('no-speech') 請學生再說一次；其他原因改用打字 */
  function listen(onText, onFail) {
    var R = Recognition();
    if (!R) { onFail('unsupported'); return null; }
    var rec = new R(), got = false, failed = false;
    rec.lang = 'zh-TW'; rec.interimResults = false; rec.maxAlternatives = 1; rec.continuous = false;
    rec.onresult = function (e) {
      var t = e.results && e.results[0] && e.results[0][0] ? e.results[0][0].transcript : '';
      if (t) { got = true; onText(t); }
    };
    rec.onerror = function (e) { failed = true; onFail(e.error || 'unknown'); };
    rec.onend = function () { if (!got && !failed) onFail('no-speech'); };
    try { rec.start(); } catch (err) { onFail('unsupported'); return null; }
    return rec;
  }

  function uuid() {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  /* q = { type:'speak', id, prompt, front?, rule, hints:{h1,h2,teach}, model }
     done(result, { said, status })：result 為 first/hint1/hint2/taught/pending */
  function speakQuestion(box, ctx, q, done, feedback) {
    var badCount = 0, taught = false, finished = false, rec = null;
    var said = h('div', { class: 'said-box', hidden: true });
    var status = h('p', { class: 'speak-status', role: 'status' });
    var mic = h('button', { type: 'button', class: 'mic-btn', 'aria-label': '按我說話', onclick: toggle },
      h('span', { class: 'mic-icon', 'aria-hidden': 'true' }, '🎤'), h('span', { class: 'mic-label' }, '按我說話'));
    var actions = h('div', { class: 'speak-actions', hidden: true });
    var typing = null, lastText = '';
    if (q.front) box.appendChild(h('div', { class: 'speak-front' }, h('span', {}, q.front), h('span', { class: 'speak-blank' }, '……'), H3A.ui.speaker(q.front, null)));
    box.appendChild(mic); box.appendChild(status); box.appendChild(said); box.appendChild(actions);
    if (!Recognition()) useTyping();

    function setListening(on) {
      mic.classList.toggle('listening', on);
      mic.querySelector('.mic-label').textContent = on ? '我在聽……' : '按我說話';
    }
    function toggle() {
      if (finished) return;
      if (rec) { try { rec.stop(); } catch (e) {} return; }
      H3A.tts.stop();
      H3A.ui.clear(status); said.hidden = true; actions.hidden = true;
      setListening(true);
      rec = listen(function (t) { rec = null; setListening(false); showSaid(t); }, function (why) {
        rec = null; setListening(false);
        if (why === 'no-speech' || why === 'aborted') { status.textContent = '我沒聽到，請再按 🎤 說一次'; H3A.tts.speak(status.textContent); return; }
        if (TYPE_ERRORS.indexOf(why) >= 0 || why === 'unsupported') useTyping();
        else status.textContent = '我沒聽清楚，請再按 🎤 說一次';
      });
    }
    function useTyping() {
      if (typing) return;
      mic.hidden = true;
      var area = h('textarea', { class: 'type-box', rows: 2, maxlength: 200, 'aria-label': '請大人幫忙打字' });
      typing = h('div', { class: 'type-wrap' }, h('p', {}, '🙋 這台裝置不能用說的，請大人幫忙打字'), area,
        h('button', { type: 'button', class: 'btn-primary', onclick: function () { if (area.value.trim()) submit(area.value.trim()); } }, '✅ 送出'));
      box.insertBefore(typing, status);
    }
    function showSaid(t) {
      lastText = t;
      H3A.ui.clear(said); said.hidden = false;
      said.appendChild(h('span', { class: 'said-label' }, '你說的是：'));
      said.appendChild(h('strong', {}, (q.front || '') + t));
      said.appendChild(H3A.ui.speaker((q.front || '') + t, null));
      H3A.ui.clear(actions); actions.hidden = false;
      actions.appendChild(h('button', { type: 'button', class: 'btn-primary', onclick: function () { submit(lastText); } }, '✅ 送出'));
      actions.appendChild(h('button', { type: 'button', class: 'btn-secondary', onclick: toggle }, '🔁 再說一次'));
      H3A.tts.speak((q.front || '') + t);
    }
    function submit(text) {
      if (finished) return;
      var r = H3A.speechcheck.check(q.rule, text);
      if (r.status === 'bad') {
        badCount++;
        actions.hidden = true;
        if (badCount >= 3 && !taught) {
          taught = true;
          mic.disabled = true;
          H3A.ui.showTeach(feedback, q.hints.teach, function () {
            feedback.className = 'feedback'; H3A.ui.clear(feedback);
            mic.disabled = false; said.hidden = true;
            status.textContent = '換你說說看！';
          });
          return;
        }
        H3A.ui.showHint(feedback, badCount === 1 ? q.hints.h1 : q.hints.h2, ctx);
        return;
      }
      finished = true;
      mic.disabled = true; actions.hidden = true;
      if (typing) typing.querySelectorAll('button, textarea').forEach(function (el) { el.disabled = true; });
      var full = ((q.front || '') + text).slice(0, 200);
      var st = r.status === 'correct' ? 'auto' : 'pending';
      H3A.api.submitSpeech({
        id: uuid(), ts: new Date().toISOString(), student: ctx.student, place: ctx.place, lesson: ctx.lessonId,
        activity: ctx.activity, qid: q.id, prompt: String(q.prompt).slice(0, 200), said: full, status: st
      });
      if (st === 'auto') {
        feedback.className = 'feedback ok'; feedback.textContent = '答對了！';
        H3A.sfx.correct(); H3A.tts.speak('答對了！');
        done(taught ? 'taught' : ['first', 'hint1', 'hint2'][Math.min(badCount, 2)], { said: full, status: st });
      } else {
        feedback.className = 'feedback ok'; feedback.textContent = '👩‍🏫 已送出，等老師批改';
        H3A.tts.speak('已送出，等老師批改');
        done('pending', { said: full, status: st });
      }
    }
  }

  H3A.ui.speakQuestion = speakQuestion;
})(this);
