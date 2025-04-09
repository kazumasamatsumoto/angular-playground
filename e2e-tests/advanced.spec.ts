import { test, expect } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test.describe('進化したテスト（POMパターン使用）', () => {
  test('ページオブジェクトモデルを使用したホームページテスト', async ({ page }) => {
    // ページオブジェクトモデルを初期化
    const homePage = new HomePage(page);
    
    // ホームページに移動
    await homePage.goto();
    
    // ページタイトルを確認
    await expect(page).toHaveTitle(/Symbol.*Angular|Common/);
    
    // 必要なHTMLコンポーネントが存在することを確認
    await expect(page.locator('html')).toBeAttached();
    await expect(page.locator('body')).toBeAttached();
  });
  
  // スクリーンショットテストの例
  test('ページのビジュアル検証', async ({ page }) => {
    await page.goto('/');
    
    // スクリーンショットを撮影して検証
    // 注意: スクリーンショット比較は初回実行時に基準画像を作成します
    // 一致しない場合は、差分を示すレポートが生成されます
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      // スクリーンショット比較の許容度を調整
      maxDiffPixelRatio: 0.05
    });
  });
  
  // 将来的にAngularコンポーネントが実装された場合の例
  test.skip('UIコンポーネント操作のサンプル (今後の実装用)', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // 例: ボタンをクリックして反応を確認
    // フォームに入力する例
    // await page.locator('#username').fill('testuser');
    // await page.locator('#password').fill('password123');
    // await page.locator('button[type="submit"]').click();
    
    // サンプル: ナビゲーションを確認
    // await page.locator('nav >> text=About').click();
    // await expect(page).toHaveURL(/.*about/);
  });
});
