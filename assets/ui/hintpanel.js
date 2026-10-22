/* 提示面板：第 1、2 層只給方法和線索（可打開課文段落，第 2 層把相關句子亮起來），
   「老師教你」才顯示答案和原因，按「我懂了」才繼續 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;

  function paraBlock(lesson, para) {
    var box = h('div', { class: 'hint-para' });
    var texts = [];
    para.paras.forEach(function (n) {
      var p = lesson.paragraphs[n - 1];
      var line = h('p', {}, h('span', { class: 'para-no' }, '第 ' + n + ' 段'));
      p.sentences.forEach(function (s) {
        texts.push(s.text);
        line.appendChild(h('span', { class: 'sent' + (para.highlight && para.sentIds.indexOf(s.id) >= 0 ? ' glow' : '') }, s.text));
      });
      box.appendChild(line);
    });
    box.appendChild(H3A.ui.speaker(texts.join(''), null, '念這一段'));
    return box;
  }

  /* level: 1 或 2 */
  H3A.ui.showHint = function (feedback, hint, ctx) {
    H3A.ui.clear(feedback);
    feedback.className = 'feedback hint';
    var row = h('div', { class: 'hint-row' }, h('span', {}, hint.text), H3A.ui.speaker(hint.say || hint.text, null));
    feedback.appendChild(row);
    if (hint.para && ctx.lesson && hint.para.paras.length) {
      var block = paraBlock(ctx.lesson, hint.para);
      if (hint.para.highlight) feedback.appendChild(block);
      else {
        block.hidden = true;
        row.appendChild(h('button', { type: 'button', class: 'btn-secondary small-btn', onclick: function (e) { block.hidden = false; e.currentTarget.remove(); } },
          '📖 看第 ' + hint.para.paras.join('、') + ' 段'));
        feedback.appendChild(block);
      }
    }
    H3A.sfx.wrong();
    H3A.tts.speak('再想想看').then(function (ok) { if (ok) H3A.tts.speak(hint.say || hint.text); });
  };

  H3A.ui.showTeach = function (feedback, teach, onUnderstood) {
    H3A.ui.clear(feedback);
    feedback.className = 'feedback teach';
    feedback.appendChild(h('div', { class: 'hint-row' }, h('strong', {}, '👩‍🏫 老師教你'), H3A.ui.speaker(teach.say || teach.text, null)));
    feedback.appendChild(h('p', {}, teach.text));
    var btn = h('button', { type: 'button', class: 'btn-primary', onclick: function () { btn.disabled = true; onUnderstood(); } }, '我懂了 ▶');
    feedback.appendChild(btn);
    H3A.tts.speak(teach.say || teach.text);
    return btn;
  };
})(this);
