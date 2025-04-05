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
