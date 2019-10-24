export type SequenceFn<T extends number | bigint> = (n: number) => T

/**
 * Represents a monotonically increasing numeric sequence
 *
 * Assumes:
 * - s(n+1) > s(n) for all n
 * - s(n) can be calculated as a function of n
 */
export class Sequence<T extends bigint | number> {
  private fn: SequenceFn<T>
  private knownValues: T[] = []
  private highestKnownValue: number = -1
  private knownValueMap: { [value: string]: boolean } = {}
  private generator: IterableIterator<T>

  constructor(fn: SequenceFn<T>) {
    this.fn = fn
    this.generator = generator()

    function* generator(startIndex = 1 as T) {
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
