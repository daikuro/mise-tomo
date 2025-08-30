# アーキテクチャ設計書

## プロジェクト構成戦略

### マイクロサービスアーキテクチャの採用

本プロジェクトでは、各ユーザー層向けのサービスを独立したアプリケーションとして開発・デプロイすることで、真のマイクロサービスアーキテクチャを実現します。

## ディレクトリ構造

```
misetomo/                    # モノレポルート
├── apps/
│   ├── app/                # 求職者向けアプリ（メインサービス）
│   │   ├── src/
│   │   ├── package.json
│   │   ├── apphosting.yaml
│   │   └── CLAUDE.md       # アプリ固有の指示
│   ├── admin/              # サイト全体管理者向け管理画面
│   │   ├── src/
│   │   ├── package.json
│   │   ├── apphosting.yaml
│   │   └── CLAUDE.md       # 管理画面固有の指示
│   └── company/            # 店舗経営者向け管理画面
│       ├── src/
│       ├── package.json
│       ├── apphosting.yaml
│       └── CLAUDE.md       # 店舗管理画面固有の指示
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

## アプリケーション構成

### 1. app（求職者向けアプリ）
- **対象**: 求職者・一般ユーザー
- **主要機能**:
  - 求人検索・閲覧
  - 応募管理
  - プロフィール管理
  - お気に入り機能
- **URL**: app.misetomo.com

### 2. admin（サイト全体管理者向け）
- **対象**: システム管理者・運営チーム
- **主要機能**:
  - ユーザー管理（求職者・店舗両方）
  - システム全体のダッシュボード
  - コンテンツ管理
  - 利用統計・分析
  - システム設定
- **URL**: admin.misetomo.com

### 3. company（店舗経営者向け）
- **対象**: 飲食店経営者・店舗オーナー
- **主要機能**:
  - 求人掲載・管理
  - 応募者管理
  - 店舗情報管理
  - 採用プロセス管理
  - 店舗運営支援機能（売上分析、在庫管理、スタッフ管理など）
- **URL**: company.misetomo.com

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

# サイト管理者向けのバックエンド作成
firebase apphosting:backends:create --project [project-name]
# Root directory: apps/admin

# 店舗経営者向けのバックエンド作成
firebase apphosting:backends:create --project [project-name]
# Root directory: apps/company
```

#### デプロイ設定
- `misetomo-app-backend`: 求職者向け（apps/app）
- `misetomo-admin-backend`: サイト管理者向け（apps/admin）
- `misetomo-company-backend`: 店舗経営者向け（apps/company）

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

# apps/company/apphosting.yaml
env:
  - variable: APP_TYPE
    value: "company"
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

# .github/workflows/deploy-company.yml
on:
  push:
    branches: [main]
    paths:
      - 'apps/company/**'
      - 'packages/shared/**'
```

## Firebase設定

### プロジェクト構成
- **単一Firebaseプロジェクト**を使用
- **異なるHostingサイト**でアプリを分離
  - app.misetomo.com: 求職者向け
  - admin.misetomo.com: サイト管理者向け
  - company.misetomo.com: 店舗経営者向け

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
        (request.auth.token.role == 'company' || 
         request.auth.token.role == 'admin');
    }
    
    // 店舗データルール
    match /stores/{storeId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.storeId == storeId ||
         request.auth.token.role == 'admin');
    }
    
    // システム管理データ
    match /system/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role == 'admin';
    }
  }
}
```

### カスタムクレームによる権限管理
- `role`: ユーザーの役割（customer, company, admin）
- `storeId`: 店舗経営者の店舗ID

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
3. **Phase 3**: `apps/admin`でサイト管理画面を新規開発
4. **Phase 4**: `apps/company`で店舗管理画面を新規開発
5. **Phase 5**: Firebase App Hostingで全アプリをデプロイ
6. **Phase 6**: CI/CDパイプラインの構築

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

- 2025-08-29: 3つのアプリケーション構成に更新（app, admin, company）
- 2025-08-28: 初版作成