import {
  isPrime,
  nextPrime,
  nthPrime,
  primesUpTo,
  probablyPrime,
} from '../../src/lib/primes'

describe('primesUpTo', () => {
  test('1', () => expect(primesUpTo(1)).toEqual([]))
  test('2', () => expect(primesUpTo(2)).toEqual([]))
  test('20', () => expect(primesUpTo(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]))
  test('10**4', () => expect(primesUpTo(10 ** 3).length).toBe(168))
  test('10**5', () => expect(primesUpTo(10 ** 5).length).toBe(9592))
  test('10**6', () => expect(primesUpTo(10 ** 6).length).toBe(78498))
  test('10**7', () => expect(primesUpTo(10 ** 7).length).toBe(664579))
  test('10**7+100', () => expect(primesUpTo(10 ** 7 + 100).length).toBe(664581))
})

describe('nextPrime', () => {
  const testCase = (n: number, expected: number) =>
    expect(nextPrime(n)).toEqual(expected)

  test('0', () => testCase(0, 2))
  test('1', () => testCase(1, 2))
  test('2', () => testCase(2, 3))
  test('4', () => testCase(4, 5))
  test('5', () => testCase(5, 7))
  test('10', () => testCase(10, 11))
  test('7920', () => testCase(7920, 7927))
  test('62710573', () => testCase(62710573, 62710589))
  test('10 ** 8', () => testCase(10 ** 8, 10 ** 8 + 7))
  test('10 ** 9', () => testCase(10 ** 9, 10 ** 9 + 7))
  test('10 ** 10', () => testCase(10 ** 10, 10 ** 10 + 19))
  test('10 ** 11', () => testCase(10 ** 11, 10 ** 11 + 3))
  test('10 ** 12', () => testCase(10 ** 12, 10 ** 12 + 39))
  test('10 ** 13', () => testCase(10 ** 13, 10 ** 13 + 37))
  test('10 ** 14', () => testCase(10 ** 14, 10 ** 14 + 31))
  test('10 ** 15', () => testCase(10 ** 15, 10 ** 15 + 37))
  // test('9007199254740880', () => testCase(9007199254740880, 9007199254740881)) // largest prime in js integer space
})

describe('nthPrime', () => {
  test('1', () => expect(nthPrime(1)).toEqual(2))
  test('2', () => expect(nthPrime(2)).toEqual(3))
  test('6', () => expect(nthPrime(6)).toEqual(13))
  test('10', () => expect(nthPrime(10)).toEqual(29))
  test('1000', () => expect(nthPrime(1000)).toEqual(7919))
  test('10000', () => expect(nthPrime(10000)).toEqual(104729))
  test('10001', () => expect(nthPrime(10001)).toEqual(104743))
})

describe('isPrime', () => {
  const testCase = (n: number, expected: boolean) =>
    expect(isPrime(n)).toEqual(expected)

  test('0', () => testCase(0, false))
  test('1', () => testCase(1, false))
  test('2', () => testCase(2, true))
  test('3', () => testCase(3, true))
  test('4', () => testCase(4, false))
  test('83', () => testCase(83, true))
  test('7919', () => testCase(7919, true))
  test('7920', () => testCase(7920, false))
  test('7921', () => testCase(7921, false))
  test('62710559', () => testCase(62710559, true))
  test('62710561', () => testCase(62710561, false))
  test('62710573', () => testCase(62710573, true))
  test('71234567', () => testCase(71234567, true))
  test('71234569', () => testCase(71234569, false))
  test('10000000019', () => testCase(10000000019, true))
  test('100000000000', () => testCase(100000000000, false))
  test('100000000019', () => testCase(100000000019, true))
  // test('9007199254740881', () => testCase(9007199254740881, true)) // largest prime in js integer space
})

describe('probablyPrime', () => {
  const testCase = (n: number, expected: boolean) =>
    expect(probablyPrime(n, 30)).toEqual(expected)

  test('0', () => testCase(0, false))
  test('1', () => testCase(1, false))
  test('2', () => testCase(2, true))
  test('3', () => testCase(3, true))
  test('4', () => testCase(4, false))
  test('83', () => testCase(83, true))
  test('7919', () => testCase(7919, true))
  test('7920', () => testCase(7920, false))
  test('7921', () => testCase(7921, false))
  test('62710559', () => testCase(62710559, true))
  test('62710561', () => testCase(62710561, false))
  test('62710573', () => testCase(62710573, true))
  test('71234567', () => testCase(71234567, true))
  test('71234569', () => testCase(71234569, false))
  test('10000000019', () => testCase(10000000019, true))
  test('100000000000', () => testCase(100000000000, false))
  test('100000000019', () => testCase(100000000019, true))
  // test('9007199254740881', () => testCase(9007199254740881, true)) // largest prime in js integer space
})
