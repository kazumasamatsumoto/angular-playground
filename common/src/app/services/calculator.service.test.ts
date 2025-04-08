import { CalculatorService } from './calculator.service';

describe('CalculatorService (Jest)', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  describe('add', () => {
    it('正の数を加算できること', () => {
      expect(service.add(1, 2)).toBe(3);
    });

    it('負の数を加算できること', () => {
      expect(service.add(-1, -3)).toBe(-4);
    });

    it('0を加算できること', () => {
      expect(service.add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('正の数を減算できること', () => {
      expect(service.subtract(5, 3)).toBe(2);
    });

    it('負の結果になる減算ができること', () => {
      expect(service.subtract(2, 5)).toBe(-3);
    });
  });

  describe('multiply', () => {
    it('正の数を乗算できること', () => {
      expect(service.multiply(2, 3)).toBe(6);
    });

    it('負の数を含む乗算ができること', () => {
      expect(service.multiply(-2, 3)).toBe(-6);
      expect(service.multiply(2, -3)).toBe(-6);
      expect(service.multiply(-2, -3)).toBe(6);
    });

    it('0との乗算で0になること', () => {
      expect(service.multiply(5, 0)).toBe(0);
      expect(service.multiply(0, 5)).toBe(0);
    });
  });

  describe('divide', () => {
    it('正の数で除算できること', () => {
      expect(service.divide(6, 3)).toBe(2);
    });

    it('負の数を含む除算ができること', () => {
      expect(service.divide(-6, 3)).toBe(-2);
      expect(service.divide(6, -3)).toBe(-2);
      expect(service.divide(-6, -3)).toBe(2);
    });

    it('分子が0の場合、0を返すこと', () => {
      expect(service.divide(0, 5)).toBe(0);
    });

    it('0で割ろうとするとエラーが発生すること', () => {
      expect(() => service.divide(5, 0)).toThrow('0で割ることはできません');
    });
  });
});
