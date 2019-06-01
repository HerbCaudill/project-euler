import { divisors } from './divisors'

describe('divisors', () => {
  const testCase = (n: number, d: number[]) =>
    test(`${n}`, () => {
      const result = divisors(n)
      expect(result).toEqual(d)
    })

  testCase(1, [1])
  testCase(2, [1, 2])
  testCase(3, [1, 3])
  testCase(4, [1, 2, 4])
  testCase(12, [1, 2, 3, 4, 6, 12])
  testCase(25, [1, 5, 25])
  testCase(72, [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72])
  testCase(127, [1, 127])
})
