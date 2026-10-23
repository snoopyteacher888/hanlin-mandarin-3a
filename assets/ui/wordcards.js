/* 生字卡、語詞卡：格狀排列，點一張放大看細節 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  /* 教育部筆順學習網：網址的 ID 就是這個字的 Unicode 編碼（十進位） */
  function strokeUrl(ch) { return 'https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=' + ch.codePointAt(0) + '&la=0'; }
  function popup(box) {
    var pop = h('div', { class: 'vocab-pop', role: 'dialog', onclick: function (e) { if (e.target === pop) pop.remove(); } }, box);
    box.appendChild(h('button', { type: 'button', class: 'btn-secondary', onclick: function () { pop.remove(); } }, '關閉'));
    document.body.appendChild(pop);
  }
  /* 一段：小標題＋一句話＋🔊 */
  function section(label, text, extra) {
    return h('div', { class: 'card-sec' }, h('p', { class: 'card-label' }, label),
      extra || null, text ? h('p', { class: 'card-line' }, h('span', {}, text), H3A.ui.speaker(text, null)) : null);
  }
  /* 把句子裡的語詞標顏色 */
  function hl(sentence, word) {
    return sentence.split(word).reduce(function (acc, part, i) {
      if (i) acc.push(h('span', { class: 'char-mark' }, word));
      if (part) acc.push(part);
      return acc;
    }, []);
  }
  function hanziDetail(item) {
    var box = h('div', { class: 'vocab-box hanzi-detail' },
      h('div', { class: 'hanzi-head' },
        h('div', { class: 'hanzi-big' }, item.char),
        h('div', {}, h('div', { class: 'zhuyin' }, item.zhuyin), h('p', { class: 'small' }, '部首：' + item.radical + '　' + item.strokes + ' 畫'))),
      section('📚 常用語詞', null, h('p', { class: 'hanzi-words' }, item.words.map(function (w) { return h('span', {}, w, H3A.ui.speaker(w, null)); }))),
      item.sentence ? h('div', { class: 'card-sec' }, h('p', { class: 'card-label', 'aria-label': '例句' }, '💬'),
        h('p', { class: 'card-line' }, h('span', {}, hl(item.sentence, item.char)), H3A.ui.speaker(item.sentence, null))) : null,
      h('div', { class: 'result-actions' },
        H3A.ui.speaker(item.say, null, '念出：' + item.say),
        h('a', { class: 'btn-secondary stroke-link', href: strokeUrl(item.char), target: '_blank', rel: 'noopener' }, '✍️ 看筆順')));
    popup(box);
    H3A.tts.speak(item.say);
  }
  /* 一行：標籤＋內容＋🔊 */
  function infoLine(label, content, say, aria) {
    return h('p', { class: 'info-line' }, h('span', {}, h('span', { class: 'info-label', 'aria-label': aria || null }, label), content), H3A.ui.speaker(say, null));
  }
  H3A.ui.infoLine = infoLine;
  function vocabDetail(lessonId, item) {
    var sentence = item.example ? item.example.replace(/＿+/, item.word) : '';
    /* 寬的字卡：左邊圖，右邊語詞、意思、例句（「意思：」和解釋同一行） */
    var box = h('div', { class: 'vocab-box wide' },
      h('div', { class: 'vd-row' },
        h('div', { class: 'vd-pic' }, H3A.ui.picture(lessonId, item.img, item.word)),
        h('div', { class: 'vd-text' },
          h('h3', {}, item.word, H3A.ui.speaker(item.word, null)),
          infoLine('意思：', item.meaning, item.meaning),
          sentence ? infoLine('💬 ', hl(sentence, item.word), sentence, '例句') : null)));
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
