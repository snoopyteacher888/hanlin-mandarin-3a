/* 注音字型的破音字修正：字型預設顯示第 1 個讀音，這裡在需要別的讀音的字後面加上
   IVS 選擇子（U+E01E1 = 第 2 個讀音、U+E01E2 = 第 3 個…）。讀音順序依字型的讀音表。
   規則是逐一檢查網站文字後整理的：[詞語, { 詞語中第幾個字: 第幾個讀音（0 起算）}] */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.zhuyin = m; }
})(this, function () {
  var RULES = [
    ['部分', { 1: 1 }], ['＿分', { 1: 1 }],
    ['長出', { 0: 1 }], ['睡覺', { 1: 1 }], ['午覺', { 1: 1 }], ['好奇', { 0: 1 }], ['好處', { 1: 1 }], ['空格', { 0: 1 }],
    ['音樂', { 1: 1 }], ['老師教', { 2: 1 }], ['用得', { 1: 1 }], ['吹得', { 1: 1 }], ['笑得', { 1: 1 }],
    ['意思', { 1: 2 }],
    ['處處', { 0: 1, 1: 1 }],
    ['媽媽', { 1: 1 }], ['爸爸', { 1: 1 }],
    ['寫得', { 1: 1 }], ['變得', { 1: 1 }], ['走得', { 1: 1 }],
    ['教你', { 0: 1 }],
    ['數數', { 0: 1, 1: 1 }],
    ['耳朵', { 1: 1 }],
    ['樂器', { 0: 1 }],
    ['東西', { 1: 1 }],
    ['木頭', { 1: 1 }], ['石頭', { 1: 1 }], ['骨頭', { 1: 1 }], ['斧頭', { 1: 1 }],
    ['轉動', { 0: 1 }],
    ['重複', { 0: 1 }], ['重新', { 0: 1 }],
    ['家長', { 1: 1 }],
    ['相反', { 0: 1 }],
    ['著作', { 0: 1 }],
    ['因為', { 1: 1 }], ['為什麼', { 0: 1 }], ['為梨花', { 0: 1 }],
    ['沙子', { 1: 1 }], ['兔子', { 1: 1 }], ['句子', { 1: 1 }], ['猴子', { 1: 1 }], ['獅子', { 1: 1 }],
    ['刀子', { 1: 1 }], ['棍子', { 1: 1 }], ['杯子', { 1: 1 }]
  ];
  var VS = /[\uDB40][\uDDE0-\uDDEF]/g;          // U+E01E0–U+E01EF（UTF-16 代理對）
  function vs(n) { return String.fromCharCode(0xDB40, 0xDDE0 + n); }
  function strip(text) { return String(text).replace(VS, ''); }
  function mark(text) {
    if (!text || VS.test(text)) { VS.lastIndex = 0; return text; }
    VS.lastIndex = 0;
    var picks = {};                               // 位置 → 讀音
    RULES.forEach(function (r) {
      var from = 0, at;
      while ((at = text.indexOf(r[0], from)) >= 0) {
        Object.keys(r[1]).forEach(function (k) { picks[at + (+k)] = r[1][k]; });
        from = at + 1;
      }
    });
    var keys = Object.keys(picks);
    if (!keys.length) return text;
    var out = '';
    for (var i = 0; i < text.length; i++) {
      out += text.charAt(i);
      if (picks[i]) out += vs(picks[i]);
    }
    return out;
  }
  return { mark: mark, strip: strip, RULES: RULES };
});
