import { primeFactors as _primeFactors } from 'lib/primeFactors'
import memoize from 'fast-memoize'
import { range } from 'lib/range'
import { isPrime } from 'lib/millerRabin'
import { product } from 'lib/product'
import { distinct } from 'lib/distinct'

const primeFactors = memoize(_primeFactors)

// Totient maximum
// ===============
// Euler's Totient function, φ(n) [sometimes called the phi function], is
// used to determine the number of numbers less than n which are relatively
// prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than nine
// and relatively prime to nine, φ(9)=6.
//
// +------------------------------------------+
// | n  | Relatively Prime | φ(n) | n/φ(n)    |
// |----+------------------+------+-----------|
// | 2  | 1                | 1    | 2         |
// |----+------------------+------+-----------|
// | 3  | 1,2              | 2    | 1.5       |
// |----+------------------+------+-----------|
// | 4  | 1,3              | 2    | 2         |
// |----+------------------+------+-----------|
// | 5  | 1,2,3,4          | 4    | 1.25      |
// |----+------------------+------+-----------|
// | 6  | 1,5              | 2    | 3         |
// |----+------------------+------+-----------|
// | 7  | 1,2,3,4,5,6      | 6    | 1.1666... |
// |----+------------------+------+-----------|
// | 8  | 1,3,5,7          | 4    | 2         |
// |----+------------------+------+-----------|
// | 9  | 1,2,4,5,7,8      | 6    | 1.5       |
// |----+------------------+------+-----------|
// | 10 | 1,3,7,9          | 4    | 2.5       |
// +------------------------------------------+
//
// It can be seen that n=6 produces a maximum n/φ(n) for n≤10.
//
// Find the value of n≤1,000,000 for which n/φ(n) is a maximum.

const intersects = (a: number[], b: number[]) => {
  const s = new Set(b)
  return a.some(x => s.has(x))
}
{
  expect(intersects([1, 2], [3, 4])).toBe(false)
  expect(intersects([1, 2], [2, 3, 4])).toBe(true)
}

const relativelyPrime = (a: number) =>
  [1].concat(
    range(2, a - 1).filter(b => !intersects(primeFactors(a), primeFactors(b)))
  )
{
  expect(relativelyPrime(8)).toEqual([1, 3, 5, 7])
  expect(relativelyPrime(10)).toEqual([1, 3, 7, 9])
}

const phi = (n: number): number =>
  Math.round(n * product(distinct(primeFactors(n)).map(p => 1 - 1 / p)))
{
  expect(phi(2)).toBe(1)
  expect(phi(9)).toBe(6)
  expect(phi(10)).toBe(4)
}

export const solution069 = () =>
  range(2, 10 ** 6).reduce(
    (best, n, i) => {
      const totientRatio = n / phi(n)
      return totientRatio > best.totientRatio ? { n, totientRatio } : best
    },
    { n: 0, totientRatio: 0 }
  ).n
