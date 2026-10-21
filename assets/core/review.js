/* 錯題複習：隔一個日曆日才出現，在複習中連續 2 次第一次就答對才移除 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.review = m; }
})(this, function () {
  var REMOVE_AFTER = 2;
  function copy(q) { var o = {}; for (var k in q) if (Object.prototype.hasOwnProperty.call(q, k)) o[k] = q[k]; return o; }
  function addMiss(queue, qid, today) {
    var q = copy(queue); q[qid] = { last: today, streak: 0 }; return q;
  }
  function due(queue, today) {
    return Object.keys(queue).filter(function (k) { return queue[k].last < today; });
  }
  function recordReview(queue, qid, firstTry, today) {
    var q = copy(queue);
    var prev = q[qid] || { last: today, streak: 0 };
    var streak = firstTry ? prev.streak + 1 : 0;
    if (streak >= REMOVE_AFTER) delete q[qid];
    else q[qid] = { last: today, streak: streak };
    return q;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  return { addMiss: addMiss, due: due, recordReview: recordReview, todayStr: todayStr };
});
