/* eslint-disable */
export default {
  displayName: 'frontend',
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
  setupFiles: ['<rootDir>/.jest/setEnvVars.js', '<rootDir>/.jest/cleanLogs.js'],
  coverageDirectory: '../../coverage/apps/frontend'
}
