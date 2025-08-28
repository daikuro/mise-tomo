# 店舗管理画面 CLAUDE.md

## プロジェクトの責務
- 店舗オーナーが求人を管理するための管理画面
- 求人の作成・編集・削除
- 応募者の管理
- 店舗情報の管理

## 依存関係
- `@misetomo/shared`: 共通の型定義、ユーティリティ、Firebase設定

## デプロイ手順
```bash
# Firebase App Hostingへのデプロイ
firebase apphosting:backends:deploy misetomo-admin-backend
```

## ビジネスルール
- 店舗オーナーのみアクセス可能（Firebase Authのrole: 'store-owner'）
- 自店舗の求人のみ管理可能
- 応募者の個人情報を適切に管理

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run check
```