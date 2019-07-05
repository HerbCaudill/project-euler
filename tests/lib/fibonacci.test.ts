import { fibonacci } from '../../src/lib/fibonacci'

describe('fibonacci', () => {
  test('start with 1,2', () => {
    const result = fibonacci({ count: 10, arr: [1, 2] })
    expect(result).toEqual([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
  })
  test('start with default', () => {
    const result = fibonacci({ count: 10 })
    expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
  })
  test('max 12', () => {
    const result = fibonacci({ max: 12, arr: [1, 2] })
    expect(result).toEqual([1, 2, 3, 5, 8])
  })
  test('max 4,000,000', () => {
    const result = fibonacci({ max: 4000000, arr: [1, 2] })
    expect(result).toHaveLength(32)
  })
})
