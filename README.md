# Angular フロントエンドテンプレート

## プロジェクト概要

このプロジェクトは、非標準的なAngularアプリケーション構成の再現とリファクタリングのためのテンプレートアプリケーションです。現在の構成を理解し、Angularのベストプラクティスに沿った形に改善することが目的です。

## 現状の構成と問題点

現状のプロジェクト構成は標準的なAngularプロジェクトとは異なります：

- ソースコードが `common/src` ディレクトリに配置されている
- コンポーネントが `my-component` ディレクトリにルートレベルで配置されている
- 標準的な `src` ディレクトリ構造が守られていない

この構成により、標準のAngular CLIコマンドは当初動作しませんでした。

## 修正方法

以下の設定ファイルを修正することで、現状の構造でもAngularの開発環境を動作させることができます：

### 1. angular.jsonの修正

- `sourceRoot`を`common/src`に変更
- `index`、`browser`、`styles`のパスを`common/src/...`に変更

### 2. tsconfig.app.jsonの修正

```json
{
  "files": [
    "common/src/main.ts"
  ],
  "include": [
    "common/src/**/*.d.ts"
  ]
}
```

### 3. tsconfig.spec.jsonの修正

```json
{
  "include": [
    "common/src/**/*.spec.ts",
    "common/src/**/*.d.ts",
    "my-component/**/*.spec.ts"
  ]
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

現在の構造をAngularのベストプラクティスに合わせてリファクタリングする際には、以下の手順を推奨します：

1. 標準的なAngularプロジェクト構造を新規作成
   ```bash
   ng new angular-best-practice
   ```

2. `common/src`と`my-component`から必要なコードを新しいプロジェクトの適切な場所にコピー

3. コンポーネント間の依存関係を正しく設定

4. モジュール構造を整理（機能モジュール、共有モジュールなど）

5. ルーティング設定の最適化

6. テストコードの修正と拡充

## ディレクトリ構造のベストプラクティス

標準的なAngularプロジェクトでは以下のような構造が推奨されます：

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
