import { factors } from './factors'

describe.only('factors', () => {
  const makeTest = (n: number, expected: number[]) =>
    test(`${n}`, () => expect(factors(n)).toEqual(expected))

  makeTest(0, [])
  makeTest(1, [])
  makeTest(2, [])
  makeTest(3, [])
  makeTest(4, [2, 2])
  makeTest(12, [2, 2, 3])
  makeTest(83, [])
  makeTest(100, [2, 2, 5, 5])
  makeTest(13195, [5, 7, 13, 29])
  makeTest(429672, [2, 2, 2, 3, 17903])
})
