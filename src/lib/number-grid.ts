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

    const flipIf = (rev: boolean) => (arr: any[]) =>
      rev ? [...arr].reverse() : [...arr]

    const getDiagonals = (flipV: boolean, flipH: boolean) =>
      // return every other set reversed so it goes in the right sequence
      flipIf(flipH)(
        // flip vertically if needed
        flipIf(flipV)(this.rows)
          // flip horizontally if needed
          .map(flipIf(flipH))
          // get diagonals going from upper right-hand corner to largest diagonal
          .map((series, i, _grid) =>
            series
              .slice(0, this.size - i) //
              .map((_, j) => _grid[i + j][j])
          )
      ).slice(flipH ? 0 : 1) // largest diagonal is duplicated, so trim it in one of each pair

    this.diagonals = [
      ...getDiagonals(true, true),
      ...getDiagonals(false, false),
      ...getDiagonals(false, true),
      ...getDiagonals(true, false),
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
