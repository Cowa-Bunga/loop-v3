/* eslint-disable */
export default {
  displayName: 'loop-pro: frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }]
  },
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: [
    'json',
    // "text",
    'html',
    'lcov'
    // "clover"
  ],
  setupFiles: [
    '<rootDir>/test/jest/setEnvVars.js',
    '<rootDir>/test/jest/cleanLogs.js',
    '<rootDir>/test/jest/mocks.ts'
  ],
  coverageDirectory: '../../coverage/apps/frontend'
}
