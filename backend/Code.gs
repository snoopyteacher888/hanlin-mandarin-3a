/**
 * 國語三上學習樂園：老師後台（Google Apps Script）
 *
 * 設定方式見 docs/teacher-guide.md：
 * 1. 在 Google 試算表選「擴充功能 → Apps Script」，把這整個檔案貼上。
 * 2. 「專案設定 → 指令碼屬性」新增 TEACHER_PASSWORD（老師後台密碼）。
 * 3. 「部署 → 新增部署作業 → 網頁應用程式」，執行身分選「我」，存取權選「所有人」。
 */

var COLUMNS = ['id', 'ts', 'student', 'place', 'lesson', 'activity', 'firstTryRate', 'score', 'stars', 'durationSec', 'items'];
var MAX_FAILS = 5;
var LOCK_MS = 15 * 60 * 1000;
var TOKEN_SECONDS = 2 * 60 * 60;

/* ---------- 純邏輯（可以在 Node 測試） ---------- */

function validateRecord(r) {
  if (!r || typeof r !== 'object') return 'record missing';
  if (typeof r.id !== 'string' || !r.id || r.id.length > 64) return 'bad id';
  if (typeof r.student !== 'string' || !r.student || r.student.length > 20) return 'bad student';
  if (typeof r.activity !== 'string' || !/^[a-z]{2,12}$/.test(r.activity)) return 'bad activity';
  if (typeof r.lesson !== 'string' || !/^L\d{2}$/.test(r.lesson)) return 'bad lesson';
  if (r.place !== 'home' && r.place !== 'school') return 'bad place';
  if (!Array.isArray(r.items) || r.items.length > 50) return 'bad items';
  if (JSON.stringify(r).length > 20000) return 'too large';
  return null;
}

function lockState(p, now) { return { locked: !!(p.lockedUntil && now < p.lockedUntil) }; }

function registerFail(p, now) {
  var fails = (p.fails || 0) + 1;
  if (fails >= MAX_FAILS) return { fails: 0, lockedUntil: now + LOCK_MS };
  return { fails: fails, lockedUntil: p.lockedUntil || 0 };
}

function toRow(r) {
  return COLUMNS.map(function (c) {
    if (c === 'items') return JSON.stringify(r.items);
    return r[c] === null || r[c] === undefined ? '' : r[c];
  });
}

function fromRow(row) {
  var r = {};
  COLUMNS.forEach(function (c, i) { r[c] = row[i]; });
  r.items = r.items ? JSON.parse(r.items) : [];
  ['firstTryRate', 'stars', 'durationSec'].forEach(function (k) { r[k] = Number(r[k]); });
  r.score = r.score === '' || r.score === null ? null : Number(r.score);
  if (r.ts instanceof Date) r.ts = r.ts.toISOString();
  return r;
}

/* sheet 介面：{ ids(): string[], append(row) } */
function submitRecord(sheet, r) {
  if (sheet.ids().indexOf(r.id) >= 0) return { ok: true, dup: true };
  sheet.append(toRow(r));
  return { ok: true };
}

function filterRecords(rows, f) {
  return rows.filter(function (r) {
    if (f.student && r.student !== f.student) return false;
    if (f.activity && r.activity !== f.activity) return false;
    if (f.since && String(r.ts) < f.since) return false;
    return true;
  });
}

function validateRoster(list) {
  if (!Array.isArray(list) || list.length > 40) return 'bad roster';
  var seen = {};
  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    if (!s || typeof s.id !== 'string' || !/^[a-z0-9-]{1,20}$/.test(s.id)) return 'bad id';
    if (seen[s.id]) return 'duplicate id';
    seen[s.id] = true;
    if (typeof s.name !== 'string' || !s.name || s.name.length > 10) return 'bad name';
    if (typeof s.emoji !== 'string' || !s.emoji || s.emoji.length > 16) return 'bad emoji';
  }
  return null;
}

/* ---------- Apps Script 端 ---------- */

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function sheetNamed(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

function recordsSheet() { return sheetNamed('records', COLUMNS); }
function rosterSheet() { return sheetNamed('roster', ['id', 'emoji', 'name']); }

function readRoster() {
  var v = rosterSheet().getDataRange().getValues().slice(1);
  return v.filter(function (r) { return r[0]; }).map(function (r) { return { id: String(r[0]), emoji: String(r[1]), name: String(r[2]) }; });
}

function props() { return PropertiesService.getScriptProperties(); }

function checkToken(token) {
  if (!token) return false;
  var cache = CacheService.getScriptCache();
  if (!cache.get('tok_' + token)) return false;
  cache.put('tok_' + token, '1', TOKEN_SECONDS);
  return true;
}

function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json({ error: 'BAD_JSON' }); }
  var action = body.action;

  if (action === 'submit') {
    var bad = validateRecord(body.record);
    if (bad) return json({ error: 'BAD_RECORD', detail: bad });
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sh = recordsSheet();
      var adapter = {
        ids: function () {
          var n = sh.getLastRow() - 1;
          return n > 0 ? sh.getRange(2, 1, n, 1).getValues().map(function (r) { return String(r[0]); }) : [];
        },
        append: function (row) { sh.appendRow(row); }
      };
      return json(submitRecord(adapter, body.record));
    } finally { lock.releaseLock(); }
  }

  if (action === 'roster') return json({ roster: readRoster() });

  if (action === 'login') {
    var p = props();
    var state = { fails: Number(p.getProperty('FAILS') || 0), lockedUntil: Number(p.getProperty('LOCKED_UNTIL') || 0) };
    var now = Date.now();
    if (lockState(state, now).locked) return json({ error: 'LOCKED', until: state.lockedUntil });
    var pw = p.getProperty('TEACHER_PASSWORD');
    if (!pw) return json({ error: 'NO_PASSWORD_SET' });
    if (body.password !== pw) {
      var next = registerFail(state, now);
      p.setProperty('FAILS', String(next.fails)); p.setProperty('LOCKED_UNTIL', String(next.lockedUntil));
      return json({ error: lockState(next, now).locked ? 'LOCKED' : 'BAD_PASSWORD' });
    }
    p.setProperty('FAILS', '0');
    var token = Utilities.getUuid();
    CacheService.getScriptCache().put('tok_' + token, '1', TOKEN_SECONDS);
    return json({ token: token });
  }

  if (action === 'records' || action === 'saveRoster') {
    if (!checkToken(body.token)) return json({ error: 'AUTH' });
    if (action === 'records') {
      var rows = recordsSheet().getDataRange().getValues().slice(1).filter(function (r) { return r[0]; }).map(fromRow);
      var list = filterRecords(rows, body.filter || {});
      list.sort(function (a, b) { return String(b.ts).localeCompare(String(a.ts)); });
      return json({ records: list.slice(0, 1000), roster: readRoster() });
    }
    var badR = validateRoster(body.roster);
    if (badR) return json({ error: 'BAD_ROSTER', detail: badR });
    var rs = rosterSheet();
    if (rs.getLastRow() > 1) rs.getRange(2, 1, rs.getLastRow() - 1, 3).clearContent();
    if (body.roster.length) rs.getRange(2, 1, body.roster.length, 3).setValues(body.roster.map(function (s) { return [s.id, s.emoji, s.name]; }));
    return json({ ok: true, roster: readRoster() });
  }

  return json({ error: 'UNKNOWN_ACTION' });
}

if (typeof module !== 'undefined') {
  module.exports = { validateRecord: validateRecord, lockState: lockState, registerFail: registerFail, toRow: toRow,
    fromRow: fromRow, submitRecord: submitRecord, filterRecords: filterRecords, validateRoster: validateRoster };
}
