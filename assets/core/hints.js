/* 答錯提示：選錯的選項一律停用（變淡；老師要求）。
   提示是一層一層的（level）：答錯一次或自己按 💡 一次，都往上一層。
   第 3 層 → mustTeach：由畫面顯示答案並說明原因（「老師教你」）。 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.hints = m; }
})(this, function () {
  var TEACH_AFTER = 3;
  function create(optionCount, correctIndex) {
    return { optionCount: optionCount, correctIndex: correctIndex, disabled: [], wrongCount: 0, wrongPicked: [], level: 0 };
  }
  function pickWrong(state, index) {
    if (index === state.correctIndex) throw new Error('pickWrong called with the correct index');
    if (state.disabled.indexOf(index) >= 0) return state;
    return {
      optionCount: state.optionCount, correctIndex: state.correctIndex,
      disabled: state.disabled.concat([index]),
      wrongCount: state.wrongCount + 1, wrongPicked: state.wrongPicked.concat([index]), level: (state.level || 0) + 1
    };
  }
  /* 學生自己按 💡：給下一層提示，不停用任何選項 */
  function askHint(state) {
    var out = {}; for (var k in state) out[k] = state[k];
    out.level = (state.level || 0) + 1;
    return out;
  }
  function lv(state) { return state.level === undefined ? state.wrongCount : state.level; }
  function mustTeach(state) { return lv(state) >= TEACH_AFTER; }
  function result(state) {
    var n = lv(state);
    if (n === 0) return 'first';
    if (n === 1) return 'hint1';
    return n === 2 ? 'hint2' : 'taught';
  }
  return { create: create, pickWrong: pickWrong, askHint: askHint, mustTeach: mustTeach, result: result };
});
