/* 小工具：建立 DOM 元素 */
(function (root) {
  var H3A = root.H3A = root.H3A || {};
  H3A.ui = H3A.ui || {};
  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  /* 圖片：載入失敗時換成灰色框加文字 */
  function picture(lessonId, file, label) {
    var box = h('div', { class: 'pic' });
    if (!file) { box.classList.add('pic-missing'); box.appendChild(h('span', { text: label })); return box; }
    var img = h('img', { src: 'images/' + lessonId + '/' + file, alt: label, draggable: 'false' });
    img.onerror = function () { clear(box); box.classList.add('pic-missing'); box.appendChild(h('span', { text: label })); };
    box.appendChild(img);
    return box;
  }
  /* 活動圖示：images/icons/<名稱>.png（ChatGPT 畫的同一套圖示）；圖還沒上傳就先顯示 emoji */
  function activityIcon(name, emoji) {
    var box = h('span', { class: 'activity-icon', 'aria-hidden': 'true' });
    var img = h('img', { src: 'images/icons/' + name + '.png', alt: '', draggable: 'false' });
    img.onerror = function () { clear(box); box.appendChild(document.createTextNode(emoji)); };
    box.appendChild(img);
    return box;
  }
  /* 老師頭像（Q 版老師，images/teacher.png）；圖還沒上傳就顯示 👩‍🏫 */
  function teacherFace() {
    var box = h('span', { class: 'teacher-face', 'aria-hidden': 'true' });
    var img = h('img', { src: 'images/teacher.png', alt: '', draggable: 'false' });
    img.onerror = function () { clear(box); box.appendChild(document.createTextNode('👩‍🏫')); };
    box.appendChild(img);
    return box;
  }
  H3A.ui.h = h; H3A.ui.clear = clear; H3A.ui.picture = picture; H3A.ui.teacherFace = teacherFace; H3A.ui.activityIcon = activityIcon;
})(this);
