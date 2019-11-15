const sourceFiles = 'src/**/*.ts'
const jsonFiles = 'src/**/*.json'
const testFiles = 'src/tests/**/*.test.ts'

const not = s => `!${s}`

module.exports = function(wallaby) {
  return {
    files: [
      { pattern: sourceFiles, instrument: true },
      jsonFiles,
      not(testFiles),
    ],
    tests: [testFiles],
    filesWithNoCoverageCalculated: [
      '**/problems/*',
      '**/resources/**/*',
      '**/precomputed/**/*',
    ],
    slowTestThreshold: 2000,
    debug: true,
    env: { type: 'node' },
    testFramework: 'jest',
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs',
      }),
    },
    workers: {
      initial: 4,
      regular: 4,
    },
  }
}
