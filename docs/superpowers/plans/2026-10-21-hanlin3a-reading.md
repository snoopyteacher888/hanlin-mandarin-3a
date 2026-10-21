# 第 6 課閱讀理解網站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 做出翰林版三上第 6 課〈小鉛筆大學問〉的閱讀理解網站（聽課文、課文地圖、理解提問、錯題複習、單元測驗），加上老師設定、老師後台（Google Apps Script）與課文加密。

**Architecture:** 純靜態網站，用一般 `<script>` 依序載入，全部掛在全域 `window.H3A`。不含 DOM 的邏輯放在 `assets/core/`，採 UMD 寫法，Node 可以直接 `require` 來做單元測試。頁面採 hash 路由，每個頁面是一個 `render(root, ctx)` 函式。課文資料用 WebCrypto（PBKDF2＋AES-GCM）加密。紀錄透過 `text/plain` POST 送到 Apps Script。

**Tech Stack:** HTML／CSS／ES2017 JavaScript、Web Speech API、WebCrypto、Node 22 `node:test`、Playwright（Chromium 位於 `/opt/pw-browsers/chromium`）、Google Apps Script V8。

**Spec:** `docs/superpowers/specs/2026-10-21-hanlin3a-reading-design.md`

## Global Constraints

- 不用框架、不用打包工具；語法上限 ES2017（不用 `?.`、`??`、class fields）。
- 每個 core 檔：`(function (root, f) { var m = f(); if (typeof module === 'object' && module.exports) module.exports = m; else { root.H3A = root.H3A || {}; root.H3A.<name> = m; } })(this, function () { ... })`。
- localStorage 鍵一律加前綴 `h3a.`，每次讀寫都用 try/catch 包起來。
- 介面文字照規格固定：`再想想看`、`答對了！`、`下一題 ▶`、`請輸入教室密碼`、`密碼不對，請問老師`、`課文有著作權，密碼請勿外流`、`這台裝置沒有中文語音`、`▶ 從頭念`、`我讀完了`、`即將推出`。
- 點選區域至少 64×64 CSS px；橫式 2×2、直式 1 欄（以 `@media (orientation: portrait)` 判斷）。
- repo 會公開：不可 commit 真實課文明文（`*.plain.json` 已列入 gitignore）、不可放密碼、不可放學生姓名。測試用的加密檔只能用**虛構內容**。
- 加密參數：PBKDF2-SHA256、250000 次、256-bit AES-GCM、12-byte IV、全站 16-byte 鹽值。
- 星星：第一次答對率 ≥0.8 → 3 顆；≥0.5 → 2 顆；其他 → 1 顆；聽課文完成 → 3 顆。
- 錯題複習：至少隔 1 個日曆日才出現；在複習中連續 2 次第一次就答對才移除。
- 後端登入：連續失敗 5 次鎖 15 分鐘；token 閒置 2 小時失效。
- 所有靜態檔的網址都帶 `?v=<版本>`，由 `tools/bump_version.mjs` 統一更新。
- Commit 訊息結尾要加上 session 的 attribution 行。

## Review Focus

1. 電子白板上連點兩下（選項、「下一題 ▶」）：只能記一次作答、只前進一題。→ Task 7 測試 `double tap advances once`。
2. 換頁或點另一個 🔊 時，上一段語音必須停止，不能疊在一起念。→ Task 5 測試 `speak cancels previous`、Task 6 路由換頁時呼叫 `tts.stop()`。
3. Safari 無痕模式下 localStorage 會丟錯：網站仍要能作答，不能整頁空白。→ Task 5 測試 `store survives throwing storage`。
4. outbox 重送時，伺服器其實已經寫入過：不能出現重複紀錄。→ Task 11 測試 `submit is idempotent by id`。
5. 網址帶的 `s=` 已從名冊刪除：要顯示頭像選擇畫面，不能把紀錄記在不存在的代號下。→ Task 6 測試 `unknown student id shows picker`（e2e，Task 13）。

---

### Task 1: 專案骨架＋計分與提示邏輯

**Files:**
- Create: `package.json`（`"scripts": {"test": "node --test tests/unit/", "e2e": "node --test tests/e2e/"}`，`"private": true`）
- Create: `assets/core/scoring.js`、`assets/core/hints.js`
- Test: `tests/unit/scoring.test.js`、`tests/unit/hints.test.js`

**Interfaces:**
- Produces:
  - `H3A.scoring.firstTryRate(results: string[]) -> number`（results 的值是 `'first'|'hint1'|'hint2'`；空陣列回傳 0）
  - `H3A.scoring.starsFor(rate: number) -> 1|2|3`
  - `H3A.scoring.testScore(correct: number, total: number) -> number`（四捨五入到整數百分比）
  - `H3A.hints.create(optionCount: number, correctIndex: number) -> HintState`，其中 `HintState = {disabled: number[], wrongCount: number, wrongPicked: number[], correctIndex, optionCount}`
  - `H3A.hints.pickWrong(state, index, rng: () => number) -> HintState`（回傳新物件，不修改原本的 state）
  - `H3A.hints.result(state) -> 'first'|'hint1'|'hint2'`

- [ ] **Step 1: 寫失敗的測試**

```js
test('stars thresholds', () => {
  assert.equal(starsFor(0.8), 3); assert.equal(starsFor(0.79), 2);
  assert.equal(starsFor(0.5), 2); assert.equal(starsFor(0.49), 1); assert.equal(starsFor(0), 1);
});
test('firstTryRate', () => {
  assert.equal(firstTryRate(['first','hint1','first','hint2']), 0.5);
  assert.equal(firstTryRate([]), 0);
});
test('testScore', () => { assert.equal(testScore(5, 8), 63); });
test('wrong 1 disables picked only', () => {
  const s = pickWrong(create(4, 2), 0, () => 0);
  assert.deepEqual(s.disabled, [0]); assert.equal(result(s), 'hint1');
});
test('wrong 2 leaves correct plus one wrong', () => {
  let s = pickWrong(create(4, 2), 0, () => 0); s = pickWrong(s, 1, () => 0);
  assert.equal(4 - s.disabled.length, 2); assert.ok(!s.disabled.includes(2)); assert.equal(result(s), 'hint2');
});
test('wrong 3 leaves only correct (7 options for map)', () => {
  let s = create(7, 4); [0, 1, 2].forEach(i => { s = pickWrong(s, i, Math.random); });
  assert.deepEqual([0,1,2,3,4,5,6].filter(i => !s.disabled.includes(i)), [4]);
});
test('picking correct index throws', () => { assert.throws(() => pickWrong(create(4, 2), 2, Math.random)); });
```

- [ ] **Step 2: 執行 `npm test`，預期 FAIL（找不到模組）**
- [ ] **Step 3: 實作 scoring.js、hints.js**。提示規則：wrongCount 為 1 時只停用選到的選項；為 2 時停用選到的選項，再從還沒停用的錯誤選項中用 rng 多停用 1 個；≥3 時停用所有錯誤選項。重複點已停用的選項時，回傳原本的 state。
- [ ] **Step 4: 執行 `npm test`，預期 PASS**
- [ ] **Step 5: Commit** `feat: scoring and hint rules`

### Task 2: 錯題複習排程、網址參數、出題

**Files:**
- Create: `assets/core/review.js`、`assets/core/links.js`、`assets/core/quizgen.js`
- Test: `tests/unit/review.test.js`、`tests/unit/links.test.js`、`tests/unit/quizgen.test.js`

**Interfaces:**
- Produces:
  - `review.addMiss(queue: Object, qid: string, today: 'YYYY-MM-DD') -> Object`（queue 的格式是 `{[qid]: {last: date, streak: number}}`；把 streak 重設為 0，last 設為 today）
  - `review.due(queue, today) -> string[]`（回傳 `last < today` 的 qid）
  - `review.recordReview(queue, qid, firstTry: boolean, today) -> Object`（firstTry 時 streak 加 1，streak ≥2 就刪除這題；否則 streak 設為 0；兩種情況都把 last 設為 today）
  - `review.todayStr(date: Date) -> 'YYYY-MM-DD'`（以裝置的當地時間計算）
  - `links.parseHash(hash: string) -> {path: string[], params: {s?: string, auto?: boolean}}`
  - `links.buildTaskLink(base: string, {lesson, activity, student, auto}) -> string`
  - `quizgen.rng(seed: number) -> () => number`（mulberry32）
  - `quizgen.shuffle(arr, rng) -> Array`（回傳新陣列）
  - `quizgen.prepare(question, rng) -> question'`（打亂 options，並把 answer 改成新的索引）
  - `quizgen.pickN(pool, n, rng) -> Array`

- [ ] **Step 1: 寫失敗的測試**

```js
test('due only after a calendar day', () => {
  const q = addMiss({}, 'q5', '2026-10-21');
  assert.deepEqual(due(q, '2026-10-21'), []); assert.deepEqual(due(q, '2026-10-22'), ['q5']);
});
test('removed after 2 consecutive first-try in review', () => {
  let q = addMiss({}, 'q5', '2026-10-21');
  q = recordReview(q, 'q5', true, '2026-10-22'); assert.ok(q.q5);
  q = recordReview(q, 'q5', true, '2026-10-23'); assert.equal(q.q5, undefined);
});
test('wrong in review resets streak', () => {
  let q = recordReview(addMiss({}, 'q5', '2026-10-21'), 'q5', true, '2026-10-22');
  q = recordReview(q, 'q5', false, '2026-10-23'); assert.equal(q.q5.streak, 0);
});
test('parseHash', () => {
  assert.deepEqual(parseHash('#/L06/quiz?s=bear&auto=1'), {path: ['L06','quiz'], params: {s: 'bear', auto: true}});
  assert.deepEqual(parseHash(''), {path: [], params: {}});
});
test('buildTaskLink round-trips', () => {
  const url = buildTaskLink('https://x.github.io/h3a/', {lesson: 'L06', activity: 'map', student: 'bear', auto: false});
  assert.equal(url, 'https://x.github.io/h3a/#/L06/map?s=bear');
});
test('prepare keeps the correct option text', () => {
  const q = {options: [{text:'a'},{text:'b'},{text:'c'},{text:'d'}], answer: 2};
  const p = prepare(q, rng(7)); assert.equal(p.options[p.answer].text, 'c');
});
test('pickN unique and sized', () => {
  const out = pickN([1,2,3,4,5,6,7,8,9,10,11,12,13], 8, rng(1));
  assert.equal(new Set(out).size, 8);
});
```

- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作三個檔案**（日期可以直接用字串比較大小，因為 `YYYY-MM-DD` 格式的字串順序就是日期順序）
- [ ] **Step 4: 執行 `npm test`，預期 PASS**
- [ ] **Step 5: Commit** `feat: review schedule, task links, quiz generation`

### Task 3: 加密模組＋加密資料格式

**Files:**
- Create: `assets/core/cryptobox.js`、`data/crypto.js`（`window.H3A_SALT = '<16 bytes base64>'`，用 `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"` 產生）
- Create: `tools/encrypt_lesson.mjs`（`node tools/encrypt_lesson.mjs <in.plain.json> <out.enc.js> <LESSON_ID>`，從 stdin 讀密碼，給開發和測試用）
- Test: `tests/unit/cryptobox.test.js`

**Interfaces:**
- Produces（全部回傳 Promise）：
  - `cryptobox.deriveKey(password: string, saltB64: string) -> CryptoKey`（設為 extractable，用途是 encrypt 和 decrypt）
  - `cryptobox.encryptJson(obj, key) -> {v: 1, iv: b64, ct: b64}`
  - `cryptobox.decryptJson(box, key) -> obj`（失敗時丟出 `Error('BAD_KEY')`）
  - `cryptobox.exportKey(key) -> b64`、`cryptobox.importKey(b64) -> CryptoKey`
  - `cryptobox.toEncFile(lessonId, box) -> string`（內容是 `window.ENC = window.ENC || {};\nENC.L06 = {...};\n`）
  - 在 Node 用 `globalThis.crypto.subtle`，base64 用全域的 `btoa`／`atob`。

- [ ] **Step 1: 寫失敗的測試**

```js
test('round trip', async () => {
  const k = await deriveKey('pw-一二三', SALT); const box = await encryptJson({a: '鉛筆'}, k);
  assert.deepEqual(await decryptJson(box, k), {a: '鉛筆'});
});
test('wrong password -> BAD_KEY', async () => {
  const box = await encryptJson({a: 1}, await deriveKey('right', SALT));
  await assert.rejects(decryptJson(box, await deriveKey('wrong', SALT)), /BAD_KEY/);
});
test('exported key still decrypts', async () => {
  const k = await deriveKey('pw', SALT); const box = await encryptJson({a: 1}, k);
  assert.deepEqual(await decryptJson(box, await importKey(await exportKey(k))), {a: 1});
});
test('fresh iv each time', async () => {
  const k = await deriveKey('pw', SALT);
  assert.notEqual((await encryptJson({}, k)).iv, (await encryptJson({}, k)).iv);
});
```

- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作 cryptobox.js 和 encrypt_lesson.mjs**
- [ ] **Step 4: 執行 `npm test`，預期 PASS**
- [ ] **Step 5: Commit** `feat: lesson encryption`

### Task 4: 第 6 課原稿＋虛構的測試課＋圖片清單

**Files:**
- Create（不 commit）：`content/lesson06.plain.json`
- Create：`tests/fixtures/fake06.plain.json`（虛構的「小水杯大學問」，`id` 也設為 `"L06"`，結構相同，有 3 題提問、3 步地圖、1 題 testExtra），以及用測試密碼 `test-pass` 加密產生的 `tests/fixtures/fake06.enc.js`
- Create：`assets/core/lessonschema.js`（`validateLesson(obj) -> string[]`，回傳錯誤訊息清單）
- Create：`docs/image-list.md`
- Test：`tests/unit/lessonschema.test.js`

**Interfaces:**
- Produces（課文原稿的結構，之後所有頁面都會用到）：
```
{ id: "L06", title, author,
  paragraphs: [{ heading?: string, sentences: [{ id: "p1s1", text, say? }] }],
  vocab: [{ word, say?, meaning, img }],
  mapSteps: [{ id: "m1".."m7", text, say?, img, evidence }],      // 陣列順序就是正確順序
  quiz: [{ id: "q1".."q10", prompt, say?, options: [{ text, img, say? }] (4 個), answer: 0-3, evidence }],
  testExtra: [{ id: "t1".."t3", 同 quiz 的結構 }] }
```
  `img` 是 `images/L06/` 底下的檔名。

- [ ] **Step 1: 寫失敗的測試**：先寫 `validateLesson` 的測試：必要欄位、quiz 每題剛好 4 個選項、answer 在範圍內、id 不重複、每個 evidence 都不是空字串。測試對象是 fake06 fixture，以及（如果存在）`content/lesson06.plain.json`：檔案存在就驗證，不存在就跳過。
- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作 validateLesson**。依照規格 4.1～4.4，從 Google Drive 的課文檔（ID `1J3kWySiFqF5BSWGUl6bmLD_VQ_20MIb2`）和形音輕鬆學（ID `1X3_vQtS6Ar4r8oDR-iklPNI3f4TNVv2V`）整理出 lesson06.plain.json。每題寫 3 個合理的錯誤選項，evidence 要逐字取自課文。testExtra 的 3 題分別是：「放入筆芯之前，要先做什麼？」（木板做出凹槽）、「黏上另一片木板以後，接著要做什麼？」（切成筆桿）、「做鉛筆的第一步是什麼？」（石墨＋黏土）。破音字「削鉛筆」先不加 `say`，等老師回報再補。
- [ ] **Step 4: 寫 `docs/image-list.md`**：表格欄位是「檔名｜要畫什麼｜完整的 ChatGPT 提示詞」，每列都附上規格第 9 節的統一風格提示詞。檔名要涵蓋 vocab、mapSteps、quiz 選項、testExtra 選項用到的所有 `img`，重複使用的圖片只列一次。
- [ ] **Step 5: 執行 `npm test`，預期 PASS**
- [ ] **Step 6: 把 lesson06.plain.json 上傳到老師的 Google Drive**（交接資料夾 `1UP_uxhSZSjFaK67rgp85bWo6krNKvQyq`，用 `disableConversionToGoogleType`），重新讀取確認內容。
- [ ] **Step 7: Commit**（不含 content/）`feat: lesson schema, fixture lesson, image list`

### Task 5: 本機儲存、語音、後端呼叫

**Files:**
- Create: `assets/store.js`、`assets/tts.js`、`assets/api.js`、`config.js`（`window.H3A_CONFIG = { backendUrl: '' }`）
- Test: `tests/unit/store.test.js`、`tests/unit/tts.test.js`、`tests/unit/api.test.js`

**Interfaces:**
- Produces:
  - `H3A.store.make(storage) -> {get(key, fallback), set(key, val), remove(key)}`；瀏覽器端用 `H3A.store = make(window.localStorage)`，如果連 `localStorage` 都取不到，就改用記憶體物件。
  - `H3A.tts.pickVoice(voices: {lang, name}[]) -> voice|null`（優先順序照規格第 6 節）
  - `H3A.tts.make(synth, UtteranceCtor) -> {speak(text, say?) -> Promise<void>, stop(), hasChinese() -> boolean, unlock()}`；瀏覽器端用 `H3A.tts = make(speechSynthesis, SpeechSynthesisUtterance)`
  - `H3A.api.make({fetch, store, url}) -> {call(action, body) -> Promise<json>, submit(record) -> Promise<void>, flush() -> Promise<number>, pending() -> number}`；`submit` 會先把紀錄放進 `outbox`，再呼叫 `flush`；`flush` 每成功送出一筆，就把它從 outbox 移除。

- [ ] **Step 1: 寫失敗的測試**

```js
test('store survives throwing storage', () => {
  const bad = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() { throw new Error('x'); } };
  const s = make(bad); s.set('a', 1); assert.equal(s.get('a', 9), 9);
});
test('pickVoice prefers zh-TW', () => {
  assert.equal(pickVoice([{lang:'zh-CN',name:'a'},{lang:'zh-TW',name:'b'}]).name, 'b');
  assert.equal(pickVoice([{lang:'en-US',name:'a'}]), null);
});
test('speak cancels previous', async () => { /* 假的 synth 要記錄 cancel 的呼叫次數；連續 speak 兩次，cancel 至少要被呼叫 2 次 */ });
test('speak uses say over text', async () => { /* 假的 Utterance 收到的文字要是 say */ });
test('outbox keeps failed and flushes later', async () => {
  let ok = false; const api = make({ fetch: async () => { if (!ok) throw new Error('net'); return { json: async () => ({ ok: true }) }; }, store: memStore(), url: 'u' });
  await api.submit({ id: '1' }); assert.equal(api.pending(), 1);
  ok = true; assert.equal(await api.flush(), 1); assert.equal(api.pending(), 0);
});
test('call posts text/plain JSON with action', async () => { /* 檢查 headers['Content-Type']==='text/plain;charset=utf-8'，且 body 經過 JSON.parse 後 .action==='roster' */ });
```

- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作三個檔案**。tts 的 `speak` 開頭一定先呼叫 `synth.cancel()`；`unlock()` 會念一段空字串。`url` 是空字串時，`flush` 直接回傳 0，不呼叫 fetch。
- [ ] **Step 4: 執行 `npm test`，預期 PASS**
- [ ] **Step 5: Commit** `feat: storage, speech and backend client`

### Task 6: 網頁外殼：路由、首頁、課次頁、解鎖、學生身分

**Files:**
- Create: `index.html`（只放 `<div id="app">`、`<noscript>`，以及依序載入的 `<script>`：config、data/*、core/*、store、tts、api、ui/*、pages/*、router、app）
- Create: `assets/style.css`（色彩 token、大按鈕、2×2 和直式 1 欄的版面）
- Create: `assets/router.js`、`assets/app.js`、`assets/session.js`
- Create: `assets/pages/home.js`、`assets/pages/lesson.js`、`assets/pages/unlock.js`、`assets/pages/picker.js`
- Create: `data/lessons.js`（`window.H3A_LESSONS = [{id:'L01',title:'時間是什麼',open:false}, …, {id:'L06',title:'小鉛筆大學問',open:true}, …]`，12 課課名照課文檔）
- Create: `tools/bump_version.mjs`（把 index.html 裡所有 `?v=` 換成 `YYYYMMDDHHmm`）

**Interfaces:**
- Consumes: Task 2 `links.parseHash`、Task 3 `cryptobox`、Task 5 `store`、`tts`、`api`
- Produces:
  - `H3A.pages[name] = function render(root: HTMLElement, ctx)`，其中 `ctx = {lessonId, params, lesson /*已解密*/, student /*id 或 'class'*/, place, go(hash), settings}`
  - `H3A.router.start()`：每次換頁先呼叫 `tts.stop()`，再清空 root 並 render
  - `H3A.session.getLesson(id) -> Promise<lesson>`：先用 `h3a.key` 解密 `window.ENC[id]`；沒有金鑰或解密失敗（BAD_KEY）時，清除金鑰並導向 unlock 頁
  - `H3A.session.resolveStudent(params, roster, settings) -> {student, needPicker: boolean}`（純函式，放在 `assets/core/identity.js`，並在 `tests/unit/identity.test.js` 測試）

- [ ] **Step 1: 寫失敗的測試**（identity）：
  - `class` 模式下一律回傳 `'class'`
  - `s=bear` 而且名冊裡有 bear → 回傳 bear，並把 bear 記到 settings
  - `s=ghost` 但名冊裡沒有 → `needPicker: true`（unknown student id shows picker）
  - 名冊是空的而且沒有 s → `needPicker: true`
- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作 identity.js、外殼和 4 個頁面**。unlock 頁面要有：密碼欄位、「請輸入教室密碼」、「課文有著作權，密碼請勿外流」，錯誤時顯示「密碼不對，請問老師」。首頁上 `open:false` 的課顯示「即將推出」。lesson 頁列出 5 張活動卡，錯題複習卡只有在 `review.due` 有題目時才顯示，並標出題數。頁首有 🔊 提示條（`!tts.hasChinese()` 時顯示「這台裝置沒有中文語音」）和 ⚙️。
- [ ] **Step 4: 執行 `npm test`，預期 PASS**；用 `npx http-server -p 8080 -s` 開本機伺服器，搭配 fake06 fixture 打開頁面檢查，確認首頁和解鎖流程可以跑通。
- [ ] **Step 5: Commit** `feat: app shell, routing, unlock and identity`

### Task 7: 題目元件＋理解提問頁（錯題複習也共用）

**Files:**
- Create: `assets/ui/speaker.js`（`H3A.ui.speaker(text, say) -> HTMLButtonElement`，點了只會呼叫 tts.speak）
- Create: `assets/ui/question.js`、`assets/ui/result.js`、`assets/pages/quiz.js`

**Interfaces:**
- Consumes: Task 1 `hints`、`scoring`；Task 2 `quizgen`、`review`；Task 5 `api.submit`
- Produces:
  - `H3A.ui.runQuestions(root, ctx, {questions, mode: 'practice'|'test', activity, onDone(summary)})`，其中 `summary = {items: [{q, result, wrong: string[]}], firstTryRate, stars, score, durationSec}`
  - `H3A.ui.showResult(root, ctx, summary)`：顯示星星、「再玩一次」、「回到第 6 課」
  - `H3A.ui.buildRecord(ctx, activity, summary) -> record`（依照規格 7.2 的格式，id 用 `crypto.randomUUID` 產生；沒有這個函式時，改用時間戳加亂數）

- [ ] **Step 1: 實作**。practice 模式：點選項就作答；答錯時呼叫 `hints.pickWrong`，把選錯的選項變淡，先念「再想想看」，再念 `evidence`；答對時播放音效、念「答對了！」，並顯示「下一題 ▶」。test 模式：答錯時標出正確答案，直接顯示「下一題 ▶」。按下「下一題 ▶」之後立刻停用這個按鈕，作答鎖也要等到下一題 render 完才解除（double tap advances once）。`ctx.settings.auto` 或 `params.auto` 開啟時，每題 render 完就自動念題目。題目結束後：用 `review.addMiss` 把不是 `first` 的題目加入複習清單、更新最高星數、呼叫 `api.submit`。
- [ ] **Step 2: 在 quiz.js 裡**對 `lesson.quiz` 的每一題呼叫 `quizgen.prepare` 之後，交給 runQuestions（mode 是 practice）。
- [ ] **Step 3: 用瀏覽器開 fake06 檢查**：答錯第 1 次一個選項變淡；第 2 次只剩 2 個選項；第 3 次只剩 1 個；答對才出現「下一題 ▶」。e2e 測試放在 Task 13。
- [ ] **Step 4: Commit** `feat: question runner and comprehension quiz`

### Task 8: 課文地圖頁

**Files:**
- Create: `assets/pages/map.js`

**Interfaces:**
- Consumes: Task 1 `hints`（option 數 = 剩下的圖卡數；正確答案 = 下一個空格對應的步驟）、Task 7 `showResult`、`buildRecord`

- [ ] **Step 1: 實作**：上方有 7 個空格，下方是打亂後的圖卡，每張圖卡有圖、文字和 🔊。點圖卡就判斷能不能放進下一個空格：放對就固定在空格裡，換下一格，每一格都重新建立一個 HintState；放錯就讓圖卡抖一下彈回，套用提示規則，並念出這一步的 `evidence`。每一格的作答結果記成一個 item（`q` 是 `m1`～`m7`）。7 格都放對就顯示結果。
- [ ] **Step 2: 用瀏覽器開 fake06 檢查**（3 步）。
- [ ] **Step 3: Commit** `feat: story map ordering`

### Task 9: 聽課文頁

**Files:**
- Create: `assets/pages/read.js`、`assets/ui/vocabcard.js`

**Interfaces:**
- Consumes: Task 5 `tts.speak`（回傳 Promise）

- [ ] **Step 1: 實作**：依段落顯示課文，有小標題就顯示 heading。每一段旁邊都有 🔊。「▶ 從頭念」會依序 `await speak(sentence)`，念到哪一句就在那一句加上 `.reading`；換頁或按「⏸ 停止」時，用 token 取消後面還沒念的句子。課文裡出現 vocab 的詞時包成 `<button class="vocab">`，點了會念出語詞並打開小卡（圖片、meaning、🔊）。念完最後一句，或按「我讀完了」，就送出 activity `read`、`stars: 3`、`items: []` 的紀錄，再顯示結果。
- [ ] **Step 2: 用瀏覽器開 fake06 檢查**
- [ ] **Step 3: Commit** `feat: read-along page`

### Task 10: 單元測驗＋錯題複習頁

**Files:**
- Create: `assets/pages/test.js`、`assets/pages/review.js`

**Interfaces:**
- Consumes: Task 7 `runQuestions`；Task 2 `pickN`、`review.due`、`recordReview`

- [ ] **Step 1: test.js**：題庫是 `quiz` 加上 `testExtra`，用 `pickN` 抽出 `min(8, 題庫數量)` 題，每題 `prepare`，mode 是 `test`。完成後把 `score = testScore(答對數, 題數)` 存進 `h3a.progress.<student>.L06.tests`，只保留最近 3 次。
- [ ] **Step 2: review.js**：從 quiz、testExtra、mapSteps 中找出 `due` 回傳的題目。mapSteps 的題目會轉成選擇題：題目是「下一步是什麼？」，選項是 4 個步驟，正確答案是這一步。mode 是 practice。每題結束時呼叫 `recordReview(queue, qid, result==='first', today)`。
- [ ] **Step 3: 用瀏覽器檢查**：把 localStorage 的複習日期手動改成前一天，確認錯題複習卡片會出現。
- [ ] **Step 4: Commit** `feat: unit test and review pages`

### Task 11: Apps Script 後端

**Files:**
- Create: `backend/Code.gs`
- Test: `tests/unit/backend.test.js`（用 `require('../../backend/Code.gs')` 載入）

**Interfaces:**
- Produces（純函式，Node 可以測試）：
  - `validateRecord(rec) -> string|null`（回傳錯誤訊息；限制：student ≤20 字、activity 必須在 `['read','map','quiz','review','test']` 裡、items ≤50 筆、JSON 總長度 ≤20000）
  - `lockState(props: {fails, lockedUntil}, now: number) -> {locked: boolean}`
  - `registerFail(props, now) -> props`（第 5 次失敗時，`lockedUntil = now + 15*60*1000`，並把 fails 歸零）
  - `filterRecords(rows, {student, activity, since}) -> rows`
- Apps Script 端：`doPost(e)` 依 `action` 分派（submit、roster、login、records、saveRoster）。token 存在 `CacheService.getScriptCache()`，存活時間 7200 秒，每次使用都重新寫入以延長時間。失敗次數存在 `PropertiesService`。submit 寫入前要先在 records 的 id 欄位用 `TextFinder` 檢查有沒有重複，有重複就直接回傳 `{ok:true, dup:true}`。檔案最後加上 `if (typeof module !== 'undefined') module.exports = {...}`。

- [ ] **Step 1: 寫失敗的測試**：invalid activity 被拒絕；第 5 次失敗後被鎖住、鎖定期間 15 分鐘過後解鎖；filterRecords 依 since 篩選；`submit is idempotent by id`（傳入假的 sheet 物件，同一個 id 送兩次，只會有 1 列）。
- [ ] **Step 2: 執行 `npm test`，預期 FAIL**
- [ ] **Step 3: 實作 Code.gs**（只要 submit 的寫入邏輯是透過參數傳入 sheet 物件，就能用假的 sheet 測試）
- [ ] **Step 4: 執行 `npm test`，預期 PASS**
- [ ] **Step 5: Commit** `feat: apps script backend`

### Task 12: 老師設定、任務連結、老師後台、加密工具

**Files:**
- Create: `assets/ui/gear.js`（長按 2000 ms 後出現乘法題，兩個數字都在 2～9 之間）
- Create: `assets/pages/settings.js`、`assets/pages/teacher.js`、`assets/pages/encrypt.js`

**Interfaces:**
- Consumes: Task 2 `buildTaskLink`、Task 3 `cryptobox`、Task 5 `api.call`

- [ ] **Step 1: settings**：照規格 3.4。任務連結的 base 用 `location.origin + location.pathname`。複製用 `navigator.clipboard.writeText`，失敗時改成選取文字框裡的內容。「清除這台裝置的紀錄」要再確認一次。
- [ ] **Step 2: teacher**：登入畫面 → 呼叫 `login`，拿到的 token 只放在記憶體和 sessionStorage。登入後有篩選列（學生、活動、今天／本週／全部）、紀錄列表、看細節、最常錯的題目前 5 名、名冊管理。後端回傳 `{error:'AUTH'}` 時，回到登入畫面。`backendUrl` 是空的時，顯示「尚未設定後台」。
- [ ] **Step 3: encrypt**：選擇檔案（`<input type=file accept=".json">`）→ 用 `validateLesson` 檢查，有錯誤就列出來 → 密碼要輸入兩次而且一致 → 用 `H3A_SALT` 推導金鑰 → 用 `toEncFile` 產生檔案 → 用 Blob 下載成 `lesson06.enc.js`。
- [ ] **Step 4: 用瀏覽器檢查**：用 fake06 走過加密、上傳、解鎖一整輪。
- [ ] **Step 5: Commit** `feat: teacher settings, dashboard and encrypt tool`

### Task 13: 端對端測試

**Files:**
- Create: `tests/e2e/flows.test.js`、`tests/e2e/server.js`（用 Node 的 http 提供靜態檔，並且把 `data/lesson06.enc.js` 換成 fake06 fixture；另外有假的後端 `/fake-backend`，記錄收到的 POST）
- 安裝：`npm i -D playwright@1.47.2`，啟動時指定 `executablePath: '/opt/pw-browsers/chromium'`。測試時用 `addInitScript` 換掉 speechSynthesis，記錄念過的文字。

- [ ] **Step 1: 寫測試**：
  - `unlock with test-pass`：輸入錯誤密碼顯示「密碼不對，請問老師」；輸入 `test-pass` 後成功進入
  - `quiz hints and next`：答錯第 1 次，有選項變淡、念過的文字包含「再想想看」和 evidence；答錯第 3 次後只剩正確答案；答對才看得到「下一題 ▶」
  - `double tap advances once`：連續點「下一題」兩次，進度點只前進 1 格
  - `map ordering`：依正確順序點完就顯示結果
  - `record posted with student from link`：從 `#/L06/quiz?s=bear` 進入，完成後假的後端收到的紀錄 `student==='bear'`、`place==='home'`
  - `unknown student id shows picker`：`?s=ghost` 會顯示頭像選擇畫面
  - `class mode records class`
  - `review card appears next day`：修改 localStorage 的日期後，錯題複習卡片會出現
- [ ] **Step 2: 執行 `npm run e2e`，預期 PASS**（如果有失敗，回去修對應的 Task）
- [ ] **Step 3: Commit** `test: end-to-end flows`

### Task 14: 老師使用說明＋上線準備

**Files:**
- Create: `docs/teacher-guide.md`（繁體中文，給老師看）：
  - 申請 GitHub 帳號並連結到 Claude
  - 建立 Google 試算表、貼上 Code.gs、在「專案設定 → 指令碼屬性」新增 `TEACHER_PASSWORD`、部署成網頁應用程式（以我的身分執行、任何人都可以存取），再把網址交給 Claude
  - 用加密工具產生 lesson06.enc.js
  - 用 ChatGPT 產生圖片（見 image-list.md），檔名要跟清單一致
  - 產生任務連結、把電子白板設成全班模式
- Create: `README.md`（給開發者：結構、`npm test`、`npm run e2e`、絕對不能 commit 的東西）

- [ ] **Step 1: 撰寫兩份文件**
- [ ] **Step 2: 執行 `node tools/bump_version.mjs && npm test && npm run e2e`，預期全部 PASS**
- [ ] **Step 3: Commit** `docs: teacher guide and readme`
- [ ] **Step 4: 把 teacher-guide.md 和 image-list.md 上傳到老師的 Google Drive 交接資料夾，並重新讀取確認。**
