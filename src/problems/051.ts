import { combinations } from 'lib/combinations'
import { allDigits } from 'lib/panDigital'
import { isPrime } from 'lib/primes'
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

const replaceDigits = (pattern: string) =>
  allDigits.map(d => pattern.replace(/\*/g, d.toString())).map(Number)

// prettier-ignore
expect(replaceDigits('*57')).toEqual([ 157, 257, 357, 457, 557, 657, 757, 857, 957, 57])
// prettier-ignore
expect(replaceDigits('1**')).toEqual([ 111, 122, 133, 144, 155, 166, 177, 188, 199, 100])

const primeDigitReplacements = (pattern: string) =>
  replaceDigits(pattern)
    .filter(isPrime)
    .sort()

expect(primeDigitReplacements('*57')).toEqual([157, 257, 457, 557, 757, 857])
// prettier-ignore
expect(primeDigitReplacements('56**3')).toEqual([56003, 56113, 56333, 56443, 56663, 56773, 56993])

const getPositionCombinations = memoize((length: number) => {
  const positions = range(0, length - 1)
  const notEntireString = (positions: number[]) => positions.length < length
  const result = combinations(positions).filter(notEntireString)
  console.log('getPositionCombinations', length, result)
  return result
})

const allReplacementPatterns = (n: number) => {
  const _n = n.toString().split('')
  const positionCombinations = getPositionCombinations(_n.length)
  const substituteStars = (pos: number[]) =>
    _n
      .map((d, i) => (pos.includes(i) ? '*' : d)) //
      .join('')
  return positionCombinations.map(substituteStars)
}

expect(allReplacementPatterns(157)).toEqual(
  expect.arrayContaining(['**7', '*5*', '1**', '*57', '1*7', '15*'])
)

const findLongestFamilies = (digitCount: number) => {
  const candidates = range(10 ** (digitCount - 1), 10 ** digitCount - 1) // e.g. 3 digits -> 100..999
  const seen = new Set<string>()
  const families: Family[] = candidates
    .map(n =>
      allReplacementPatterns(n)
        .filter(p => !seen.has(p))
        .map(pattern => {
          // don't revisit this pattern
          seen.add(pattern)
          // generate families only containing primes
          const family = primeDigitReplacements(pattern)
          const length = family.length
          return { pattern, length }
        })
    )
    .flat()
    .filter(f => f.length > 1)
  const findMax = (max: number, f: Family) => (f.length > max ? f.length : max)
  const maxLength = families.reduce(findMax, 0)
  return families.filter(f => f.length === maxLength)
}

for (const d of range(3, 6)) {
  const label = `${d} digits`
  console.time(label)
  console.log(findLongestFamilies(d)[0].length)
  console.timeEnd(label)
}

const findSmallestFamilyMember = (families: Family[]) => {
  return families
    .map(f => primeDigitReplacements(f.pattern))
    .flat()
    .sort()[0]
}

expect(findSmallestFamilyMember(findLongestFamilies(3))).toBe(107)

export const solution051 = () => {
  return -1
  let digitCount = 3
  let bestLength = 0
  let families: Family[] = []
  do {
    families = findLongestFamilies(digitCount)
    const length = families[0].length
    if (length > bestLength) bestLength = length
    console.log({ digitCount, bestLength })
    digitCount++
  } while (bestLength < 8 && digitCount < 7)
  return findSmallestFamilyMember(families)
}
