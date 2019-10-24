import { range } from '../../src/lib/range'

describe('range', () => {
  test('with props object', () => {
    expect(range({ start: 1, stop: 5 })).toEqual([1, 2, 3, 4, 5])
    expect(range({ start: 2, stop: 10, step: 2 })).toEqual([2, 4, 6, 8, 10])
    expect(range({ start: 10, stop: 15 })).toEqual([10, 11, 12, 13, 14, 15])
    expect(range({ step: 3, stop: 11 })).toEqual([1, 4, 7, 10])
    expect(range({ step: 3, stop: 13 })).toEqual([1, 4, 7, 10, 13])
    expect(range({ start: 0, step: 5, stop: 10 })).toEqual([0, 5, 10])
  })

  test('with argument (stop)', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5])
    expect(range(1)).toEqual([1])
  })

  test('with start and stop arguments', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5])
    expect(range(4, 7)).toEqual([4, 5, 6, 7])
  })
})
