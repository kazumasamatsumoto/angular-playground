import { Page, Locator } from '@playwright/test';

/**
 * ホームページのページオブジェクトモデル
 * テストコードの再利用性と保守性を高めるために使用
 */
export class HomePage {
  readonly page: Page;
  
  // セレクタの定義
  readonly title: Locator;
  readonly welcomeMessage: Locator;
  readonly angularLogo: Locator;
  readonly externalLinks: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // 必要な要素のセレクタを定義
    this.title = page.locator('h1');
    this.welcomeMessage = page.locator('p').filter({ hasText: 'Congratulations' });
    this.angularLogo = page.locator('.angular-logo');
    this.externalLinks = page.locator('.pill');
  }
  
  /**
   * ホームページに移動する
   */
  async goto() {
    await this.page.goto('/');
  }
  
  /**
   * 全てのリンクの情報を取得する
   * @returns {Promise<Array<{title: string, href: string}>>} リンク情報の配列
   */
  async getLinks() {
    const links = await this.externalLinks.all();
    const result = [];
    
    for (const link of links) {
      const title = await link.textContent();
      const href = await link.getAttribute('href');
      if (title && href) {
        result.push({
          title: title.trim(),
          href
        });
      }
    }
    
    return result;
  }
}
