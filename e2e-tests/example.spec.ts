import { test, expect } from '@playwright/test';

test.describe('Angularアプリケーションの基本テスト', () => {
  // このテストはページがロードされることを確認します
  test('ページが存在し、基本的なHTML要素が表示されること', async ({ page }) => {
    // トップページに移動
    await page.goto('/');
    
    // ページタイトルを確認
    await expect(page).toHaveTitle(/Symbol.*Angular|Common/);
    
    // HTML要素が存在することを確認（表示されているかではなく、DOMに存在するか）
    await expect(page.locator('html')).toBeAttached();
    await expect(page.locator('body')).toBeAttached();
  });
  
  // このテストはHTMLドキュメントに必要な要素が含まれていることを確認します
  test('HTMLドキュメントに必要な要素が含まれていること', async ({ page }) => {
    await page.goto('/');
    
    // ヘッド要素が存在することを確認
    await expect(page.locator('head')).toBeAttached();
    
    // メタ要素が存在することを確認
    await expect(page.locator('meta[charset]')).toBeAttached();
    await expect(page.locator('meta[name="viewport"]')).toBeAttached();
  });
});
