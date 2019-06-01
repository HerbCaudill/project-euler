import { collatz } from '.'

describe('Collatz', () => {
  test('should ', () => {
    expect(collatz(13)).toEqual([13, 40, 20, 10, 5, 16, 8, 4, 2, 1])
  })
})
