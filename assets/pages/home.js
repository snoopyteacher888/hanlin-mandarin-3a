/* 首頁：12 課清單，目前只有開放的課可以點 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  H3A.pages = H3A.pages || {};
  var NAMES = { read: '聽課文', map: '課文地圖', quiz: '理解提問', review: '錯題複習', test: '單元測驗' };
  H3A.pages.activityTitle = function (a) { return NAMES[a] || ''; };
  H3A.pages.home = function (main, ctx) {
    main.appendChild(h('h1', { class: 'page-title' }, '國語三上學習樂園'));
    var grid = h('div', { class: 'lesson-grid' });
    (root.H3A_LESSONS || []).forEach(function (l) {
      var n = parseInt(l.id.slice(1), 10);
      grid.appendChild(h('button', {
        type: 'button', class: 'lesson-card' + (l.open ? '' : ' is-closed'), disabled: !l.open,
        onclick: function () { ctx.go('#/' + l.id); }
      }, h('span', { class: 'lesson-no' }, '第 ' + n + ' 課'), h('span', { class: 'lesson-name' }, l.title),
        l.open ? null : h('span', { class: 'soon' }, '即將推出')));
    });
    main.appendChild(grid);
  };
})(this);
