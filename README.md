# Angular フロントエンドテンプレート

## プロジェクト概要

このプロジェクトは、非標準的な Angular アプリケーション構成の再現とリファクタリングのためのテンプレートアプリケーションです。現在の構成を理解し、Angular のベストプラクティスに沿った形に改善することが目的です。

## 現状の構成と問題点

現状のプロジェクト構成は標準的な Angular プロジェクトとは異なります：

- ソースコードが `common/src` ディレクトリに配置されている
- コンポーネントが `my-component` ディレクトリにルートレベルで配置されている
- 標準的な `src` ディレクトリ構造が守られていない

この構成により、標準の Angular CLI コマンドは当初動作しませんでした。

## 修正方法

以下の設定ファイルを修正することで、現状の構造でも Angular の開発環境を動作させることができます：

### 1. angular.json の修正

- `sourceRoot`を`common/src`に変更
- `index`、`browser`、`styles`のパスを`common/src/...`に変更

### 2. tsconfig.app.json の修正

```json
{
  "files": ["common/src/main.ts"],
  "include": ["common/src/**/*.d.ts"]
}
```

### 3. tsconfig.spec.json の修正

```json
{
  "include": ["common/src/**/*.spec.ts", "common/src/**/*.d.ts", "my-component/**/*.spec.ts"]
}
```

## 開発サーバーの起動

修正後は、以下のコマンドで開発サーバーを起動できます：

```bash
npm run start
```

ブラウザで http://localhost:4200/ にアクセスするとアプリケーションが表示されます。

## テストの実行

以下のコマンドでユニットテストを実行できます：

```bash
npm run test
```

## ベストプラクティスへのリファクタリング方針

現在の構造を Angular のベストプラクティスに合わせてリファクタリングする際には、以下の手順を推奨します：

1. 標準的な Angular プロジェクト構造を新規作成

   ```bash
   ng new angular-best-practice
   ```

2. `common/src`と`my-component`から必要なコードを新しいプロジェクトの適切な場所にコピー

3. コンポーネント間の依存関係を正しく設定

4. モジュール構造を整理（機能モジュール、共有モジュールなど）

5. ルーティング設定の最適化

6. テストコードの修正と拡充

## ディレクトリ構造のベストプラクティス

標準的な Angular プロジェクトでは以下のような構造が推奨されます：

```
src/
├── app/
│   ├── core/              # シングルトンサービス、アプリ起動時に読み込むモジュール
│   ├── shared/            # 共通コンポーネント、ディレクティブ、パイプ
│   ├── features/          # 機能モジュール
│   │   ├── feature1/
│   │   └── feature2/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/                # 画像、フォントなど
├── environments/          # 環境設定
├── index.html
└── main.ts
```

このようなベストプラクティスに沿った構造に移行することで、コードの保守性、拡張性、テスト容易性が向上します。

はい、この設定変更によって、common 以外のフォルダ（例えば現在の my-component や、今後追加される他のコンポーネントフォルダ）も同様に`angular-frontend`プロジェクトの一部として扱われるようになります。

ルート配下に 20 のコンポーネントフォルダがあるというのは確かに一般的な Angular の推奨構造とは異なりますが、この修正した angular.json では以下のように対応できます：

1. tsconfig.app.json の include と files セクションを拡張して、これらの追加コンポーネントを含めます：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["common/src/main.ts"],
  "include": [
    "common/src/**/*.d.ts",
    "my-component/**/*.ts",
    "component1/**/*.ts",
    "component2/**/*.ts",
    // または、より汎用的に：
    "*/**/*.ts",
    "!node_modules/**/*.ts",
    "!**/*.spec.ts"
  ]
}
```

2. tsconfig.spec.json も同様に拡張：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "include": ["common/src/**/*.spec.ts", "common/src/**/*.d.ts", "my-component/**/*.spec.ts", "*/**/*.spec.ts", "!node_modules/**/*.spec.ts"]
}
```

これにより、独特なプロジェクト構造であっても、単一のプロジェクト設定で管理できるようになります。

claude に内容を公開している

https://claude.ai/share/efae6254-3d4a-48d6-9049-6ba548f6b886

## テスト環境

### Karma+Jasmine と Jest の共存環境

このプロジェクトでは、Karma+Jasmine と Jest の両方のテスト環境を共存させています。両方のテストフレームワークを使用することで、それぞれの利点を活かしたテスト戦略を実現できます。

### 実装内容

1. **基本設定**

   - Jest とその関連パッケージ（jest、@types/jest、jest-preset-angular、ts-jest）をインストール
   - Jest 設定ファイル（jest.config.js、setup-jest.ts、tsconfig.jest.json）を作成
   - package.json にテスト実行スクリプトを追加

2. **テストの切り分け方法**

   - Karma+Jasmine 用: `*.spec.ts` ファイル
   - Jest 用: `*.test.ts` ファイル
   - このファイル命名規則により、テストランナーはそれぞれのテストを自動的に認識

3. **実行スクリプト**

   ```bash
   # Jestのみ実行（ユニットテスト）
   npm run test:unit

   # Jestのウォッチモードで実行
   npm run test:unit:watch

   # Karmaのみ実行（ブラウザテスト）
   npm run test:browser

   # 両方の環境でテスト実行
   npm run test:all
   ```

4. **テスト環境の使い分け**

   - Jest: サービス、パイプ、ディレクティブ、コンポーネントのビジネスロジックなどのユニットテスト
   - Karma+Jasmine: DOM イベント、レンダリング、アニメーション関連、実ブラウザでの振る舞いなどの統合テスト

5. **共通ユーティリティ**
   - `common/src/testing/test-utils.ts`に両方の環境で使える共通関数を実装

### テストガイドライン

詳細なテストガイドラインは`testing-guidelines.md`に記載されており、テストの書き方、環境の使い分け、ベストプラクティスなどが説明されています。このガイドラインに従うことで、効率的かつ一貫性のあるテスト実装が可能になります。

### 主要ファイル

- **設定ファイル**:
  - Jest: `jest.config.js`, `setup-jest.ts`, `tsconfig.jest.json`
  - Karma: `karma.conf.js` (Angular CLI が内部で使用), `tsconfig.spec.json`
- **テストファイル**: `*.spec.ts` (Karma), `*.test.ts` (Jest)
- **共通ユーティリティ**: `common/src/testing/test-utils.ts`

この構成により、Jest 環境の高速なユニットテストと Karma+Jasmine 環境の実ブラウザテストの両方のメリットを活用できます。

### 重要な設定項目

#### 1. Jest 設定ファイル (jest.config.js)

```javascript
module.exports = {
  preset: "jest-preset-angular", // Angular用のJestプリセットを使用
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"], // テスト環境のセットアップファイル
  transform: {
    "^.+\\.(ts|js|mjs|html|svg)$": [
      // トランスフォーム設定
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json", // Jest用のTS設定
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  testPathIgnorePatterns: [
    // 対象外ディレクトリ
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],
  testMatch: [
    "**/*.test.ts", // *.test.tsファイルのみを対象にする
  ],
  moduleNameMapper: {
    // モジュールエイリアス
    "@app/(.*)": "<rootDir>/common/src/app/$1",
    "@common/(.*)": "<rootDir>/common/src/$1",
  },
  collectCoverage: true, // カバレッジレポート設定
  coverageReporters: ["html", "text-summary"],
};
```

#### 2. setup-jest.ts

このファイルは Jest テスト実行前の環境設定を行います。主な役割は：

- Angular テスト環境のセットアップ
- DOM とブラウザ環境のモック設定

#### 3. tsconfig.jest.json

```javascript
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/jest",
    "types": ["jest", "node"],  // Jestとnodeの型定義を追加
    "esModuleInterop": true     // ESモジュール相互運用性の有効化
  },
  "include": [  // Jestテストファイルの指定
    "common/src/**/*.test.ts",
    "common/src/**/*.d.ts",
    "my-component/**/*.test.ts",
    "my-component/**/*.d.ts"
  ]
}
```

#### 4. package.json スクリプト

```json
"scripts": {
  "test": "ng test",              // 既存のKarmaテスト
  "test:unit": "jest",            // Jestテスト
  "test:unit:watch": "jest --watch", // Jestウォッチモード
  "test:browser": "ng test",      // Karmaテスト (明示的に命名)
  "test:all": "npm run test:unit && npm run test:browser" // 両方実行
}
```

#### 5. ファイル命名規則

テスト環境の分離は主にファイル名の拡張子により実現しています：

- `*.spec.ts`: Karma+Jasmine テスト
- `*.test.ts`: Jest テスト

各テストランナーは設定ファイル内の`testMatch`パターンに基づいてテストファイルを選択します。この命名規則を守ることで、同じコンポーネントやサービスに対して両方の環境でテストを書くことが可能になります。

### Playwright による E2E テスト環境

このプロジェクトには Playwright を使用した E2E（エンドツーエンド）テスト環境も導入されています。Playwright は、Chromium、Firefox、WebKit の 3 つのブラウザでテストを自動的に実行できるモダンなテストフレームワークです。

#### 導入内容

1. **基本設定**

   - Playwright パッケージとブラウザドライバーのインストール
   - 設定ファイル（`playwright.config.ts`）の作成と構成
   - テスト実行用のスクリプトを`package.json`に追加

2. **テストファイル構成**

   - 基本的なテスト: `e2e-tests/example.spec.ts`
   - 高度なテスト: `e2e-tests/advanced.spec.ts`
   - ページオブジェクトモデル（POM）: `e2e-tests/page-objects/home.page.ts`

3. **テスト機能**

   - 基本的なページ構造テスト
   - タイトルと要素の検証
   - スクリーンショットテスト
   - ページオブジェクトモデルパターンの実装

4. **ドキュメント**
   - テスト実行方法と作成ガイドライン: `e2e-testing.md`

#### テスト実行方法

```bash
# すべてのテストを実行
npm run test:e2e

# 特定のブラウザでのみテスト実行
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit

# UIモードでテストを実行（視覚的テスト環境）
npm run test:e2e:ui

# デバッグモードでテスト実行
npm run test:e2e:debug
```

#### 主要ファイル

- **設定ファイル**: `playwright.config.ts`
- **テストファイル**: `e2e-tests/*.spec.ts`
- **ページオブジェクト**: `e2e-tests/page-objects/*.page.ts`
- **ドキュメント**: `e2e-testing.md`

#### 特徴

- Angular アプリケーションの自動テスト
- 複数ブラウザでの同時テスト
- ページオブジェクトモデルによる保守性の高いテスト設計
- スクリーンショットテストによるビジュアルリグレッションテスト
- 詳細なテストレポート生成

https://claude.site/artifacts/85cf0452-0ab4-4aa1-8f14-e3a3547e5aa4
