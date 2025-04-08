module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  testMatch: [
    '**/*.test.ts'  // Jestテスト用のファイル名パターン
  ],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/common/src/app/$1',
    '@common/(.*)': '<rootDir>/common/src/$1'
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary']
};
