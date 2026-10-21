/* 老師後台：老師密碼登入，看每位學生的作答紀錄、最常錯的題目、管理名冊 */
(function (root) {
  var H3A = root.H3A; var h = H3A.ui.h;
  var ANIMALS = [['bear', '🐻', '小熊'], ['rabbit', '🐰', '兔子'], ['cat', '🐱', '小貓'], ['dog', '🐶', '小狗'], ['panda', '🐼', '熊貓'],
    ['tiger', '🐯', '老虎'], ['lion', '🦁', '獅子'], ['monkey', '🐵', '猴子'], ['pig', '🐷', '小豬'], ['frog', '🐸', '青蛙'],
    ['penguin', '🐧', '企鵝'], ['fox', '🦊', '狐狸']];
  var RESULT = { first: '✅ 第一次就答對', hint1: '🟡 答錯 1 次後答對', hint2: '🟠 答錯 2 次以上', wrong: '❌ 答錯' };
  var PLACE = { home: '家裡', school: '學校' };

  function token() { try { return root.sessionStorage.getItem('h3a.token'); } catch (e) { return H3A.tokenMem || null; } }
  function setToken(t) { try { if (t) root.sessionStorage.setItem('h3a.token', t); else root.sessionStorage.removeItem('h3a.token'); } catch (e) { H3A.tokenMem = t; } }
  function fmtDate(ts) { var d = new Date(ts); return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }

  H3A.pages.teacher = function render(main, ctx) {
    if (!(root.H3A_CONFIG && root.H3A_CONFIG.backendUrl)) {
      main.appendChild(h('p', { class: 'notice' }, '尚未設定後台。請依照「老師使用說明」建立 Google 試算表，並把網址交給 Claude。'));
      return;
    }
    if (!token()) { login(main, ctx); return; }
    dashboard(main, ctx);
  };

  function login(main, ctx) {
    H3A.ui.clear(main);
    var input = h('input', { type: 'password', class: 'big-input', autocomplete: 'current-password', 'aria-label': '老師密碼' });
    var msg = h('p', { class: 'error', role: 'alert' });
    var btn = h('button', { type: 'submit', class: 'btn-primary' }, '登入');
    main.appendChild(h('form', { class: 'unlock', onsubmit: function (e) {
      e.preventDefault(); btn.disabled = true; msg.textContent = '';
      H3A.api.call('login', { password: input.value }).then(function (res) {
        btn.disabled = false;
        if (res.token) { setToken(res.token); dashboard(main, ctx); return; }
        msg.textContent = res.error === 'LOCKED' ? '輸錯太多次，請 15 分鐘後再試' : res.error === 'NO_PASSWORD_SET' ? '後台還沒設定老師密碼' : '密碼不對';
      }, function () { btn.disabled = false; msg.textContent = '無法連線，請檢查網路'; });
    } }, h('h2', {}, '📊 老師後台'), input, btn, msg));
    input.focus();
  }

  function dashboard(main, ctx) {
    H3A.ui.clear(main);
    var lesson = null;
    H3A.session.getLesson('L06').then(function (l) { lesson = l; }, function () {});
    var fStu = h('select', { class: 'big-select', 'aria-label': '學生' }, h('option', { value: '' }, '全部學生'));
    var fAct = h('select', { class: 'big-select', 'aria-label': '活動' }, h('option', { value: '' }, '全部活動'),
      ['read', 'map', 'quiz', 'review', 'test'].map(function (a) { return h('option', { value: a }, H3A.pages.activityTitle(a)); }));
    var fRange = h('select', { class: 'big-select', 'aria-label': '日期' },
      h('option', { value: 'week' }, '最近 7 天'), h('option', { value: 'today' }, '今天'), h('option', { value: 'all' }, '全部'));
    var listBox = h('div', { class: 'panel' }), missBox = h('div', { class: 'panel' }), rosterBox = h('div', { class: 'panel' });
    var roster = [];
    main.appendChild(h('div', { class: 'form-row' }, fStu, fAct, fRange,
      h('button', { type: 'button', class: 'btn-secondary', onclick: function () { setToken(null); login(main, ctx); } }, '登出')));
    main.appendChild(missBox); main.appendChild(listBox); main.appendChild(rosterBox);
    [fStu, fAct, fRange].forEach(function (el) { el.addEventListener('change', load); });

    function who(id) {
      if (id === 'class') return '👨‍👩‍👧‍👦 全班';
      var r = roster.filter(function (x) { return x.id === id; })[0];
      return r ? r.emoji + ' ' + r.name : id;
    }
    function qText(id) {
      if (!lesson) return id;
      var all = lesson.quiz.concat(lesson.testExtra);
      var q = all.filter(function (x) { return x.id === id; })[0];
      if (q) return q.prompt;
      var m = lesson.mapSteps.filter(function (x) { return x.id === id; })[0];
      return m ? '課文地圖：' + m.text : id;
    }
    function load() {
      H3A.ui.clear(listBox); listBox.appendChild(h('p', {}, '載入中…'));
      var filter = { student: fStu.value || undefined, activity: fAct.value || undefined, since: H3A.dashboard.sinceFor(fRange.value, new Date()) };
      H3A.api.call('records', { token: token(), filter: filter }).then(function (res) {
        if (res.error === 'AUTH') { setToken(null); login(main, ctx); return; }
        if (res.roster) { roster = res.roster; fillRoster(); }
        showList(res.records || []);
      }, function () { H3A.ui.clear(listBox); listBox.appendChild(h('p', { class: 'error' }, '無法連線，請檢查網路')); });
    }
    function fillRoster() {
      var cur = fStu.value;
      H3A.ui.clear(fStu);
      fStu.appendChild(h('option', { value: '' }, '全部學生'));
      fStu.appendChild(h('option', { value: 'class' }, '👨‍👩‍👧‍👦 全班'));
      roster.forEach(function (r) { fStu.appendChild(h('option', { value: r.id }, r.emoji + ' ' + r.name)); });
      fStu.value = cur;
      showRoster();
    }
    function showList(records) {
      H3A.ui.clear(missBox);
      missBox.appendChild(h('h2', {}, '最常錯的題目'));
      var top = H3A.dashboard.topMissed(records, 5);
      if (!top.length) missBox.appendChild(h('p', {}, '目前沒有答錯的題目。'));
      else missBox.appendChild(h('ol', {}, top.map(function (t) { return h('li', {}, qText(t.q) + '　錯 ' + t.count + ' 次'); })));
      H3A.ui.clear(listBox);
      listBox.appendChild(h('h2', {}, '作答紀錄（' + records.length + ' 筆）'));
      if (!records.length) { listBox.appendChild(h('p', {}, '這段時間還沒有紀錄。')); return; }
      var table = h('table', { class: 'rec-table' }, h('thead', {}, h('tr', {}, ['學生', '活動', '時間', '地點', '結果', ''].map(function (t) { return h('th', {}, t); }))));
      var tb = h('tbody'); table.appendChild(tb);
      records.forEach(function (r) {
        var detail = h('tr', { class: 'rec-detail', hidden: true }, h('td', { colspan: '6' },
          r.items.length ? h('ul', {}, r.items.map(function (it) {
            return h('li', {}, qText(it.q) + '：' + (RESULT[it.result] || it.result) + (it.wrong && it.wrong.length ? '（選錯：' + it.wrong.join('、') + '）' : ''));
          })) : '讀完課文', h('p', { class: 'small' }, '花費 ' + Math.floor(r.durationSec / 60) + ' 分 ' + (r.durationSec % 60) + ' 秒')));
        var res = r.score !== null && r.score !== undefined ? r.score + ' 分' : r.activity === 'read' ? '完成' : Math.round(r.firstTryRate * 100) + '%';
        tb.appendChild(h('tr', {},
          h('td', {}, who(r.student)), h('td', {}, H3A.pages.activityTitle(r.activity)), h('td', {}, fmtDate(r.ts)),
          h('td', {}, PLACE[r.place] || r.place), h('td', {}, res + ' ' + '⭐'.repeat(r.stars || 0)),
          h('td', {}, h('button', { type: 'button', class: 'btn-secondary small-btn', onclick: function () { detail.hidden = !detail.hidden; } }, '看細節'))));
        tb.appendChild(detail);
      });
      listBox.appendChild(h('div', { class: 'table-wrap' }, table));
    }
    function showRoster() {
      H3A.ui.clear(rosterBox);
      rosterBox.appendChild(h('h2', {}, '學生名冊'));
      rosterBox.appendChild(h('p', { class: 'small' }, '網站上只用動物代號，不放真實姓名。代號是誰，請記在您自己的筆記裡。'));
      var rows = roster.map(function (r) { return { id: r.id, emoji: r.emoji, name: r.name }; });
      var list = h('div', { class: 'roster-list' });
      function draw() {
        H3A.ui.clear(list);
        rows.forEach(function (r, i) {
          var name = h('input', { type: 'text', class: 'big-input', value: r.name, maxlength: '10', 'aria-label': '顯示名稱' });
          name.addEventListener('input', function () { r.name = name.value; });
          list.appendChild(h('div', { class: 'form-row' }, h('span', { class: 'picker-emoji' }, r.emoji), name,
            h('button', { type: 'button', class: 'btn-secondary', onclick: function () { rows.splice(i, 1); draw(); } }, '刪除')));
        });
        var free = ANIMALS.filter(function (a) { return !rows.some(function (r) { return r.id === a[0]; }); });
        if (free.length) {
          var pick = h('select', { class: 'big-select', 'aria-label': '新增動物' }, free.map(function (a) { return h('option', { value: a[0] }, a[1] + ' ' + a[2]); }));
          list.appendChild(h('div', { class: 'form-row' }, pick, h('button', { type: 'button', class: 'btn-secondary', onclick: function () {
            var a = ANIMALS.filter(function (x) { return x[0] === pick.value; })[0]; rows.push({ id: a[0], emoji: a[1], name: a[2] }); draw();
          } }, '＋ 新增學生')));
        }
      }
      draw();
      var msg = h('span', { class: 'saved' });
      rosterBox.appendChild(list);
      rosterBox.appendChild(h('button', { type: 'button', class: 'btn-primary', onclick: function () {
        H3A.api.call('saveRoster', { token: token(), roster: rows }).then(function (res) {
          if (res.error === 'AUTH') { setToken(null); login(main, ctx); return; }
          if (res.error) { msg.textContent = '儲存失敗：名稱要 1～10 個字'; return; }
          roster = res.roster; H3A.session.refreshRoster(); msg.textContent = '已儲存 ✔'; fillRoster();
        }, function () { msg.textContent = '無法連線'; });
      } }, '儲存名冊'));
      rosterBox.appendChild(msg);
    }
    load();
  }
})(this);
