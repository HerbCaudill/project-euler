module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts', 'src/**/*.json'],
    tests: ['tests/**/*.test.ts'],
    filesWithNoCoverageCalculated: ['**/resources/**/*', '**/precomputed/**/*'],
    slowTestThreshold: 2000,
    env: { type: 'node' },
    testFramework: 'jest',
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs',
      }),
    },
  }
}
