/* 魚骨圖：一根骨頭一根骨頭找出屬於它的圖卡；放錯套用提示規則（第 1 次停用選到的、第 2 次再多停用一張、第 3 次只剩正確的） */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.quizgen || (typeof require === 'function' ? require('./quizgen.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.fishbone = m; }
})(this, function (quizgen) {
  function allCards(map) {
    var out = [];
    map.bones.forEach(function (b) { out = out.concat(b.cards); });
    return out.concat(map.decoys || []);
  }
  function bone(map, id) { return map.bones.filter(function (b) { return b.id === id; })[0]; }
  function card(map, id) { return allCards(map).filter(function (c) { return c.id === id; })[0]; }

  function createBone(map, boneId, placed) {
    return { bone: boneId, all: allCards(map).map(function (c) { return c.id; }), placed: placed.slice(),
      needed: bone(map, boneId).cards.map(function (c) { return c.id; }), disabled: [], wrongCount: 0, wrongPicked: [] };
  }
  function enabledCards(map, s) {
    return s.all.filter(function (id) {
      return s.placed.indexOf(id) < 0 && s.disabled.indexOf(id) < 0;
    });
  }
  function copy(s) {
    return { bone: s.bone, all: s.all, placed: s.placed.slice(), needed: s.needed.slice(), disabled: s.disabled.slice(),
      wrongCount: s.wrongCount, wrongPicked: s.wrongPicked.slice() };
  }
  function pick(s, id, rng) {
    if (s.placed.indexOf(id) >= 0 || s.disabled.indexOf(id) >= 0) return { state: s, outcome: 'ignored', boneDone: false };
    var n = copy(s);
    if (n.needed.indexOf(id) >= 0) {
      n.needed = n.needed.filter(function (x) { return x !== id; });
      n.placed.push(id);
      return { state: n, outcome: 'correct', boneDone: n.needed.length === 0 };
    }
    n.wrongCount++;
    n.wrongPicked.push(id);
    n.disabled.push(id);
    var others = enabledCards(null, n).filter(function (x) { return n.needed.indexOf(x) < 0; });
    if (n.wrongCount === 2 && others.length > 1) n.disabled.push(others[Math.floor(rng() * others.length)]);
    else if (n.wrongCount >= 3) n.disabled = n.disabled.concat(others);
    return { state: n, outcome: 'wrong', boneDone: false };
  }
  function result(s) { return s.wrongCount === 0 ? 'first' : s.wrongCount === 1 ? 'hint1' : 'hint2'; }
  function wrongTexts(map, s) { return s.wrongPicked.map(function (id) { return card(map, id).text; }); }

  /* 錯題複習用：把一根骨頭變成選擇題 */
  function boneQuestion(map, boneId, rng) {
    var b = bone(map, boneId);
    var right = b.cards[Math.floor(rng() * b.cards.length)];
    var mine = b.cards.map(function (c) { return c.id; });
    var others = quizgen.shuffle(allCards(map).filter(function (c) { return mine.indexOf(c.id) < 0; }), rng).slice(0, 3);
    var opts = quizgen.shuffle([right].concat(others), rng);
    return { id: b.id, prompt: '下面哪一個是「' + b.title + '」？',
      options: opts.map(function (c) { return { text: c.text, img: c.img, say: c.say }; }),
      answer: opts.indexOf(right), evidence: b.evidence };
  }
  return { allCards: allCards, bone: bone, card: card, createBone: createBone, enabledCards: enabledCards,
    pick: pick, result: result, wrongTexts: wrongTexts, boneQuestion: boneQuestion };
});
