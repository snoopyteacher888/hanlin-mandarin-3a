# 第 6 課字詞練習 A 批 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增生字、語詞、形近字、聽聽看四個活動（不加密、不需教室密碼），錯題可複習，紀錄送後台。

**Architecture:** 公開資料檔 `data/lesson06.words.js`（`window.H3A_WORDS.L06`）。純邏輯 `assets/core/wordq.js` 把四種資料轉成 `runQuestions` 能吃的題目；`wordsschema.js` 驗證資料。`ui/question.js` 擴充題目欄位（提示圖、大字選項、隱藏題目文字、自訂提示）。路由對字詞活動不要求解鎖。

**Tech Stack:** 同主計畫（純 JS、node:test、Playwright）。

**Spec:** `docs/superpowers/specs/2026-10-22-lesson06-wordwork-a-design.md`

## Global Constraints
- 字詞資料只能放 Claude 自己寫的句子與解釋，不放課本原文。
- 生字、形近字選項是大字、不配圖；語詞選項是文字；聽聽看選項是圖片＋文字。
- activity 名稱：`hanzi`、`vocab`、`similar`、`listen`。
- 題目 id 唯一：`h-<字>`、`v-<語詞>`、`s<n>`、`l<n>`。
- 筆順網址：`https://stroke-order.learningweb.moe.edu.tw/characterQueryResult.do?word=` + encodeURIComponent(字)。

## Review Focus
1. 沒有解鎖就進字詞練習：不能跳出密碼頁或空白頁。→ e2e `word practice works without unlock`。
2. 錯題複習同時有閱讀題與字詞題、但裝置沒解鎖：只出字詞題，不能卡住。→ e2e `review without unlock shows word items only`。
3. 舊版後台（只認 5 種活動）收到 hanzi 紀錄會回 BAD_RECORD：outbox 不能無限重送卡住後面紀錄。→ 單元 `server rejection of one record does not block others`。
4. 聽聽看的題目文字預設隱藏，但答錯提示要能念句子。→ e2e `listen hides text and repeats on wrong`。
5. 同一個字同時在選項和題目挖空處：大字選項不得重複。→ wordsschema 單元 `options unique`。

---

### Task 1: 後台接受任何活動名稱＋outbox 不被壞紀錄卡住
- Modify: `backend/Code.gs`（`validateRecord` 改用 `/^[a-z]{2,12}$/`），`assets/api.js`（伺服器回 `BAD_RECORD` 的紀錄移出 outbox 放到 `h3a.rejected`，不阻擋後面）。
- Tests: `backend.test.js` 新增 `any lowercase activity accepted`、`activity with symbols rejected`；`api.test.js` 新增 `server rejection of one record does not block others`。
- [ ] 寫測試 → 跑（FAIL）→ 實作 → 跑（PASS）→ commit。

### Task 2: wordsschema＋wordq
- Create: `assets/core/wordsschema.js`：`validateWords(w) -> string[]`。
- Create: `assets/core/wordq.js`：
  - `hanziQuestion(item) -> question`（`prompt: item.cloze`, `img`, `autoSay: item.say`, `options: item.options.map(c => ({text:c, big:true}))`, `answer`, `hint: '仔細看，' + item.hint`）
  - `vocabQuestion(item, kind:'pic'|'meaning') -> question`
  - `similarQuestion(item) -> question`
  - `listenQuestion(item) -> question`（`hideText: true`, `autoSay: item.text`, `hint: item.text`）
  - `findWordQuestion(words, id, rng) -> question|null`（錯題複習用；v- 題隨機選題型）
- Tests: `wordsschema.test.js`（answer 在選項裡、options unique、id 唯一）、`wordq.test.js`（每種轉換的 answer 指向正確選項、hanzi 選項 big、listen hideText、findWordQuestion 找得到四種前綴）。
- [ ] 寫測試 → FAIL → 實作 → PASS → commit。

### Task 3: 字詞資料
- Create: `data/lesson06.words.js`（14 生字、12 語詞、11 形近字、8 聽聽看）；`tests/unit/words-data.test.js` 驗證真資料通過 `validateWords`、題數正確、所有 img 檔案存在。
- Claude 自我檢查注音／部首／筆畫、台灣用語。
- [ ] 寫測試 → FAIL → 寫資料 → PASS → commit。

### Task 4: 題目元件擴充
- Modify: `assets/ui/question.js`：支援 `q.img`（題目提示圖）、`option.big`（大字、不配圖）、`q.hideText`（題目文字預設隱藏＋「看文字」按鈕）、`q.autoSay`（進題自動念，不受 auto 設定影響）、`q.hint`（答錯念並顯示 hint，取代「課文說」）。
- 樣式：`.option.big`（字 3em 以上）、`.prompt-img`。
- [ ] e2e 在 Task 6 覆蓋；此處以瀏覽器截圖確認 → commit。

### Task 5: 頁面與路由
- Create: `assets/pages/hanzi.js`、`vocab.js`、`similar.js`、`listen.js`、`assets/ui/wordcards.js`（生字卡、語詞卡格狀與放大）。
- Modify: `router.js`（ACTIVITIES 加四項；字詞活動與 review 在 NEED_KEY 時以 `lesson=null` 繼續）、`lesson.js`（分區選單；未解鎖時閱讀卡仍可點、點了才要密碼）、`review.js`（同時找閱讀題與字詞題；lesson 為 null 時只出字詞題）、`home.js`（activityTitle 加四項）、`index.html`。
- [ ] 瀏覽器截圖確認（白板＋手機）→ commit。

### Task 6: 端對端測試
- Modify: `tests/e2e/flows.test.js`：`word practice works without unlock`、`hanzi card shows zhuyin and radical`、`listen hides text and repeats on wrong`、`similar wrong shows hint`、`review without unlock shows word items only`、`word record posted with activity hanzi`。
- [ ] 跑 `npm run e2e` → PASS → commit → push。

### Task 7: 老師步驟＋交付
- 寫 Apps Script 更新步驟給老師；更新 `docs/teacher-guide.md`。
- 自我檢查發音／用語；截圖給老師。
