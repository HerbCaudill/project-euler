import { NumberGrid, wordsFromSeries } from '../../src/lib/number-grid'

describe('NumberGrid', () => {
  const gridSource = `
    1 2 3 4
    5 6 7 8
    9 0 1 2
    3 4 5 6`
  const grid = new NumberGrid(gridSource)

  test('rows', () => {
    expect(grid.rows).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 0, 1, 2],
      [3, 4, 5, 6],
    ])
  })

  test('columns', () => {
    expect(grid.columns).toEqual([
      [1, 5, 9, 3],
      [2, 6, 0, 4],
      [3, 7, 1, 5],
      [4, 8, 2, 6],
    ])
  })

  test('diagonals', () => {
    expect(grid.diagonals).toEqual([
      [4],
      [8, 3],
      [2, 7, 2],
      [6, 1, 6, 1],
      [5, 0, 5],
      [9, 4],
      [3],
      [6],
      [2, 5],
      [8, 1, 4],
      [4, 7, 0, 3],
      [9, 6, 3],
      [5, 2],
      [1],
    ])
  })

  test('wordsFromSeries', () => {
    expect(wordsFromSeries(3)([1, 2, 3, 4, 5, 6])).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
    ])
  })

  test('words', () => {
    expect(grid.words(3)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [5, 6, 7],
      [6, 7, 8],
      [9, 0, 1],
      [0, 1, 2],
      [3, 4, 5],
      [4, 5, 6],
      [1, 5, 9],
      [5, 9, 3],
      [2, 6, 0],
      [6, 0, 4],
      [3, 7, 1],
      [7, 1, 5],
      [4, 8, 2],
      [8, 2, 6],
      [2, 7, 2],
      [6, 1, 6],
      [1, 6, 1],
      [5, 0, 5],
      [8, 1, 4],
      [4, 7, 0],
      [7, 0, 3],
      [9, 6, 3],
    ])
  })
})
