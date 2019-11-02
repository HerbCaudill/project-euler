module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '/tests/',
  moduleNameMapper: {
    '^lib/(.*)': '<rootDir>/src/lib/$1',
  },
}
