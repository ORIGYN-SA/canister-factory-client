module.exports = {
  transform: {
    '^.+\\.(t|j)s?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.ts$',
  roots: ['<rootDir>/../unit'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/', '/canister_factory/', '/dist/'],
};
