import { flatten } from './flatten'

type Series = number[]
type SeriesSet = Series[]

export class NumberGrid {
  size: number

  rows: SeriesSet
  columns: SeriesSet
  diagonals: SeriesSet

  constructor(gridSource: string) {
    // Rows

    this.rows = gridSource
      .trim()
      .split('\n')
      .map(d =>
        d
          .trim()
          .split(/\s/)
          .map(d => +d)
      )

    this.size = this.rows.length

    // Columns

    const transpose = (arr: SeriesSet) =>
      arr.map((_, i) => arr.map(row => row[i]))

    this.columns = transpose(this.rows)

    // Diagonals

    const flipIf = (f: boolean) => (a: any[]) => (f ? [...a].reverse() : a)

    const getDiagonals = (flipV: boolean, flipH: boolean) =>
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
    // Defined this way, there are 4 sets of diagonals. We can obtain them by flipping the grid
    // around four different ways and using the same logic on each to get one set of diagonals each.
    // This is easiest to understand by looking at the tests.
    this.diagonals = [
      ...getDiagonals(true, true),
      ...getDiagonals(false, false).slice(1), // main diagonal is duplicated, so trim it in one of each pair,
      ...getDiagonals(false, true),
      ...getDiagonals(true, false).slice(1),
    ]
  }

  words(length: number): number[][] {
    const allSeries = [...this.rows, ...this.columns, ...this.diagonals]
    return flatten(allSeries.map(s => wordsFromSeries(s, length)))
  }
}

export const wordsFromSeries = (series: Series, wordLength: number) =>
  series.length < wordLength
    ? []
    : series
        .slice(0, series.length - wordLength + 1)
        .map((_, i) => series.slice(i, wordLength + i))
