module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts', 'src/**/*.json', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts', 'tests/**/*.ts'],
    filesWithNoCoverageCalculated: ['src/**/resources/*', 'src/**/precomputed'],
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
// 