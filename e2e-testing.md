# Playwrightを使用したAngularアプリケーションのE2Eテスト

このドキュメントでは、Playwrightを使用したE2Eテストの実行方法について説明します。

## セットアップ

プロジェクトには既にPlaywrightがセットアップされています。以下の設定が含まれています：

- Playwrightパッケージのインストール
- 設定ファイル `playwright.config.ts`
- サンプルテストファイル `e2e-tests/example.spec.ts`
- package.jsonに追加されたテストコマンド

## テストの実行方法

以下のコマンドを使用してE2Eテストを実行できます：

```bash
# すべてのテストを実行
npm run test:e2e

# UIモードでテストを実行（テスト進行状況の視覚的な確認が可能）
npm run test:e2e:ui

# デバッグモードでテストを実行（ステップバイステップでのデバッグが可能）
npm run test:e2e:debug
```

## テストの作成方法

新しいテストを作成する場合は、`e2e-tests` ディレクトリに `.spec.ts` ファイルを作成します。

基本的なテスト構造：

```typescript
import { test, expect } from '@playwright/test';

test.describe('テストグループの説明', () => {
  test('テストケースの説明', async ({ page }) => {
    // ページに移動
    await page.goto('/');

    // 要素を探して操作
    await page.locator('button').click();
    
    // 期待される結果を検証
    await expect(page.locator('.result')).toHaveText('期待される結果');
  });
});
```

## 便利な機能

### ページオブジェクトモデル（POM）の使用

大規模なアプリケーションでは、ページオブジェクトモデルを使用してテストをより構造化することができます：

```typescript
// home-page.ts
export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async getTitle() {
    return this.page.locator('h1');
  }
}

// test.spec.ts
import { HomePage } from './home-page';

test('ホームページのテスト', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(await homePage.getTitle()).toContainText('Hello');
});
```

### ビジュアルテストの追加

スクリーンショットを撮影して、ビジュアル変更を検出できます：

```typescript
// スクリーンショットを撮影して比較
await expect(page).toHaveScreenshot('homepage.png');
```

## トラブルシューティング

テスト実行時に問題が発生した場合：

1. `webServer` の設定が正しいか確認（`playwright.config.ts`）
2. ブラウザが最新かどうか確認：`npx playwright install`
3. デバッグモードで実行：`npm run test:e2e:debug`

## 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/docs/intro)
- [Angularアプリケーションのテスト](https://angular.dev/tutorials/first-app/test)
