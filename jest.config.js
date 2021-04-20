module.exports = {
  setupFilesAfterEnv: ['./rtl.setup.js', 'jest-canvas-mock'],
  globalSetup: './global.setup.js',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/redux/store.js',
    '!src/pages/_app.jsx',
    '!src/pages/_document.jsx',
    '!src/pages/lifestyle/index.jsx',
    '!src/pages/lifestyle/questionnaire.jsx',
    '!src/layouts/withActivationProvider.jsx',
    '!src/modules/login/activation/*',
    '!src/modules/payment/AddNewCard.jsx',
    '!src/modules/payment/check-out/*',
    '!src/modules/payment/pre-auth/*',
    '!src/pages/verify/index.jsx',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  testPathIgnorePatterns: ['coverage'],
  coveragePathIgnorePatterns: ['src/constants/', 'src/icons/'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  coverageDirectory: '<rootDir>/TestCoverageReportTemp',
};
