import { distinctArrays } from '../../lib/distinctArrays'

describe('distinctArrays', () => {
  test('no dupes', () =>
    expect(distinctArrays([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]))
  test('exact dupes', () =>
    expect(distinctArrays([[1, 2], [1, 2]])).toEqual([[1, 2]]))
  test('dupes but different order', () =>
    expect(distinctArrays([[1, 2], [2, 1]])).toEqual([[1, 2]]))
  test('3 items', () =>
    expect(distinctArrays([[1, 2, 3], [2, 1, 3], [2, 3, 1]])).toEqual([
      [1, 2, 3],
    ]))
  test('multiple results', () =>
    expect(
      distinctArrays([[1, 2, 3], [5, 7], [2, 1, 3], [7, 6], [6, 7], [2, 3, 1]])
    ).toEqual([[1, 2, 3], [5, 7], [6, 7]]))
})
