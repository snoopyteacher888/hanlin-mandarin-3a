# 國語三上學習樂園（翰林版）

資源班國語輔助教材。第一版：第 6 課〈小鉛筆大學問〉閱讀理解（聽課文、課文地圖、理解提問、錯題複習、單元測驗），附老師設定、老師後台（Google Apps Script）與課文加密。

- 規格：`docs/superpowers/specs/2026-10-21-hanlin3a-reading-design.md`
- 老師使用說明：`docs/teacher-guide.md`
- 圖片清單：`docs/image-list.md`

## 結構
- `index.html`：依序載入所有 `<script>`（沒有打包工具）
- `assets/core/`：純邏輯，UMD，可在 Node 測試
- `assets/ui/`、`assets/pages/`：畫面
- `data/`：課次清單、全站鹽值、加密的課次資料（`lessonXX.enc.js`，由老師用加密工具產生）
- `backend/Code.gs`：老師貼到 Google Apps Script 的後端
- `tests/unit/`、`tests/e2e/`：測試；`tests/fixtures/fake06.*` 是**虛構**的測試課次（密碼 `test-pass`）

## 指令
```
npm test                       # 單元測試
npm run e2e                    # 端對端測試（Chromium）
node tools/bump_version.mjs    # 更新 ?v= 版本號，修改 assets/ 或 data/ 後、上線前執行
node tools/encrypt_lesson.mjs in.plain.json out.enc.js L06   # 開發用加密，密碼從 stdin 讀
```

## 絕對不能 commit
- 課文明文（`*.plain.json`，已在 .gitignore；`tests/fixtures/` 的虛構課次除外）
- 教室密碼、老師後台密碼
- 學生真實姓名
