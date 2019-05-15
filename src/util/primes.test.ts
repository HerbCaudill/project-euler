import { primes, isPrime, nextPrime } from './primes'

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

  test('10,000', () => {
    expect(primes(10 ** 4)).toHaveLength(1229)
  })

  test('100,000 (for performance only)', () => {
    expect(primes(10 ** 5)).toHaveLength(9592)
  })
})

describe('nextPrime', () => {
  const makeTest = (n: number, expected: number) =>
    test(`${n}:  ${expected}`, () => expect(nextPrime(n)).toEqual(expected))

  makeTest(4, 5)
  makeTest(10, 11)
  makeTest(7920, 7927)
  makeTest(62710573, 62710589)
  makeTest(10 ** 8, 10 ** 8 + 7)
})

describe('isPrime', () => {
  const makeTest = (n: number, expected: boolean) =>
    test(`${n} is ${expected ? '' : 'not '}prime`, () =>
      expect(isPrime(n)).toEqual(expected))

  makeTest(0, false)
  makeTest(1, false)
  makeTest(2, true)
  makeTest(3, true)
  makeTest(4, false)
  makeTest(83, true)
  makeTest(7919, true) // highest known prime
  makeTest(7920, false)
  makeTest(62710559, true)
  makeTest(62710561, false) // square of highest known prime
  makeTest(62710573, true)
  makeTest(71234567, true)
  makeTest(71234569, false)
})
