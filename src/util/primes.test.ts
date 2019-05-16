import { primes, isPrime, nextPrime } from './primes'
import { primes_10000 as knownPrimes } from './precomputed/primes_10000'

describe('primes', () => {
  test('1', () => {
    expect(primes(1)).toEqual([])
  })

  test('2', () => {
    expect(primes(2)).toEqual([])
  })

  test('30', () => {
    const primesUnder30 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    expect(primes(30)).toEqual(primesUnder30)
  })

  test('1,000', () => {
    const p = knownPrimes.filter(p => p < 10 ** 3)
    expect(primes(10 ** 3)).toEqual(p)
  })

  test('100,000', () => {
    expect(primes(10 ** 5)).toHaveLength(9592)
  })
})

describe('nextPrime', () => {
  const testCase = (n: number, expected: number) =>
    test(`${n}:  ${expected}`, () => expect(nextPrime(n)).toEqual(expected))

  testCase(0, 2)
  testCase(1, 2)
  testCase(2, 3)
  testCase(4, 5)
  testCase(5, 7)
  testCase(10, 11)
  testCase(7920, 7927)
  testCase(62710573, 62710589)
  testCase(10 ** 8, 10 ** 8 + 7)
  testCase(10 ** 9, 10 ** 9 + 7)
  testCase(10 ** 10, 10 ** 10 + 19)
  testCase(10 ** 11, 10 ** 11 + 3)
  testCase(10 ** 12, 10 ** 12 + 39)
  testCase(10 ** 13, 10 ** 13 + 37)
  testCase(10 ** 14, 10 ** 14 + 31)

  // slower cases
  // testCase(10 ** 15, 10 ** 15 + 37) // 6 secs
  // testCase(9007199254740880, 9007199254740881) // largest prime in js integer space: 12 secs
})

describe('isPrime', () => {
  const testCase = (n: number, expected: boolean) =>
    test(`${n} is ${expected ? '' : 'not '}prime`, () =>
      expect(isPrime(n)).toEqual(expected))

  testCase(0, false)
  testCase(1, false)
  testCase(2, true)
  testCase(3, true)
  testCase(4, false)
  testCase(83, true)
  testCase(7919, true) // highest known prime
  testCase(7920, false)
  testCase(62710559, true)
  testCase(62710561, false) // square of highest known prime
  testCase(62710573, true)
  testCase(71234567, true)
  testCase(71234569, false)
  testCase(10000000019, true)
  testCase(100000000000, false)

  // slower cases
  // testCase(100000000019, true) // 2 secs
  // testCase(9007199254740881, true) // largest prime in js integer space: 12 secs
})
