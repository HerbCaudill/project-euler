export type SequenceFn = (n: number) => number | bigint

/**
 * Represents a monotonically increasing numeric sequence
 *
 * Assumes:
 * - s(n+1) > s(n) for all n
 * - s(n) can be calculated as a function of n
 */
export class Sequence {
  private fn: SequenceFn
  private knownValues: number[] = []
  private highestKnownValue: number = -1
  private knownValueMap: { [value: number]: boolean } = {}
  private generator: IterableIterator<number | bigint>

  constructor(fn: SequenceFn) {
    this.fn = fn
    this.generator = generator()

    function* generator(startIndex: number = 1) {
      let n = startIndex
      while (true) yield fn(n++)
    }
  }

  value(n: number) {
    return this.fn(n)
  }

  values(count: number) {
    while (this.knownValues.length <= count) this.next()
    return this.knownValues.slice(0, count)
  }

  valuesUpTo(x: number) {
    this.generateUpTo(x)
    const index = this.knownValues.findIndex(v => v > x)
    return this.knownValues.slice(0, index)
  }

  generateUpTo(x: number) {
    let next = this.highestKnownValue
    while (next <= x) next = this.next()
  }

  next() {
    const next = this.generator.next().value
    this.knownValues.push(next)
    this.knownValueMap[next] = true
    this.highestKnownValue = next
    return next
  }

  includes(x: number) {
    this.generateUpTo(x)
    return this.knownValueMap[x] === true
  }
}
