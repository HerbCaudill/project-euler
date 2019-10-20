import { panDigitals, allDigits } from 'lib/panDigital'
import { sum } from 'lib/sum'
import { range } from 'lib/range'
import { digits } from 'lib/digits'

// Sub-string divisibility
// =======================
// The number, 1406357289, is a 0 to 9 pandigital number because it is made
// up of each of the digits 0 to 9 in some order, but it also has a rather
// interesting sub-string divisibility property.
//
// Let d[1] be the 1st digit, d[2] be the 2nd digit, and so on. In this
// way, we note the following:
//
//   * d[2]d[3]d[4]=406 is divisible by 2
//   * d[3]d[4]d[5]=063 is divisible by 3
//   * d[4]d[5]d[6]=635 is divisible by 5
//   * d[5]d[6]d[7]=357 is divisible by 7
//   * d[6]d[7]d[8]=572 is divisible by 11
//   * d[7]d[8]d[9]=728 is divisible by 13
//   * d[8]d[9]d[10]=289 is divisible by 17
//
// Find the sum of all 0 to 9 pandigital numbers with this property.

const divisors = [1, 2, 3, 5, 7, 11, 13, 17]
const isSubstringDivisible = (n: number) =>
  !divisors.some((d, i) => +n.toString().slice(i, i + 3) % d > 0)

expect(isSubstringDivisible(1406357289)).toBe(true)
expect(isSubstringDivisible(1043652789)).toBe(false)

/**
 * This works:
 *
 * ```ts
 *   export const solution043 = () => sum(panDigitals(10).filter(isSubstringDivisible))
 * ```
 *
 * But it's slow (just generating all 10-pandigital numbers takes ~6s).
 */

/**
 * Returns true
 * @param n
 */
const noDuplicates = (n: number) => {
  const isDuplicate = (d: number, i: number, arr: number[]) =>
    i < 1 ? false : arr.slice(0, i).includes(d)
  return !digits(n).some(isDuplicate)
}
expect(noDuplicates(1234567890)).toBe(true)
expect(noDuplicates(1092837465)).toBe(true)
expect(noDuplicates(123)).toBe(true)

expect(noDuplicates(121)).toBe(false)
expect(noDuplicates(11092837465)).toBe(false)
expect(noDuplicates(92811370465)).toBe(false)
expect(noDuplicates(92837460511)).toBe(false)
expect(noDuplicates(19283740651)).toBe(false)
expect(noDuplicates(19283710465)).toBe(false)

/**
 * Takes a number n1, and returns a function that takes a number n2 and returns true if n1 and n2
 * have no digits in common.
 * @param n1 Number with the digits to exclude. If not provided, returns true.
 */
const noOverlap = (n1?: number) => (n2: number) =>
  n1 ? !digits(n1).some(d => digits(n2).includes(d)) : true

expect(noOverlap(123)(123)).toBe(false)
expect(noOverlap(123)(345)).toBe(false)
expect(noOverlap(123)(456)).toBe(true)
expect(noOverlap()(123)).toBe(true)
expect(noOverlap()(456)).toBe(true)

/**
 * Returns all 3-digit multiples of `n` that have no duplicate digits
 * (optionally also excluding the digits in `excludeDigits`)
 */
const candidates = (n: number): number[] => {
  const start = Math.ceil(100 / n)
  const stop = Math.ceil(999 / n)
  return range({ start, stop })
    .map(d => d * n)
    .filter(noDuplicates)
}

expect(
  candidates(17) //
    .filter(noOverlap())
    .slice(0, 5)
).toEqual([102, 136, 153, 170, 187])

expect(
  candidates(13)
    .filter(noOverlap(102))
    .slice(0, 5)
).toEqual([364, 468, 546, 598, 637])

export const solution043 = () =>
  sum(
    candidates(17)
      .flatMap(d1 =>
        candidates(7)
          .filter(noOverlap(d1))
          .map(d2 => +`${d2}${d1}`)
      )
      .flatMap(d2 =>
        candidates(2)
          .filter(noOverlap(d2))
          .map(d3 => +`${d3}${d2}`)
      )
      .flatMap(d3 =>
        allDigits //
          .filter(noOverlap(d3))
          .map(d4 => +`${d4}${d3}`)
      )
      .filter(isSubstringDivisible)
  )
