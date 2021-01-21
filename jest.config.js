module.exports = {
  moduleDirectories: [
    'node_modules', '<rootDir>/src', '<rootDir>'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/test',
    '<rootDir>/test/fixtures/templates'
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/test/fixtures/dist/*',
    '<rootDir>/test/fixtures/src/index.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/utils',
    '<rootDir>/test/fixtures/dist',
  ],
  verbose: false,
  clearMocks: true
};
