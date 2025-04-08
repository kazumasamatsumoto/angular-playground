/**
 * 両方のテスト環境（Karma+JasmineとJest）で共通して使用できるユーティリティ関数を提供します。
 */

/**
 * テスト用のモックデータを生成します
 * @param base ベースとなるオブジェクト
 * @param overrides 上書きするプロパティ
 * @returns マージされたオブジェクト
 */
export function createMockData<T extends object>(base: T, overrides: Partial<T> = {}): T {
  return {
    ...base,
    ...overrides
  };
}

/**
 * テスト用の非同期待機関数
 * @param ms 待機時間（ミリ秒）
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * DOMイベントのモック生成
 * @param eventName イベント名
 * @param properties イベントプロパティ
 * @returns モックイベント
 */
export function createMockEvent(eventName: string, properties = {}): Event {
  const event = new Event(eventName, { bubbles: true, cancelable: true });
  Object.assign(event, properties);
  return event;
}
