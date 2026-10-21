/* 錯題複習：把要複習的題號變成題目（課文地圖的步驟轉成選擇題） */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.quizgen || (typeof require === 'function' ? require('./quizgen.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.reviewgen = m; }
})(this, function (quizgen) {
  function mapStepQuestion(steps, idx, r) {
    var step = steps[idx];
    var others = quizgen.shuffle(steps.filter(function (_, i) { return i !== idx; }), r).slice(0, 3);
    var opts = quizgen.shuffle([step].concat(others), r);
    return {
      id: step.id,
      prompt: idx === 0 ? '第一步是什麼？' : '「' + steps[idx - 1].text + '」之後，下一步是什麼？',
      options: opts.map(function (s) { return { text: s.text, img: s.img, say: s.say }; }),
      answer: opts.indexOf(step), evidence: step.evidence
    };
  }
  function buildReviewQuestions(lesson, ids, r) {
    var out = [];
    ids.forEach(function (id) {
      var q = lesson.quiz.concat(lesson.testExtra).filter(function (x) { return x.id === id; })[0];
      if (q) { out.push(quizgen.prepare(q, r)); return; }
      for (var i = 0; i < lesson.mapSteps.length; i++) {
        if (lesson.mapSteps[i].id === id) { out.push(mapStepQuestion(lesson.mapSteps, i, r)); return; }
      }
    });
    return out;
  }
  return { mapStepQuestion: mapStepQuestion, buildReviewQuestions: buildReviewQuestions };
});
