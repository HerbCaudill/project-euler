import { combinations } from './combinations'
// import { ok } from 'assert'

describe('combinations', () => {
  const s = new Set([2, 3, 4, 5])
  test('empty set', () => {
    const emptySet = new Set([])
    expect(combinations(emptySet)).toEqual([])
  })

  test('set with one item', () => {
    const singleItem = new Set([23])
    expect(combinations(singleItem)).toEqual([singleItem])
  })

  test('take 1 of 4', () => {
    expect(combinations(s, 1)).toEqual(
      [
        [2], //
        [3],
        [4],
        [5],
      ].map(a => new Set(a))
    )
  })

  test('take 2 of 4', () => {
    expect(combinations(s, 2)).toEqual(
      [
        [3, 2], //
        [4, 2],
        [5, 2],
        [4, 3],
        [5, 3],
        [5, 4],
      ].map(a => new Set(a))
    )
  })

  test('take 3 of 4', () => {
    expect(combinations(s, 3)).toEqual(
      [
        [4, 3, 2], //
        [5, 3, 2],
        [5, 4, 2],
        [5, 4, 3],
      ].map(a => new Set(a))
    )
  })

  test('all combinations, 4 items', () => {
    const c = combinations(s)
    expect(c).toEqual(
      [
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
      ].map(d => new Set(d))
    )
  })
})
