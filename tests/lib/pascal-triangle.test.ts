import { pascalTriangle, range } from '../../src/lib'

describe("Pascal's triangle", () => {
  test('first 11 rows', () => {
    const t = range({ stop: 10 }).map(r => pascalTriangle(r))
    const expected = [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
      [1, 5, 10, 10, 5, 1],
      [1, 6, 15, 20, 15, 6, 1],
      [1, 7, 21, 35, 35, 21, 7, 1],
      [1, 8, 28, 56, 70, 56, 28, 8, 1],
      [1, 9, 36, 84, 126, 126, 84, 36, 9, 1],
      [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1],
    ]
    expect(t).toEqual(expected)
  })

  describe('individual values via row API', () => {
    test('row 20, column 10', () => {
      expect(pascalTriangle(20)[10]).toEqual(184756)
    })

    test('row 50, column 20', () => {
      expect(pascalTriangle(50)[20]).toEqual(47129212243960)
    })
  })

  describe('individual values via row, column API', () => {
    test('row 20, column 10', () => {
      expect(pascalTriangle(20, 10)).toEqual(184756)
    })

    test('row 50, column 20', () => {
      expect(pascalTriangle(50, 20)).toEqual(47129212243960)
    })
  })
})
