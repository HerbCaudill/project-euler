import { eliminateCommon, simplify } from '../../src/lib/simplify'

describe('eliminateCommon', () => {
  const testCase = ({
    a,
    b,
    exp,
  }: {
    a: number[]
    b: number[]
    exp: number[][]
  }) => {
    const result = eliminateCommon(a, b)
    expect(result).toEqual(exp)
  }

  test('simple', () =>
    testCase({
      a: [2, 3, 4],
      b: [2, 5],
      exp: [[3, 4], [5]],
    }))

  test('repeated factor', () =>
    testCase({
      a: [2, 2, 3, 4],
      b: [2, 5],
      exp: [[2, 3, 4], [5]],
    }))

  test('repeated factors in both', () =>
    testCase({
      a: [2, 2, 3, 4],
      b: [2, 3, 3, 5],
      exp: [[2, 4], [3, 5]],
    }))

  test(`lots o'factors`, () => {
    testCase({
      a: [2, 2, 2, 2, 2, 3, 3, 3, 5, 7, 7, 13],
      b: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 7],
      exp: [[7, 13], [2, 2, 2, 2, 2, 3, 5, 5]],
    })
  })
})

describe('simplify', () => {
  test('2/4', () => expect(simplify([2, 4])).toEqual([1, 2]))
  test('1/2', () => expect(simplify([1, 2])).toEqual([1, 2]))
  test('15/18', () => expect(simplify([15, 18])).toEqual([5, 6]))
  test('4932/28140', () => expect(simplify([4932, 28140])).toEqual([411, 2345]))
  test('2751840/‭7257600‬', () =>
    expect(simplify([2751840, 72576000])).toEqual([91, 2400]))
})
