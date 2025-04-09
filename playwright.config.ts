import { defineConfig, devices } from '@playwright/test';

/**
 * Playwrightの設定ファイル
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e-tests',
  /* テスト実行の最大タイムアウト時間 */
  timeout: 30 * 1000,
  /* テスト実行のファイルごとの期待値 */
  expect: {
    /**
     * 各expectのデフォルトタイムアウト時間
     */
    timeout: 15000
  },
  /* テスト実行時のレポーター */
  reporter: 'html',
  /* 共有設定 */
  use: {
    /* アプリケーションがホストされているベースURL */
    baseURL: 'http://localhost:4200',
    /* すべてのテストでスクリーンショットを自動的に取得 */
    screenshot: 'only-on-failure',
    /* すべてのテストでトレースを収集 */
    trace: 'on-first-retry',
  },

  /* プロジェクト設定 - 異なるブラウザでテストを実行 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* ローカル開発サーバーの設定 */
  webServer: {
    command: 'npm run start',
    port: 4200,
    reuseExistingServer: !process.env['CI'],
  },
});
