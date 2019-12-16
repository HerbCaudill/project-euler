import { distinct } from 'lib/distinct'

describe('distinct', () => {
  test('no duplicates', () => expect(distinct([1, 2, 3])).toEqual([1, 2, 3]))
  test('one duplicate', () => expect(distinct([1, 2, 2, 3])).toEqual([1, 2, 3]))
  test('many duplicates', () =>
    expect(distinct([1, 1, 1, 2, 3, 2, 3, 1, 1, 2, 2, 3])).toEqual([1, 2, 3]))
})
