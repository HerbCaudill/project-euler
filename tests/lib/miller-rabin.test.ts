import { isPrime, isBigPrime } from '../../src/lib/miller-rabin'

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
  test('94945537', () => testCase(94945537, true))
  test('10000000019', () => testCase(10000000019, true))
  test('100000000000', () => testCase(100000000000, false))
  test('100000000019', () => testCase(100000000019, true))
  test('9007199254740880', () => testCase(9007199254740880, false))
  test('9007199254740881', () => testCase(9007199254740881, true)) // largest prime in js integer space
  test('9007199254740991', () => testCase(9007199254740991, false))
})

describe('isBigPrime', () => {
  test('26257349148876557867', () =>
    expect(isBigPrime(BigInt('26257349148876557867'))).toBe(true))
})
