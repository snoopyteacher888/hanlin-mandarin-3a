/* 答錯提示：第 1 次停用選到的；第 2 次再多停用一個錯的；第 3 次只剩正確答案 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.hints = m; }
})(this, function () {
  function create(optionCount, correctIndex) {
    return { optionCount: optionCount, correctIndex: correctIndex, disabled: [], wrongCount: 0, wrongPicked: [] };
  }
  function remainingWrong(disabled, s) {
    var out = [];
    for (var i = 0; i < s.optionCount; i++) {
      if (i !== s.correctIndex && disabled.indexOf(i) < 0) out.push(i);
    }
    return out;
  }
  function pickWrong(state, index, rng) {
    if (index === state.correctIndex) throw new Error('pickWrong called with the correct index');
    if (state.disabled.indexOf(index) >= 0) return state;
    var disabled = state.disabled.concat([index]);
    var wrongCount = state.wrongCount + 1;
    if (wrongCount === 2) {
      var rest = remainingWrong(disabled, state);
      if (rest.length > 1) disabled.push(rest[Math.floor(rng() * rest.length)]);
    } else if (wrongCount >= 3) {
      disabled = disabled.concat(remainingWrong(disabled, state));
    }
    return {
      optionCount: state.optionCount, correctIndex: state.correctIndex, disabled: disabled,
      wrongCount: wrongCount, wrongPicked: state.wrongPicked.concat([index])
    };
  }
  function result(state) {
    if (state.wrongCount === 0) return 'first';
    return state.wrongCount === 1 ? 'hint1' : 'hint2';
  }
  return { create: create, pickWrong: pickWrong, result: result };
});
