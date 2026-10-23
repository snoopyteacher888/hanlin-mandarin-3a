# 第 6 課字詞練習 B 批＋說說看 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增短語短句、句型、修辭三個活動，加上「🎤 說說看」語音作答、老師後台批改、學生看批改結果。

**Architecture:** 資料擴充公開檔 `data/lesson06.words.js`。純邏輯 `core/speechcheck.js` 做句型檢查；`core/wordq.js` 加題目轉換；`ui/question.js` 遇到 `q.type === 'speak'` 交給新的 `ui/speak.js`，所以選擇題和說說看可以排在同一串。說說看的句子走另一個 outbox（`speechbox`，動作 `speech`）。後台 `Code.gs` 加 `speech` 分頁與 4 個動作。

**Tech Stack:** 純 HTML/CSS/ES2017、node:test、Playwright 1.47.2（Chromium `/opt/pw-browsers/chromium`，`headless:false, args:['--headless=new']`）。

**Spec:** `docs/superpowers/specs/2026-10-22-lesson06-wordwork-b-design.md`

## Global Constraints
- 題目句子全部 Claude 自己寫，不放課本或大補帖原文；課文例子只引用幾個字（例如「筆芯三明治」）。
- activity 名稱：`phrase`、`pattern`、`rhetoric`；學生看批改頁的路由 activity 為 `feedback`。全部加進 router 的 `ACTIVITIES` 與 `NO_KEY`。
- 題目 id 前綴：`ph`、`ps`、`pw`、`pm`、`pt-`（句型，例如 `pt-zy-m1`、`pt-rg-h1`）、`rh`。
- 語音辨識：`root.SpeechRecognition || root.webkitSpeechRecognition`，`lang='zh-TW'`、`interimResults=false`、`maxAlternatives=1`。
- speech 分頁欄位：`id, ts, student, place, lesson, activity, qid, prompt, said, status, teacherNote, gradedAt`；status ∈ `auto|pending|ok|redo`；`said` ≤ 200 字。
- 提示不可直接說出答案（沿用 A 批 wordsschema 的洩漏檢查精神：clue 不可含正確答案字串）。
- 新加的文字都要過：zhuyin 破音字規則、三聲＋三聲 `SAY_FIX`、台灣用語。
- 每次改前端檔案後跑 `node tools/bump_version.mjs`。

## Review Focus
1. 語音辨識回傳帶標點、空白或全形逗號（「只要我練習，就會進步。」）：檢查要先去掉標點再判斷。→ Task 1 `normalizes punctuation`。
2. 「只有……就……」等辨識誤字：「只有」不能當成「只要」通過。→ Task 1 `只有 is not 只要`。
3. 麥克風權限被拒（`not-allowed`）或 `network` 錯誤：要改成打字框，不能卡在「我在聽……」。→ Task 4 e2e `speak falls back to typing on error`。
4. 句子送出時沒網路：要留在 speechbox，上線後送出，且不擋住 outbox 的作答紀錄。→ Task 3 `speech queue independent of record outbox`。
5. 學生用別人的代號查 feedback：只能拿到那個代號的資料，且回傳不含名字。→ Task 2 `feedback returns only that student without names`。

---

### Task 1: speechcheck（句型檢查）

**Files:**
- Create: `assets/core/speechcheck.js`（UMD，`H3A.speechcheck`）
- Test: `tests/unit/speechcheck.test.js`

**Interfaces:**
- Produces: `normalize(s: string) -> string`（去掉空白與中英標點）；`check(rule, said) -> { status: 'correct'|'pending'|'bad', reason: string|null }`。
  - `rule = { kind: 'phrase', accept: string[] }`：normalize 後在 accept 裡 → correct；符合 `/^.{2,}的.+$/` → pending；否則 bad `'phrase'`。
  - `rule = { kind: 'word', word: string, min: 6 }`：含 word 且長度 ≥ min → pending；沒有 word → bad `'word'`；太短 → bad `'short'`。
  - `rule = { kind: 'pattern', key: 'zhiyao'|'ruguo', front?: string }`：front 有給就先接在 said 前面再檢查。zhiyao 依序找「只要」「就」；ruguo 依序找「如果」「不但」「還」；每段至少 2 字、最後一段至少 2 字。缺詞 → bad `'missing:<詞>'`；順序錯 → bad `'order'`；段太短 → bad `'short'`；都過 → pending。

- [ ] **Step 1: 寫測試**：`normalizes punctuation`（`normalize('只要我練習，就會進步。') === '只要我練習就會進步'`）、`phrase accept is correct`、`other ABB phrase is pending`（`圓滾滾的蘋果`）、`word missing is bad`、`word short is bad`（`混合了`）、`zhiyao ok is pending`、`zhiyao missing 就`（reason `missing:就`）、`只有 is not 只要`（`只有我練習就會進步` → `missing:只要`）、`zhiyao order`（`就會進步只要我練習` → `order`）、`zhiyao short`（`只要練就好` → `short`）、`front is joined`（front `只要我每天練習，`＋said `就會越來越厲害` → pending）、`ruguo full ok`、`ruguo missing 還`。
- [ ] **Step 2:** `node --test tests/unit/speechcheck.test.js` → FAIL（module not found）
- [ ] **Step 3:** 實作。
- [ ] **Step 4:** 同指令 → PASS。
- [ ] **Step 5:** commit `feat: speechcheck for spoken sentence patterns`

### Task 2: 後台 speech 分頁與動作

**Files:**
- Modify: `backend/Code.gs`
- Modify: `tests/e2e/server.js`（假後台加 `speech`／`speechList`／`grade`／`feedback`，記憶體陣列）
- Test: `tests/unit/backend.test.js`

**Interfaces:**
- Produces（純邏輯，可在 Node 測試）：`SPEECH_COLUMNS`；`validateSpeech(r) -> string|null`（同 validateRecord 規則＋`qid` 1～20 字、`prompt` ≤ 200、`said` 1～200、`status` 只能是 `auto|pending`）；`speechToRow(r)`／`speechFromRow(row)`；`filterSpeech(rows, {student?, status?})`；`applyGrade(row, {grade:'ok'|'redo', note}, nowIso) -> row`（note ≤ 100 字）；`feedbackFor(rows, student) -> [{id, qid, prompt, said, status, teacherNote, gradedAt}]`（只回傳該學生、status 為 ok/redo）。
- doPost 動作：`speech`（不需 token，id 重複忽略，回 `{ok:true}`；不合格回 `{error:'BAD_RECORD'}`）、`speechList`（token）、`grade`（token；`{id, grade, note}`）、`feedback`（`{student}`）。

- [ ] **Step 1: 寫測試**：`speech record validated`（said 空字串、status `ok` 都 reject）、`grade sets status note and time`、`grade rejects unknown grade`、`feedback returns only that student without names`（rows 有 bear、cat；結果只有 bear，且物件沒有 `student`／`name` 鍵；pending 不回傳）。
- [ ] **Step 2:** `npm test` → FAIL
- [ ] **Step 3:** 實作純邏輯＋ doPost 分支（speech 分頁用現有 `sheetNamed('speech', SPEECH_COLUMNS)`；grade 依 id 找列後 `setValues`）；假後台同步加四個動作。
- [ ] **Step 4:** `npm test` → PASS
- [ ] **Step 5:** commit `feat(backend): speech answers, grading and student feedback`

### Task 3: api 的 speechbox

**Files:**
- Modify: `assets/api.js`
- Test: `tests/unit/api.test.js`

**Interfaces:**
- Produces：`api.submitSpeech(row) -> Promise<void>`（放進 store `speechbox` 後 flush）；`flush()` 同時清 outbox（`submit`）和 speechbox（`speech`），兩者各自處理 BAD_RECORD → `rejected`。

- [ ] **Step 1: 寫測試**：`speech queue independent of record outbox`（submit 一筆紀錄的回應失敗、speech 成功 → speechbox 清空、outbox 留著）、`speech bad record moved to rejected`。
- [ ] **Step 2:** `npm test` → FAIL
- [ ] **Step 3:** 實作：把現在的 `flushOnce` 改成 `drain(key, action, field)`，`field` 為 `'record'` 或 `'speech'`。
- [ ] **Step 4:** `npm test` → PASS
- [ ] **Step 5:** commit `feat(api): queue spoken sentences separately`

### Task 4: 說說看 UI

**Files:**
- Create: `assets/ui/speak.js`
- Modify: `assets/ui/question.js`（`q.type === 'speak'` 時呼叫 `H3A.ui.speakQuestion`，結果照一般題目放進 items）、`assets/core/scoring.js`（`firstTryRate` 跳過 `'pending'`）、`assets/style.css`（`.mic-btn` 大圓按鈕、`.listening` 動畫、`.said-box`）、`index.html`
- Test: `tests/unit/scoring.test.js`、`tests/e2e/flows.test.js`（Task 7 一起跑）

**Interfaces:**
- Consumes：`H3A.speechcheck.check`（Task 1）、`H3A.api.submitSpeech`（Task 3）、`H3A.ui.showHint/showTeach`、`H3A.hints`。
- Produces：`H3A.ui.speakQuestion(box, ctx, q, done)`；`q = { type:'speak', id, prompt, say, img?, front?, rule, hints:{h1,h2,teach}, model }`；`done(result, extra)`，`result ∈ 'first'|'hint1'|'hint2'|'taught'|'pending'`，`extra = { said, status }`。
  - correct → 依提示次數得 first/hint1/hint2/taught；pending → result `'pending'`；兩者都 `submitSpeech({…, status: correct ? 'auto' : 'pending'})`。
  - bad：第 1、2 次 showHint(h1/h2)；第 3 次 showTeach(teach)，念 model，之後只要不是 bad 就送出。
  - 辨識 `onerror` 為 `not-allowed`／`service-not-allowed`／`network`，或沒有辨識 API → 顯示 `<textarea>`＋「請大人幫忙打字」＋「✅ 送出」。`no-speech` → 「我沒聽到，請再按 🎤 說一次」。
  - 辨識出的文字放 `.said-box`，自動 `H3A.tts.speak`；按鈕「✅ 送出」「🔁 重說」。
- `scoring.firstTryRate(['first','pending','hint1'])` === 0.5。

- [ ] **Step 1:** scoring 單元測試 `pending excluded from first try rate`（全 pending → 0）→ FAIL → 實作 → PASS。
- [ ] **Step 2:** 實作 speak.js 與 question.js 分支。
- [ ] **Step 3:** 瀏覽器截圖確認白板（1280×800）版面：麥克風、聽中、辨識結果、打字備案四個狀態。
- [ ] **Step 4:** commit `feat(ui): speak-to-answer questions`

### Task 5: 題目轉換與資料格式

**Files:**
- Modify: `assets/core/wordq.js`、`assets/core/wordsschema.js`
- Test: `tests/unit/wordq.test.js`、`tests/unit/wordsschema.test.js`

**Interfaces:**
- Produces（`H3A.wordq`）：
  - `phrasePickQuestion(item, r)`：`prompt = '＿＿＿的' + item.noun`，`img`，選項為疊字大字。
  - `chooseQuestion(item, r)`：題目「哪一句的『混合』用得對？」，2 個句子選項。
  - `matchQuestion(item, r)`：題目 `item.front + '……'`，選後半句。
  - `conjQuestion(item, r)`：題目 `item.sentence`，選關聯詞組。
  - `rhetoricQuestion(item, cards, r)`：`autoSay = item.sentence`，4 個選項 `{text: card.name, icon: card.icon}`。
  - `speakQuestion(item, rule) -> q`（type `'speak'`；把 item 的 clue/model 轉成 hints h1/h2/teach）。
  - 每個都回傳 `hints:{h1,h2,teach}`：h1＝方法、h2＝`item.clue`、teach＝`item.explain`（或 model）。
  - `findWordQuestion` 認得 `ph`、`pw`、`pt-…-m`、`pt-…-c`、`rh` 前綴（說說看不進錯題複習）。
- `validateWords` 加檢查：spec 第 7 節的格式；`answer`／第一個選項在選項裡；選項不重複；id 全部唯一；clue 不可含正確答案；說說看題目要有 `clue`、`model`，且 `model` 本身要通過 `speechcheck`（不是 bad）。

- [ ] **Step 1: 寫測試**：每種轉換的 answer 指向正確選項；`rhetoric options carry icons`；`speak question has rule and hints`；`findWordQuestion finds rh and pt match`；`findWordQuestion skips speak ids`；schema `model must pass speechcheck`、`clue must not reveal answer`。
- [ ] **Step 2:** `npm test` → FAIL
- [ ] **Step 3:** 實作。
- [ ] **Step 4:** `npm test` → PASS
- [ ] **Step 5:** commit `feat(core): question builders for phrase, pattern and rhetoric`

### Task 6: 內容資料＋圖片清單

**Files:**
- Modify: `data/lesson06.words.js`（`phrase`、`pattern`、`rhetoric`）
- Modify: `tests/unit/words-data.test.js`（題數：pick 8、say 2、choose 4、make 2；每個 pattern match 3、conj 3、half 2、whole 1；rhetoric cards 4、quiz 8 且每種 2 題；所有 img 檔案存在，新圖先放佔位清單）
- Modify: `docs/image-list.md`、`docs/chatgpt-image-prompts.txt`（新圖：紅通通的蘋果、黑漆漆的山洞、綠油油的草地、灰濛濛的天空等疊字 8 張、混合、斷裂、只要就、如果不但還，每張一個指令、不可四格）

- [ ] **Step 1:** 寫資料測試 → FAIL。
- [ ] **Step 2:** 寫資料；圖片還沒上傳前 `words-data` 的 img 存在檢查改讀 `docs/image-list.md` 的「待生成」清單作為例外。
- [ ] **Step 3:** 自我檢查：用 `$SP/tone3.js` 找新句子的三聲連讀並補 `SAY_FIX`；用 phonic_table 找破音字並補 `zhuyin.js` RULES；台灣用語。
- [ ] **Step 4:** `npm test` → PASS
- [ ] **Step 5:** commit `content: lesson 6 phrase, pattern and rhetoric items`

### Task 7: 活動頁、路由、選單、批改頁、老師後台

**Files:**
- Create: `assets/pages/phrase.js`、`assets/pages/pattern.js`、`assets/pages/rhetoric.js`、`assets/pages/feedback.js`
- Modify: `assets/router.js`（ACTIVITIES、NO_KEY 加 `phrase`,`pattern`,`rhetoric`,`feedback`）、`assets/pages/lesson.js`（三張卡＋批改徽章：呼叫 `feedback`，比對 store `seenFeedback` 算未看數）、`assets/pages/home.js`（NAMES）、`assets/pages/teacher.js`（「📝 待批改」分頁：`speechList`、按鈕呼叫 `grade`；下方「已批改」區列出 ok/redo，可再改）、`index.html`
- Test: `tests/e2e/flows.test.js`（假的 `SpeechRecognition`：addInitScript 設定 `window.__sayNext`，`start()` 後 10ms 觸發 `onresult` 帶 `__sayNext`；`__sayError` 有值時觸發 `onerror`）

**Interfaces:**
- Consumes：Task 4 `speakQuestion` 流程、Task 5 轉換函式、Task 2 假後台。
- 頁面流程：
  - phrase：intro 卡（拆解短語）→ pick 8 → say 2 → 語詞卡 → choose 4 → make 2，一次 runQuestions 跑完（intro 用現有 `intro()` 樣式）。
  - pattern：先選句型兩張大卡 → 認識卡（2 例句、關聯詞上色）→ match 3 → conj 3 → half 2 → whole 1。
  - rhetoric：4 張認識卡 → quiz 8。
  - feedback：列出 `feedback` 結果；✅ 顯示 ⭐⭐⭐；🔁 有「再說一次」按鈕，進 `#/L06/pattern?retry=<qid>` 或 `#/L06/phrase?retry=<qid>` 只跑那一題說說看；進頁自動念第一則老師的話；看過的 id 存 `seenFeedback`。
- [ ] **Step 1: 寫 e2e**：`phrase speak exact answer is correct`、`speak bad pattern shows hint then pending`、`speak falls back to typing on error`（`__sayError='not-allowed'` → 出現 textarea）、`pattern five steps finish`、`rhetoric wrong shows hint`、`teacher grades and student sees feedback`（送一句 → 老師登入 teacher-pass → 待批改 → 合理＋老師的話 → 學生課次頁出現「老師批改了 1 題」→ 點進去聽到老師的話）、`phrase record posted with activity phrase`。
- [ ] **Step 2:** `npm run e2e` → 新測試 FAIL。
- [ ] **Step 3:** 實作頁面與路由。
- [ ] **Step 4:** `npm test && npm run e2e` → 全部 PASS。
- [ ] **Step 5:** `node tools/bump_version.mjs`；截圖（白板＋手機）給老師；commit `feat: lesson 6 phrase, pattern, rhetoric activities with teacher grading`；push。

### Task 8: 交付

- [ ] 更新 `docs/teacher-guide.md`：說說看怎麼用、麥克風「允許」、後台批改、Apps Script 更新步驟。
- [ ] ChatGPT 圖片指令上傳到 Drive 交接資料夾（`1UP_uxhSZSjFaK67rgp85bWo6krNKvQyq`），再讀回確認。
- [ ] 用中文告訴老師：要更新 Apps Script、要生哪些圖、要聽哪些句子的發音。
