import { combinations } from 'lib/combinations'
import { allDigits } from 'lib/panDigital'
import { isPrime, primesUpTo, nextPrime } from 'lib/primes'
import { range } from 'lib/range'
import memoize from 'fast-memoize'

// Prime digit replacements
// ========================
// By replacing the 1st digit of *57, it turns out that six of the possible
// values: 157, 257, 457, 557, 757, and 857, are all prime.
//
// By replacing the 3rd and 4th digits of 56**3 with the same digit, this
// 5-digit number is the first example having seven primes, yielding the
// family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently
// 56003, being the first member of this family, is the smallest prime with
// this property.
//
// Find the smallest prime which, by replacing part of the number (not
// necessarily adjacent digits) with the same digit, is part of an eight
// prime value family.

type Family = {
  pattern: string
  length: number
}

/**
 * Replaces the digits marked as `*` with each digit from 0 to 9. Example:
 * ```ts
 * digitReplacements('*57') // 157, 257, 357, 457, 557, 657, 757, 857, 957
 * ```
 * @param pattern The numeric pattern to replace, consisting of digits and the `*` character.
 */
const digitReplacements = (pattern: string) =>
  allDigits
    .map(d => pattern.replace(/\*/g, d.toString()))
    .map(Number)
    .filter(n => n.toString().length === pattern.length) // don't allow leading zeroes

{
  // prettier-ignore
  expect(digitReplacements('*57')).toEqual([ 157, 257, 357, 457, 557, 657, 757, 857, 957])
  // prettier-ignore
  expect(digitReplacements('1**')).toEqual([ 111, 122, 133, 144, 155, 166, 177, 188, 199, 100])
}

/**
 * Same as `replaceDigits` but only returns prime values
 * @param pattern
 */
const primeDigitReplacements = (pattern: string) =>
  digitReplacements(pattern).filter(isPrime)

{
  expect(primeDigitReplacements('*57')).toEqual([157, 257, 457, 557, 757, 857])
  // prettier-ignore
  expect(primeDigitReplacements('56**3')).toEqual([56113, 56333, 56443, 56663, 56773, 56993, 56003])
}

/**
 * Returns all possible combinations of character positions in a string of a given length (excluding
 * the combination that consists of all character positions, because `****` isn't an interesting
 * pattern). For example, `getPositionCombinations(4)` would return the following:
 * ```ts
 *   0,1,2  0,1,3  0,2,3  1,2,3
 *   0,1    0,2    0,3    1,2     1,3    2,3
 *   0      1      2      3
 * ```
 */
const _getPositionCombinations = (length: number) => {
  const positions = range(0, length - 2) // last digit can't be a placeholder
  return combinations(positions)
}
const getPositionCombinations = memoize(_getPositionCombinations)

/**
 * Finds all replacement patterns for a given number. For example, for the number `157` you'd have:
 * ` **7   *5*   1**   *57   1*7   15* `
 * @param n
 */
const allPatterns = (n: number) => {
  const positionCombinations = getPositionCombinations(n.toString().length)
  const subsitute = (combo: number[]) =>
    n
      .toString()
      .split('')
      .map((d, i) => (combo.includes(i) ? '*' : d))
      .join('')
  return positionCombinations.map(subsitute)
}

{
  expect(allPatterns(157)).toEqual(
    expect.arrayContaining(['**7', '*57', '1*7'])
  )
}
const primes = primesUpTo(10 ** 7)

const findLongestFamilies = (digitCount: number) => {
  const candidates = primes.filter(
    p => p > 10 ** (digitCount - 1) && p < 10 ** digitCount
  ) // e.g. 3 digits -> 100..999

  // console.time(`${digitCount}`)
  const patterns = new Set<string>()
  for (const p of candidates)
    for (const pattern of allPatterns(p)) patterns.add(pattern)
  // console.timeEnd(`${digitCount}`)
  // console.log(patterns.size)

  // generate prime digit replacement families & record their length
  const families = [] as Family[]
  let maxLength = 0
  for (const pattern of patterns) {
    const f = primeDigitReplacements(pattern)
    const length = f.length
    if (length >= maxLength) {
      maxLength = length
      families.push({ pattern, length })
    }
  }

  return families.filter(f => f.length === maxLength)
}
{
  // const testLength = (digitCount: number, expectedLength: number) => {
  //   const label = `${digitCount} digits`
  //   console.time(label)
  //   expect(findLongestFamilies(digitCount)[0].length).toEqual(expectedLength)
  //   console.timeEnd(label)
  // }
  // testLength(3, 6)
  // testLength(4, 6)
  // testLength(5, 7)
  // testLength(6, 8)
}

const findSmallestFamilyMember = (families: Family[]) => {
  return families
    .map(f => primeDigitReplacements(f.pattern))
    .flat()
    .sort()[0]
}

expect(findSmallestFamilyMember(findLongestFamilies(3))).toBe(107)

// SLOW: ~3s
export const solution051 = () => {
  let digitCount = 3
  let bestLength = 0
  let families: Family[] = []
  while (bestLength < 8 && digitCount < 7) {
    families = findLongestFamilies(digitCount)
    const length = families[0].length
    if (length > bestLength) bestLength = length
    digitCount++
  }
  return findSmallestFamilyMember(families)
}
