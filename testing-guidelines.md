# Angularプロジェクトのテストガイドライン

このプロジェクトではKarma+JasmineとJestの両方のテスト環境を併用しています。このドキュメントでは、各環境の使い分け方と命名規則について説明します。

## テスト環境の使い分け

### Karma+Jasmine
- ファイル名パターン: `*.spec.ts`
- 主な用途:
  - コンポーネントの統合テスト
  - DOMイベントやレンダリングに関するテスト
  - アニメーション関連のテスト
  - 実ブラウザでの振る舞いが重要なテスト

### Jest
- ファイル名パターン: `*.test.ts`
- 主な用途:
  - サービスのユニットテスト
  - パイプやディレクティブのユニットテスト
  - コンポーネントのビジネスロジックに関するテスト
  - データ変換処理のテスト

## テスト実行コマンド

```
# Jestのみ実行（ユニットテスト）
npm run test:unit

# Jestのウォッチモードで実行
npm run test:unit:watch

# Karmaのみ実行（ブラウザテスト）
npm run test:browser

# 両方の環境でテスト実行
npm run test:all
```

## テスト作成のベストプラクティス

1. **適切なテスト環境の選択**
   - DOMや実ブラウザに依存する機能は `*.spec.ts` として実装（Karma）
   - ビジネスロジックやデータ処理は `*.test.ts` として実装（Jest）

2. **テストユーティリティの活用**
   - `common/src/testing/test-utils.ts` に共通のユーティリティ関数があります
   - 両方の環境で動作するように設計されているので積極的に活用してください

3. **テストの重複を避ける**
   - 同じ機能を両方の環境でテストしないでください
   - 各環境の強みを生かした役割分担を心がけてください

4. **命名規則の遵守**
   - ファイル名は環境に応じて `.spec.ts` または `.test.ts` を使用
   - テスト関数（it/test）の説明は明確に記述

5. **モックの適切な使用**
   - 外部依存はモック化しましょう
   - 共通のモックは共有できるよう整理しましょう

## フォルダ構造

```
src/
  app/
    components/
      my-component/
        my-component.component.ts
        my-component.component.spec.ts  # Karma用テスト
        my-component.component.test.ts  # Jest用テスト
```

## CI/CDでの実行

- 開発時の迅速なフィードバックには `npm run test:unit` (Jest)
- CI/CDパイプラインでの完全テストには `npm run test:all` (Jest + Karma)

## テスト環境の設定ファイル

- Jest: `jest.config.js`, `tsconfig.jest.json`, `setup-jest.ts`
- Karma: `karma.conf.js`, `tsconfig.spec.json`
