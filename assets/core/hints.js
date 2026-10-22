/* 答錯提示：只停用選錯的選項，而且永遠至少留 2 個選項（不會只剩正確答案）。
   答錯第 3 次 → mustTeach：由畫面顯示答案並說明原因（「老師教你」）。 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.hints = m; }
})(this, function () {
  var TEACH_AFTER = 3;
  function create(optionCount, correctIndex) {
    return { optionCount: optionCount, correctIndex: correctIndex, disabled: [], wrongCount: 0, wrongPicked: [] };
  }
  function pickWrong(state, index) {
    if (index === state.correctIndex) throw new Error('pickWrong called with the correct index');
    if (state.disabled.indexOf(index) >= 0) return state;
    var enabledAfter = state.optionCount - state.disabled.length - 1;
    return {
      optionCount: state.optionCount, correctIndex: state.correctIndex,
      disabled: enabledAfter >= 2 ? state.disabled.concat([index]) : state.disabled.slice(),
      wrongCount: state.wrongCount + 1, wrongPicked: state.wrongPicked.concat([index])
    };
  }
  function mustTeach(state) { return state.wrongCount >= TEACH_AFTER; }
  function result(state) {
    if (state.wrongCount === 0) return 'first';
    if (state.wrongCount === 1) return 'hint1';
    return state.wrongCount === 2 ? 'hint2' : 'taught';
  }
  return { create: create, pickWrong: pickWrong, mustTeach: mustTeach, result: result };
});
