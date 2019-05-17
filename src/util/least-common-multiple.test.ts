import { leastCommonMultiple } from '.'
import { range } from './range'

describe('leastCommonMultiple', () => {
  const testCase = (n: number[], expected: number) =>
    test(`${JSON.stringify(n)}: ${expected}`, () =>
      expect(leastCommonMultiple(...n)).toEqual(expected))

  testCase([2, 3], 6)
  testCase([4, 6], 12)
  testCase([8, 12], 24)
  testCase([4, 8, 12], 24)
  testCase([5, 8, 12], 120)
  testCase(range({ start: 2, stop: 10 }), 2520)
})
