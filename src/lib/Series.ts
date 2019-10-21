export type SeriesFunction = (...args: any[]) => number

/**
 * Represents a monotonically increasing numeric series
 *
 * Assumes:
 * - s(n+1) > s(n) for all n
 * - s(n) can be calculated as a function of n
 */
export class Series {
  private fn: SeriesFunction
  private knownValues: number[]
  private highestKnownValue: number
  private knownValueMap: { [value: number]: boolean } = {}
  private generator: IterableIterator<number>
  constructor(fn: SeriesFunction) {
    this.fn = fn
    this.generator = generator()
    this.knownValues = [fn(1)]
    this.highestKnownValue = this.knownValues[0]

    const self = this

    function* generator(startIndex: number = 1): IterableIterator<number> {
      let n = startIndex
      while (true) {
        const value = fn(n++)
        self.knownValueMap[value] = true
        yield value
      }
    }
  }

  value(n: number) {
    return this.fn(n)
  }

  valuesUpTo(x: number) {
    this.generateUpTo(x)
    const index = this.knownValues.findIndex(v => v > x)
    return this.knownValues.slice(0, index)
  }

  generateUpTo(x: number) {
    let next = this.highestKnownValue
    while (next <= x) {
      next = this.generator.next().value
      this.knownValues.push(next)
    }
  }

  includes(x: number) {
    this.generateUpTo(x)
    return this.knownValueMap[x] === true
  }
}
