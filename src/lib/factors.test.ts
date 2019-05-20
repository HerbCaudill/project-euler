import { factors } from './factors'
import { divisors } from "./divisors";

describe('factors', () => {
  const testError = (n: number) =>
    test(`Can't factor ${n}`, () =>
      expect(() => factors(n)).toThrow(/no prime factorization/))

  testError(-12)
  testError(1)
  testError(0)

  const testCase = (n: number, expected: number[]) =>
    test(`${n}: ${JSON.stringify(expected)}`, () =>
      expect(factors(n)).toEqual(expected))
  testCase(2, [])
  testCase(3, [])
  testCase(4, [2, 2])
  testCase(12, [2, 2, 3])
  testCase(83, [])
  testCase(100, [2, 2, 5, 5])
  testCase(13195, [5, 7, 13, 29])
  testCase(429672, [2, 2, 2, 3, 17903])
  testCase(600851475143, [71, 839, 1471, 6857])
  testCase(9007199254740992, Array(53).fill(2))
})
describe('divisors', () => {
  const testCase = (n: number, expected: number[]) =>
    test(`${n}: ${JSON.stringify(expected)}`, () =>
      expect(divisors(n)).toEqual(expected))
  testCase(2, [1, 2])
  testCase(3, [1, 3])
  testCase(4, [1, 2, 4])
  testCase(12, [1, 2, 3, 4, 6, 12])
})
