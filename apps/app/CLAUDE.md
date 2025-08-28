# 求職者向けアプリケーション CLAUDE.md

## プロジェクトの責務
- 求職者が求人を検索・閲覧・応募できるWebアプリケーション
- スキマ時間のお仕事を見つけるためのプラットフォーム

## 依存関係
- `@misetomo/shared`: 共通の型定義、ユーティリティ、Firebase設定

## デプロイ手順
```bash
# Firebase App Hostingへのデプロイ
firebase apphosting:backends:deploy misetomo-app-backend
```

## ビジネスルール
- 求人情報は誰でも閲覧可能
- 応募にはユーザー登録が必要
- ユーザーは自分の応募履歴を確認可能

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run check
```