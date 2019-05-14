import { range } from './range'

describe('range', () => {
  test('step=1', () => {
    expect(range({ start: 1, stop: 5 })).toEqual([1, 2, 3, 4, 5])
  })

  test('step=2', () => {
    expect(range({ start: 2, stop: 10, step: 2 })).toEqual([2, 4, 6, 8, 10])
  })

  test('start=10', () => {
    expect(range({ start: 10, stop: 15 })).toEqual([10, 11, 12, 13, 14, 15])
  })

  test('step=3, stop=10', () => {
    expect(range({ step: 3, stop: 10 })).toEqual([0, 3, 6, 9])
  })

  test('step=3, stop=12', () => {
    expect(range({ step: 3, stop: 12 })).toEqual([0, 3, 6, 9, 12])
  })
  test('step=5, stop=10', () => {
    expect(range({ step: 5, stop: 10 })).toEqual([0, 5, 10])
  })
  test('step=3, stop=1000', () => {
    expect(range({ step: 3, stop: 1000 })).toEqual([0, 5, 10])
  })
})
