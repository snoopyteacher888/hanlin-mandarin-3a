/* B 批活動共用：認識頁＋作答題排成一串跑完；老師批「再試一次」時只重說那一題 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;

  function learn(prompt, render, autoSay) { return { type: 'learn', prompt: prompt, render: render, autoSay: autoSay }; }

  /* 可以點來聽的一句話 */
  function sayLine(text, cls) { return h('p', { class: 'learn-line' + (cls ? ' ' + cls : '') }, h('span', {}, text), H3A.ui.speaker(text, null)); }

  function runFlow(main, ctx, activity, questions, again, extra) {
    /* 正確答案平均分到各個位置，不會老是第一個 */
    questions = H3A.quizgen.balance(questions, H3A.quizgen.rng(Date.now() & 0xffffffff));
    H3A.ui.runQuestions(main, ctx, { questions: questions, mode: 'practice', onDone: function (summary) {
      H3A.ui.finishActivity(main, ctx, activity, summary, again, true, extra);
    } });
  }

  /* 只跑一題說說看，做完回到「老師的批改」 */
  function retrySpeak(main, ctx, q) {
    H3A.ui.runQuestions(main, ctx, { questions: [q], mode: 'practice', onDone: function () {
      H3A.ui.clear(main);
      var msg = '已經重新送出，等老師再批改一次。';
      main.appendChild(h('div', { class: 'result' }, h('h2', {}, '👍 ' + msg, H3A.ui.speaker(msg, null)),
        h('div', { class: 'result-actions' },
          h('button', { type: 'button', class: 'btn-primary', onclick: function () { ctx.go('#/' + ctx.lessonId + '/feedback'); } }, '回到老師的批改'))));
      H3A.tts.speak(msg);
    } });
  }

  function missing(main) { main.appendChild(h('p', { class: 'notice' }, '這一課的練習還沒準備好。')); }

  H3A.ui.flow = { learn: learn, sayLine: sayLine, run: runFlow, retry: retrySpeak, missing: missing };
})(this);
