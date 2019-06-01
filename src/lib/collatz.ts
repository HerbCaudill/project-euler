import memoize from 'memoizee'

export const collatz = memoize(
  (n: number): number[] =>
    n <= 1
      ? [1]
      : n % 2 === 0
      ? [n].concat(collatz(n / 2))
      : [n].concat(3 * n + 1).concat(collatz((3 * n + 1) / 2)),
  { max: 10000 }
)
