import { divisors, divisorCount, properDivisors } from '../../src/lib/divisors'

describe('divisors', () => {
  const testCase = (n: number, d: number[]) =>
    test(`${n}`, () => expect(divisors(n)).toEqual(d))

  testCase(1, [1])
  testCase(2, [1, 2])
  testCase(3, [1, 3])
  testCase(4, [1, 2, 4])
  testCase(12, [1, 2, 3, 4, 6, 12])
  testCase(25, [1, 5, 25])
  testCase(72, [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72])
  testCase(127, [1, 127])
})

describe('properDivisors', () => {
  const testCase = (n: number, d: number[]) =>
    test(`${n}`, () => expect(properDivisors(n)).toEqual(d))

  testCase(1, [])
  testCase(2, [1])
  testCase(3, [1])
  testCase(4, [1, 2])
  testCase(12, [1, 2, 3, 4, 6])
  testCase(25, [1, 5])
  testCase(72, [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36])
  testCase(127, [1])
})

describe('divisorCount', () => {
  const testCase = (n: number, length: number) =>
    test(`${n}`, () => expect(divisorCount(n)).toEqual(length))

  testCase(1, 1)
  testCase(2, 2)
  testCase(3, 2)
  testCase(4, 3)
  testCase(12, 6)
  testCase(72, 12)
  testCase(76576500, 576)
  testCase(6227020800, 1584)
})
