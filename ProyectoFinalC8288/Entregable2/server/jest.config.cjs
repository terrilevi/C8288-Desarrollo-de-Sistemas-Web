// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'node'],
  testTimeout: 10000,
  setupFiles: ['dotenv/config'],
  testMatch: ['**/tests/**/*.test.js'],
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest'
  }
};