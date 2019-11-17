import { combinations } from 'lib/combinations'

const treatAsSet = (arr: number[][]) =>
  expect.arrayContaining(arr.map(a => expect.arrayContaining(a)))

describe('combinations', () => {
  const s = [2, 3, 4, 5]
  test('empty set', () => {
    const emptySet: any[] = []
    expect(combinations(emptySet)).toEqual([])
  })

  test('set with one item', () => {
    const singleItem = [23]
    expect(combinations(singleItem)).toEqual([singleItem])
  })

  test('take 0 of 4 (returns empty set)', () => {
    expect(combinations(s, 0)).toEqual([])
  })

  test('take 5 of 4 (returns empty set)', () => {
    expect(combinations(s, 5)).toEqual([])
  })

  const testCase = (r: number, c: number[][]) => {
    const result = combinations(s, r)
    expect(result).toEqual(treatAsSet(c))
    expect(result).toHaveLength(c.length)
  }

  test('take 1 of 4', () => {
    testCase(1, [[2], [3], [4], [5]])
  })

  test('take 2 of 4', () => {
    testCase(2, [
      [3, 2], //
      [4, 2],
      [5, 2],
      [4, 3],
      [5, 3],
      [5, 4],
    ])
  })

  test('take 3 of 4', () => {
    testCase(3, [
      [4, 3, 2], //
      [5, 3, 2],
      [5, 4, 2],
      [5, 4, 3],
    ])
  })

  test('take 4 of 4', () => {
    testCase(4, [[2, 3, 4, 5]])
  })

  test('all combinations, 4 items', () => {
    const c = combinations(s)
    expect(c).toHaveLength(15)
    expect(c).toEqual(
      treatAsSet([
        [5, 4, 3, 2],
        [4, 3, 2],
        [5, 3, 2],
        [5, 4, 2],
        [5, 4, 3],
        [3, 2],
        [4, 2],
        [5, 2],
        [4, 3],
        [5, 3],
        [5, 4],
        [2],
        [3],
        [4],
        [5],
      ])
    )
  })
})
