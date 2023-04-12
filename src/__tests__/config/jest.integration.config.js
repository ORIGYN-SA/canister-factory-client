module.exports = {
  transform: {
    '^.+\\.(t|j)s?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.ts$',
  roots: ['<rootDir>/../integration'],
  moduleFileExtensions: ['ts', 'js', 'sh'],
  //globalSetup: '<rootDir>/jest.integration-setup.js',
  //globalTeardown: '<rootDir>/jest.integration-teardown.js',
  transformIgnorePatterns: ['/node_modules/', '/canister_factory/', '/dist/'],
};
