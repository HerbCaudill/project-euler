import { combinations } from 'lib/combinations'
import { primesUpTo } from 'lib/primes'
import { isPrime } from 'lib/miller-rabin'
import { ascending, arrayAscending } from 'lib/sort'

// Prime pair sets
// ===============
// The primes 3, 7, 109, and 673, are quite remarkable. By taking any two
// primes and concatenating them in any order the result will always be
// prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The
// sum of these four primes, 792, represents the lowest sum for a set of four
// primes with this property.
//
// Find the lowest sum for a set of five primes for which any two primes
// concatenate to produce another prime.

// ---------------------------------------------------------------------------------------------------

const concat = (a: number, b: number) =>
  a * 10 ** Math.floor(Math.log10(b) + 1) + b

/** Tests whether a pair of numbers a & b concatenate both ways (a & b, b & a) to form prime
 * numbers. Doesn't test a or b for primality. */
const isPrimePair = ([a, b]: number[]) =>
  isPrime(concat(a, b)) && isPrime(concat(b, a))

expect(isPrimePair([3, 7])).toBe(true)
expect(isPrimePair([7, 109])).toBe(true)
expect(isPrimePair([3, 109])).toBe(true)
expect(isPrimePair([109, 673])).toBe(true)
expect(isPrimePair([113, 673])).toBe(false)

const isntPrimePair = (p: number[]) => !isPrimePair(p)

const merge = ([a, b]: [number[], number[]]) =>
  [...new Set(a.concat(b))].sort(ascending)

const isPrimePairSet = (arr: number[]) =>
  !combinations(arr, 2).some(isntPrimePair)

function distinct(sets: number[][]) {
  const stringify = (s: any) => JSON.stringify(s)
  const parse = (s: string) => JSON.parse(s)
  return [...new Set(sets.map(stringify))].map(parse)
}

const mergeOverlappingSets = (sets: number[][]) => {
  const len = sets[0].length
  const allCombinations = combinations(sets, 2) as [number[], number[]][]
  const overlappingCombinations = allCombinations
    .map(merge)
    .filter(arr => arr.length === len + 1) // only where two sets overlap by all but one
  const primeSets = overlappingCombinations.filter(isPrimePairSet)
  const distinctPrimeSets = distinct(primeSets)
  return distinctPrimeSets.sort(arrayAscending)
}

const findSets = (max: number, size: number) => {
  let sets = primesUpTo(max).map(p => [p])
  let i = 1
  while (i++ < size) {
    sets = mergeOverlappingSets(sets)
  }
  return sets
}

console.time('findSets')
const s = findSets(700, 4)
console.timeEnd('findSets')

expect(s[0]).toEqual([3, 7, 109, 673])
export const solution060 = () => {
  return -1
}
