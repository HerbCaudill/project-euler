import { primes, isPrime, nextPrime, nthPrime } from '../../src/lib'

describe('primes', () => {
  test('1', () => expect(primes(1)).toEqual([]))

  test('2', () => expect(primes(2)).toEqual([]))

  test('30', () =>
    expect(primes(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]))

  test('1,000', () => expect(primes(10 ** 3)).toHaveLength(168))

  // slower cases
  // test('100,000', () => expect(primes(10 ** 5)).toHaveLength(9592))
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
  // slower cases
  // testCase(10 ** 13, 10 ** 13 + 37)
  // testCase(10 ** 14, 10 ** 14 + 31)
  // testCase(10 ** 15, 10 ** 15 + 37)
  // testCase(9007199254740880, 9007199254740881) // largest prime in js integer space
})

describe('nthPrime', () => {
  test('1', () => expect(nthPrime(1)).toEqual(2))
  test('2', () => expect(nthPrime(2)).toEqual(3))
  test('6', () => expect(nthPrime(6)).toEqual(13))
  test('10', () => expect(nthPrime(10)).toEqual(29))
  test('1000', () => expect(nthPrime(1000)).toEqual(7919))
  // slower cases
  // test('10000', () => expect(nthPrime(10000)).toEqual(104729))
  // test('10001', () => expect(nthPrime(10001)).toEqual(104743))
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
  testCase(7919, true)
  testCase(7920, false)
  testCase(7921, false)
  testCase(62710559, true)
  testCase(62710561, false)
  testCase(62710573, true)
  testCase(71234567, true)
  testCase(71234569, false)
  testCase(10000000019, true)
  testCase(100000000000, false)
  testCase(100000000019, true)
  // slower cases
  //testCase(9007199254740881, true) // largest prime in js integer space
})
