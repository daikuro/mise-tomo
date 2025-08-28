# アーキテクチャ設計書

## プロジェクト構成戦略

### マイクロサービスアーキテクチャの採用

本プロジェクトでは、求職者向けサービスと店舗管理画面を独立したアプリケーションとして開発・デプロイすることで、真のマイクロサービスアーキテクチャを実現します。

## ディレクトリ構造

```
misetomo/                    # モノレポルート
├── apps/
│   ├── app/                # 求職者向けアプリ
│   │   ├── src/
│   │   ├── package.json
│   │   ├── apphosting.yaml
│   │   └── CLAUDE.md       # アプリ固有の指示
│   └── admin/              # 店舗管理画面
│       ├── src/
│       ├── package.json
│       ├── apphosting.yaml
│       └── CLAUDE.md       # 管理画面固有の指示
├── packages/
│   └── shared/             # 共通コード
│       ├── src/
│       │   ├── types/      # 共通型定義
│       │   ├── utils/      # 共通ユーティリティ
│       │   └── firebase/   # Firebase設定
│       └── package.json
├── firebase.json           # Firebase設定
├── CLAUDE.md              # プロジェクト全体の指示
└── ARCHITECTURE.md        # このファイル
```

## Git管理戦略

### モノレポアプローチ
- **単一リポジトリ**で全アプリケーションを管理
- **コード共有**が容易
- **原子的コミット**で関連変更をまとめて管理
- **統一的なCI/CD**パイプライン

### ブランチ戦略
```
main           # 本番環境
├── develop    # 開発環境
├── feature/*  # 機能開発
└── hotfix/*   # 緊急修正
```

## Firebase App Hosting戦略

### 複数バックエンドの設定

Firebase App Hostingの2024年7月アップデートにより、モノレポから複数アプリのデプロイが可能になりました。

#### バックエンド作成
```bash
# 求職者向けアプリのバックエンド作成
firebase apphosting:backends:create --project [project-name]
# Root directory: apps/app

# 管理画面のバックエンド作成
firebase apphosting:backends:create --project [project-name]
# Root directory: apps/admin
```

#### デプロイ設定
- `misetomo-app-backend`: 求職者向け（apps/app）
- `misetomo-admin-backend`: 管理画面（apps/admin）

### apphosting.yaml設定

```yaml
# apps/app/apphosting.yaml
env:
  - variable: APP_TYPE
    value: "customer"
runConfig:
  cpu: 1
  memoryMiB: 512

# apps/admin/apphosting.yaml
env:
  - variable: APP_TYPE
    value: "admin"
runConfig:
  cpu: 1
  memoryMiB: 512
```

## CI/CD戦略

### GitHub Actions

パス別デプロイで変更があったアプリのみをデプロイ：

```yaml
# .github/workflows/deploy-app.yml
on:
  push:
    branches: [main]
    paths:
      - 'apps/app/**'
      - 'packages/shared/**'

# .github/workflows/deploy-admin.yml
on:
  push:
    branches: [main]
    paths:
      - 'apps/admin/**'
      - 'packages/shared/**'
```

## Firebase設定

### プロジェクト構成
- **単一Firebaseプロジェクト**を使用
- **異なるHostingサイト**でアプリを分離
  - app.misetomo.com: 求職者向け
  - admin.misetomo.com: 管理画面

### Firestoreセキュリティ戦略
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 求職者向けルール
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.role == 'store-owner';
    }
    
    // 管理者向けルール
    match /stores/{storeId} {
      allow read, write: if request.auth != null && 
        request.auth.token.storeId == storeId;
    }
  }
}
```

### カスタムクレームによる権限管理
- `role`: ユーザーの役割（customer, store-owner, admin）
- `storeId`: 店舗オーナーの店舗ID

## 技術スタック

### 共通
- **フレームワーク**: SvelteKit
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **認証**: Firebase Auth
- **データベース**: Firestore
- **ホスティング**: Firebase App Hosting

### デザインシステム
- Atlassian Design Systemに準拠
- 共通コンポーネントは`packages/shared`に配置

## メリット

### 開発効率
- コード共有による重複削減
- 型定義の一元管理
- 共通ユーティリティの再利用

### 運用面
- 独立したデプロイメント
- 障害の分離
- スケーリングの柔軟性

### 保守性
- 明確な責務分離
- テストの独立性
- チーム間の並行開発

## 実装順序

1. **Phase 1**: 現在の求職者向けアプリを`apps/app`に移動
2. **Phase 2**: `packages/shared`を作成し、共通コードを抽出
3. **Phase 3**: `apps/admin`で管理画面を新規開発
4. **Phase 4**: Firebase App Hostingで両アプリをデプロイ
5. **Phase 5**: CI/CDパイプラインの構築

## Claude Codeでの開発

### CLAUDE.mdの活用
各ディレクトリにCLAUDE.mdを配置し、以下を記載：
- プロジェクトの責務
- 依存関係
- デプロイ手順
- 固有のビジネスルール

### 作業コンテキスト
Claude Codeは全体構造を把握し、適切なディレクトリで作業を実行。共通コード変更時は両アプリへの影響を自動的に考慮。

## 更新履歴

- 2025-08-28: 初版作成