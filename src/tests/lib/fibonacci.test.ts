import { fibonacci } from 'lib/fibonacci'

describe('fibonacci', () => {
  test('start with 1,2', () => {
    const result = fibonacci({ count: 10, arr: [1, 2] }).map(Number)
    expect(result).toEqual([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
  })
  test('start with default', () => {
    const result = fibonacci({ count: 10 }).map(Number)
    expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
  })
  test('max 12', () => {
    const result = fibonacci({ max: 12 }).map(Number)
    expect(result).toEqual([1, 1, 2, 3, 5, 8])
  })
  test('max 4,000,000', () => {
    const result = fibonacci({ max: 4000000 })
    expect(result).toHaveLength(33)
  })
  test('100 results', () => {
    const result = fibonacci({ count: 100 })
    expect(result).toHaveLength(100)
    expect(result[100 - 1].toString()).toEqual('354224848179261915075')
  })
})
