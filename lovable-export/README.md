# 學習無界 - 線上學習平台

這是一個適用於 Lovable 平台的中文線上學習平台專案。

## 功能特色

- 🎓 課程展示與瀏覽
- 👤 用戶註冊與登入
- 🛒 購物車功能
- 📱 響應式設計
- 🎨 現代化 UI 設計

## 技術棧

- **前端框架**: React 18 + TypeScript
- **路由**: React Router 6
- **樣式**: TailwindCSS 3
- **UI 組件**: Radix UI
- **圖標**: Lucide React
- **狀態管理**: React Context
- **建構工具**: Vite

## 開始使用

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 `http://localhost:5173`

## 專案結構

```
src/
├── components/        # UI 組件
│   ├── ui/           # 基礎 UI 組件
│   └── Layout.tsx    # 佈局組件
├── contexts/         # React Context
├── lib/             # 工具函數
├── pages/           # 頁面組件
├── App.tsx          # 主應用程式
└── main.tsx         # 入口文件
```

## 部署到 Lovable

1. 將此專案上傳到 Lovable 平台
2. Lovable 會自動偵測 Vite 專案並進行建構
3. 專案將自動部署到線上環境

## 主要頁面

- `/` - 首頁（課程展示）
- `/courses` - 課程列表
- `/community` - 學習社群
- `/login` - 登入頁面
- `/register` - 註冊頁面
- `/profile` - 個人資料
- `/settings` - 設定頁面

## 開發說明

此專案是從原始的全端應用程式中提取前端部分，並針對 Lovable 平台進行了優化：

- 移除了伺服器端相關程式碼
- 簡化了狀態管理
- 保留了核心的 UI 和用戶體驗
- 使用模擬資料進行展示

## 授權

此專案僅供學習和展示使用。
