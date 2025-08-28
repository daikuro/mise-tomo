# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要なドキュメント
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - プロジェクト全体のアーキテクチャ設計（モノレポ構成、マイクロサービス戦略、Firebase App Hosting設定など）

# プロジェクト設定
- SvelteKitを使ってWebサービスを構築する
- 新規プロジェクトのため、SvelteKitの初期セットアップから始める

# デザインシステム
- 画面のデザインを作成する際は、Atlassian Design System (https://atlassian.design/components) を参考にして実装する
- コンポーネントの設計はAtlassianのパターンに準拠する

# プロジェクト初期化手順

## SvelteKitプロジェクトのセットアップ
プロジェクトを初期化する場合:
```bash
npm create svelte@latest .
npm install
npm run dev
```

## 推奨される技術スタック
- **フレームワーク**: SvelteKit
- **スタイリング**: TailwindCSS または CSS-in-JS（Atlassian Design Systemに準拠）
- **型チェック**: TypeScript
- **認証**: Firebase Auth（グローバルCLAUDE.mdの設定に準拠）
- **データベース**: Firestore（グローバルCLAUDE.mdの設定に準拠）

## 開発コマンド（プロジェクトセットアップ後）
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run check

# リント
npm run lint

# フォーマット
npm run format
```

## プロジェクト構造
⚠️ **注意**: このプロジェクトはモノレポ構成への移行を予定しています。
詳細は[ARCHITECTURE.md](./ARCHITECTURE.md)を参照してください。

### 現在の構造（移行前）
```
misetomo/
├── src/
│   ├── routes/          # SvelteKitのページとAPI
│   ├── lib/            # 共有コンポーネントとユーティリティ
│   │   ├── components/ # UIコンポーネント
│   │   ├── stores/     # Svelteストア
│   │   ├── utils/      # ヘルパー関数
│   │   └── firebase/   # Firebase設定
│   ├── app.html        # HTMLテンプレート
│   └── app.css         # グローバルスタイル
├── static/             # 静的ファイル
├── tests/              # テストファイル
└── package.json        # 依存関係とスクリプト
```

### 移行後の構造
[ARCHITECTURE.md](./ARCHITECTURE.md#ディレクトリ構造)を参照

## Firebase統合
- Firebase設定はグローバルCLAUDE.mdの指示に従う
- 認証にはFirebase AuthのsignInWithPopupを使用
- Firestoreのセキュリティルールは機能実装時に都度提案
- パフォーマンスを考慮し、読み取り・書き込み回数を最小限に抑える

## 開発ガイドライン
- Atlassian Design Systemのコンポーネントパターンに従う
- TypeScriptを使用して型安全性を確保
- 認証が必要な画面では、グローバルCLAUDE.mdの認証パターンに従う
- IDE診断機能（mcp__ide__getDiagnostics）を活用してエラーを早期に発見
- 重要 **このプロジェクトはTailwind CSS v4を使用しています。v3とは大きく異なります。**
- コードを変更したら、./check-errors.sh を実行して
