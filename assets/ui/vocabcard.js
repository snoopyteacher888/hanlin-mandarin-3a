/* 語詞小卡：圖片＋簡單解釋＋🔊 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var open = null;
  H3A.ui.vocabCard = function (lessonId, v) {
    if (open) open.remove();
    var close = function () { card.remove(); open = null; };
    var card = h('div', { class: 'vocab-pop', role: 'dialog', 'aria-label': v.word, onclick: function (e) { if (e.target === card) close(); } },
      h('div', { class: 'vocab-box' },
        H3A.ui.picture(lessonId, v.img, v.word),
        h('h3', {}, v.word, H3A.ui.speaker(v.word, v.say)),
        h('p', {}, v.meaning, H3A.ui.speaker(v.meaning, null)),
        h('button', { type: 'button', class: 'btn-secondary', onclick: close }, '關閉')));
    document.body.appendChild(card);
    open = card;
    H3A.tts.speak(v.word, v.say);
  };
})(this);
