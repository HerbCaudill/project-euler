import { leastCommonMultiple } from '.'

describe('leastCommonMultiple', () => {
  const testCase = (n: number[], expected: number) =>
    test(`${JSON.stringify(n)}: ${expected}`, () =>
      expect(leastCommonMultiple(...n)).toEqual(expected))

  testCase([2, 3], 6)
})
