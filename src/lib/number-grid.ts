import { flatten } from './flatten'

export class NumberGrid {
  size: number

  rows: number[][]
  columns: number[][]
  diagonals: number[][]

  constructor(gridString: string) {
    // Rows

    this.rows = gridString
      .trim()
      .split('\n')
      .map(rowString =>
        rowString
          .trim()
          .split(/\s/)
          .map(d => +d)
      )

    this.size = this.rows.length

    // Columns

    const transpose = (arr: number[][]) =>
      arr.map((_, i) => arr.map(row => row[i]))

    this.columns = transpose(this.rows)

    // Diagonals

    const flipIf = (flip: boolean) => (arr: any[]) =>
      flip ? [...arr].reverse() : arr

    const getDiagonalSet = (flipV: boolean, flipH: boolean) =>
      // return every other set reversed so diagonals are
      // listed in a logical sequence (small -> big -> small)
      flipIf(flipH)(
        flipIf(flipV)(this.rows) // maybe flip vertically (reverse rows)
          .map(flipIf(flipH)) // maybe flip horizontally (reverse contents of each row)
          // get diagonals
          .map((series, i, _grid) =>
            series
              .slice(0, this.size - i) //
              .map((_, j) => _grid[i + j][j])
          )
      )

    // Define one set of diagonals as going from upper right-hand corner to main diagonal.
    // Defined this way, there are 4 sets of diagonals:

    //     D C B A      D . . .      A B C D      . . . D
    //     . D C B      C D . .      B C D .      . . D C
    //     . . D C      B C D .      C D . .      . D C B
    //     . . . D      A B C D      D . . .      D C B A

    // We can obtain them by flipping the grid around four different ways and
    // using the same logic on each to get one set of diagonals each.
    // (This is easiest to understand by looking at the tests.)
    this.diagonals = [
      ...getDiagonalSet(true, true),
      ...getDiagonalSet(false, false).slice(1), // main diagonal is duplicated, so trim it in one of each pair,
      ...getDiagonalSet(false, true),
      ...getDiagonalSet(true, false).slice(1),
    ]
  }

  // Returns all "words" from this grid's rows, columns, or diagonals.
  // (A "word" is a set of consecutive numbers.)
  // Example:
  // wordsFromSeries([1, 2, 3, 4, 5, 6], 3) 🡒
  // [
  //   [1, 2, 3],
  //   [2, 3, 4],
  //   [3, 4, 5],
  //   [4, 5, 6],
  // ]
  words(N: number): number[][] {
    const allSeries = [...this.rows, ...this.columns, ...this.diagonals]
    const findWords = wordsFromSeries(N)
    return flatten(allSeries.map(findWords))
  }
}

// Returns all "words" of length N from an array of numbers.
export const wordsFromSeries = (N: number) => (arr: number[]) =>
  arr.length < N
    ? []
    : arr.slice(0, arr.length - N + 1).map((_, i) => arr.slice(i, N + i))
