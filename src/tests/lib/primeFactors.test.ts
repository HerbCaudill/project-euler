import { primeFactors } from 'lib/primeFactors'

describe('factors', () => {
  const testError = (n: number) =>
    test(`Can't factor ${n}`, () =>
      expect(() => primeFactors(n)).toThrow(/no prime factorization/))

  testError(-12)
  testError(1)
  testError(0)

  const testCase = (n: number, expected: number[]) =>
    test(`${n}: ${JSON.stringify(expected)}`, () =>
      expect(primeFactors(n)).toEqual(expected))
  testCase(2, [2])
  testCase(3, [3])
  testCase(4, [2, 2])
  testCase(5, [5])
  testCase(12, [2, 2, 3])
  testCase(83, [83])
  testCase(100, [2, 2, 5, 5])
  testCase(13195, [5, 7, 13, 29])
  testCase(429672, [2, 2, 2, 3, 17903])
  testCase(600851475143, [71, 839, 1471, 6857])
  testCase(9007199254740991, [6361, 69431, 20394401])
  testCase(9007199254740992, Array(53).fill(2))
})
