import { panDigitals, allDigits } from 'lib/panDigital'
import { sum } from 'lib/sum'
import { range } from 'lib/range'
import { noDuplicates } from '../lib/noDuplicates'
import { noOverlap } from '../lib/no-overlap'

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
  !divisors
    .slice(10 - n.toString().length)
    .some((d, i) => +n.toString().slice(i, i + 3) % d > 0)

expect(isSubstringDivisible(1406357289)).toBe(true)
expect(isSubstringDivisible(1043652789)).toBe(false)

/**
 * This works:
 *
 * ```ts
 *   const validPanDigitals = panDigitals(10).filter(isSubstringDivisible)
 * ```
 *
 * But it's slow (just generating all 10-pandigital numbers takes ~6s).
 *
 * A new strategy:
 *
 * - Generate all possibilities for the final 3-digit block: all 3-digit multiples of 17 with no
 *   duplicated digits.
 * - For each of these, generate all possibilities for the middle 3-digit block: same as above with
 *   multiples of 7. Filter the combinations for sub-string divisibility.
 * - For each of these, generate all possibilities for the block starting at the second digit:
 *   multiples of 2. Filter all these combinations for sub-string divisibility.
 * - For each of these, there will just be one possible digit for the
 */

// so we also need to be able to test shorter strings at the tail end:
expect(isSubstringDivisible(357289)).toBe(true) // xxxx357289
expect(isSubstringDivisible(6357289)).toBe(true) // xxx6357289
expect(isSubstringDivisible(406357289)).toBe(true) // x406357289
expect(isSubstringDivisible(375829)).toBe(false)
expect(isSubstringDivisible(6375298)).toBe(false)
expect(isSubstringDivisible(460537892)).toBe(false)

expect(noDuplicates(1234567890)).toBe(true)
expect(noDuplicates(1092837465)).toBe(true)
expect(noDuplicates(123)).toBe(true)

expect(noDuplicates(121)).toBe(false)
expect(noDuplicates(11092837465)).toBe(false)
expect(noDuplicates(92811370465)).toBe(false)
expect(noDuplicates(92837460511)).toBe(false)
expect(noDuplicates(19283740651)).toBe(false)
expect(noDuplicates(19283710465)).toBe(false)

expect(noOverlap(123)(123)).toBe(false)
expect(noOverlap(123)(345)).toBe(false)
expect(noOverlap(123)(456)).toBe(true)
expect(noOverlap()(123)).toBe(true)
expect(noOverlap()(456)).toBe(true)

/**
 * Returns all 3-digit multiples of `n` that have no duplicate digits
 */
const candidates = (n: number): number[] => {
  const start = Math.ceil(100 / n)
  const stop = Math.ceil(999 / n)
  return range({ start, stop })
    .map(d => d * n)
    .filter(noDuplicates)
}

const lastBlock = candidates(17)

// prettier-ignore
expect(lastBlock).toEqual([102, 136, 153, 170, 187, 204, 238, 289, 306, 340, 357, 374, 391, 408, 425, 459, 476, 493, 510, 527, 561, 578, 612, 629, 680, 697, 714, 731, 748, 765, 782, 816, 850, 867, 901, 918, 935, 952, 986, ])

const addMiddleBlock = lastBlock
  .flatMap(d1 =>
    candidates(7)
      .filter(noOverlap(d1))
      .map(d2 => +`${d2}${d1}`)
  )
  .filter(isSubstringDivisible)

// prettier-ignore
expect(addMiddleBlock).toEqual([735204, 679238, 357289, 791306, 280391, 392476, 693510, 294680, 462731, 140782, 574816, 952867, 420918, 175986])

const addFirstBlock = addMiddleBlock
  .flatMap(d2 =>
    candidates(2)
      .filter(noOverlap(d2))
      .map(d3 => +`${d3}${d2}`)
  )
  .filter(isSubstringDivisible)

// prettier-ignore
expect(addFirstBlock).toEqual([106357289, 160357289, 406357289, 460357289, 130952867, 430952867])

const validPanDigitals = addFirstBlock //
  .flatMap(d3 =>
    allDigits //
      .filter(noOverlap(d3))
      .map(d4 => +`${d4}${d3}`)
  )

// prettier-ignore
expect(validPanDigitals).toEqual([4106357289, 4160357289, 1406357289, 1460357289, 4130952867, 1430952867])

export const solution043 = () => sum(validPanDigitals)
