import { merge } from '.'

describe('merge', () => {
  test('no overlap', () => expect(merge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]))
  test('one overlapping item', () =>
    expect(merge([1, 2], [2, 3])).toEqual([1, 2, 3]))
  test('two overlapping items', () =>
    expect(merge([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]))
})
