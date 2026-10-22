/* 生字卡、語詞卡：格狀排列，點一張放大看細節 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var STROKE_URL = 'https://stroke-order.learningweb.moe.edu.tw/characterQueryResult.do?word=';
  function popup(box) {
    var pop = h('div', { class: 'vocab-pop', role: 'dialog', onclick: function (e) { if (e.target === pop) pop.remove(); } }, box);
    box.appendChild(h('button', { type: 'button', class: 'btn-secondary', onclick: function () { pop.remove(); } }, '關閉'));
    document.body.appendChild(pop);
  }
  function hanziDetail(item) {
    var box = h('div', { class: 'vocab-box hanzi-detail' },
      h('div', { class: 'hanzi-big' }, item.char),
      h('div', { class: 'zhuyin' }, item.zhuyin),
      h('p', {}, '部首：' + item.radical + '　筆畫：' + item.strokes + ' 畫'),
      h('p', { class: 'hanzi-words' }, item.words.map(function (w) { return h('span', {}, w, H3A.ui.speaker(w, null)); })),
      h('div', { class: 'result-actions' },
        H3A.ui.speaker(item.say, null, '念出：' + item.say),
        h('a', { class: 'btn-secondary stroke-link', href: STROKE_URL + encodeURIComponent(item.char), target: '_blank', rel: 'noopener' }, '✍️ 看筆順')));
    popup(box);
    H3A.tts.speak(item.say);
  }
  function vocabDetail(lessonId, item) {
    var box = h('div', { class: 'vocab-box' },
      H3A.ui.picture(lessonId, item.img, item.word),
      h('h3', {}, item.word, H3A.ui.speaker(item.word, null)),
      h('p', {}, item.meaning, H3A.ui.speaker(item.meaning, null)));
    popup(box);
    H3A.tts.speak(item.word);
  }
  H3A.ui.hanziCards = function (items) {
    return h('div', { class: 'word-grid' }, items.map(function (it) {
      return h('button', { type: 'button', class: 'word-card hanzi-card', 'data-id': it.id, onclick: function () { hanziDetail(it); } },
        h('span', { class: 'hanzi-mid' }, it.char), h('span', { class: 'zhuyin small' }, it.zhuyin));
    }));
  };
  H3A.ui.vocabCards = function (lessonId, items) {
    return h('div', { class: 'word-grid vocab-grid' }, items.map(function (it) {
      return h('button', { type: 'button', class: 'word-card', 'data-id': it.id, onclick: function () { vocabDetail(lessonId, it); } },
        H3A.ui.picture(lessonId, it.img, it.word), h('span', { class: 'option-text' }, it.word));
    }));
  };
})(this);
