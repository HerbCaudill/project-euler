import { leastCommonMultiple } from '../../src/lib/least-common-multiple'
import { range } from '../../src/lib/range'

describe('leastCommonMultiple', () => {
  const testCase = (n: number[], expected: number | undefined) =>
    test(`${JSON.stringify(n)}: ${expected}`, () =>
      expect(leastCommonMultiple(n)).toEqual(expected))

  testCase([], 0)
  testCase([2], 2)
  testCase([2, 3], 6)
  testCase([4, 6], 12)
  testCase([8, 12], 24)
  testCase([4, 8, 12], 24)
  testCase([5, 8, 12], 120)
  testCase([120, 81], 3240)
  testCase(range({ start: 2, stop: 10 }), 2520)
  testCase([4, 7920, 62710561, 71234569], 35379905493899014000)
})
