/* 出題：亂數、打亂選項、抽題 */
(function (root, factory) {
  var m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.quizgen = m; }
})(this, function () {
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function prepare(q, r) {
    var order = shuffle(q.options.map(function (_, i) { return i; }), r);
    var out = {};
    for (var k in q) if (Object.prototype.hasOwnProperty.call(q, k)) out[k] = q[k];
    out.options = order.map(function (i) { return q.options[i]; });
    out.answer = order.indexOf(q.answer);
    return out;
  }
  function pickN(pool, n, r) { return shuffle(pool, r).slice(0, Math.min(n, pool.length)); }
  return { rng: rng, shuffle: shuffle, prepare: prepare, pickN: pickN };
});
