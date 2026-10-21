/* 喇叭按鈕：點了只念，不會作答 */
(function (root) {
  var H3A = root.H3A;
  H3A.ui.speaker = function (text, say, label) {
    return H3A.ui.h('button', {
      class: 'speaker', type: 'button', 'aria-label': label || ('念出：' + text),
      onclick: function (e) { e.stopPropagation(); H3A.tts.speak(text, say); }
    }, '🔊');
  };
})(this);
