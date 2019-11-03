import { combinations } from 'lib/combinations'
import { primesUpTo } from 'lib/primes'
import { isPrime } from 'lib/miller-rabin'

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

const ascending = (a: number, b: number) => a - b

const arrayAscending = (a: number[], b: number[]) => {
  let i = 0
  while (a.length - i) {
    if (b[i] === undefined) return 1
    const result = a[i] - b[i]
    if (result !== 0) return result
    i++
  }
  return 0
}

const concat = (a: number, b: number) =>
  a * 10 ** Math.floor(Math.log10(b) + 1) + b

/** Tests whether a pair of numbers a & b concatenate both ways (a & b, b & a) to form prime
 * numbers. Doesn't test a or b for primality. */
const isPrimePair = ([a, b]: number[]) =>
  isPrime(concat(a, b)) && isPrime(concat(b, a))
{
  expect(isPrimePair([3, 7])).toBe(true)
  expect(isPrimePair([7, 109])).toBe(true)
  expect(isPrimePair([3, 109])).toBe(true)
  expect(isPrimePair([109, 673])).toBe(true)
  expect(isPrimePair([113, 673])).toBe(false)
}

const isntPrimePair = (p: number[]) => !isPrimePair(p)

const findPrimePairs = (max: number): number[][] => {
  const allPairs = combinations(primesUpTo(max), 2) as number[][]
  return allPairs.filter(isPrimePair)
}
{
  expect(findPrimePairs(30)).toEqual([
    [3, 7],
    [3, 11],
    [3, 17],
    [7, 19],
    [11, 23],
    [13, 19],
  ])
}

// const mergeAll = (...pairs: number[][]) =>
//   pairs.reduce(
//     (result, pair, i) => [...new Set(result.concat(pair))],
//     [] as number[]
//   )

const mergeSets = (set1: number[], set2: number[]): number[] =>
  [...new Set(set1.concat(set2))].sort(ascending)

const areOverlapping = (set1: number[], set2: number[]) =>
  mergeSets(set1, set2).length === set1.length + set2.length - 1

const areLinked = (set1: number[]) => (set2: number[]) =>
  areOverlapping(set1, set2) && isPrimePairSet(mergeSets(set1, set2))

const isPrimePairSet = (arr: number[]) => {
  const pairs = combinations(arr, 2) as number[][]
  return !pairs.some(isntPrimePair)
}

type LinkedSetMap = Map<number[], Set<number[]>>

const mergeOverlappingSets = (sets: number[][]) => {
  const links = new Map() as LinkedSetMap
  for (const pair of sets) {
    const linkedPairs = sets.filter(areLinked(pair))
    if (linkedPairs.length) links.set(pair, new Set(linkedPairs))
  }
  // create a deduplicated set of n+1 sized sets
  const result = new Set<string>()
  for (const [pair, linkedPairs] of links)
    for (const linkedPair of linkedPairs)
      result.add(JSON.stringify(mergeSets(pair, linkedPair)))
  return [...result]
    .map(s => JSON.parse(s).sort(ascending))
    .sort(arrayAscending)
}

/** Given an array of sets of numbers, maps each set to all other sets that combine with it to make a prime pair set  */
const findLinkedSets = (max: number) => {
  const pairs = findPrimePairs(max)
  return mergeOverlappingSets(pairs)
}

// const candidates = (max: number) =>
//   [...findLinkedSets(max).entries()].map(([pair, linkedPairs]) => [
//     pair,
//     ...linkedPairs,
//   ])

const setsOfThree = (max: number) => {
  const allSets = new Set<string>()
  for (const [pair, linkedPairs] of findLinkedSets(max))
    for (const linkedPair of linkedPairs)
      allSets.add(JSON.stringify(mergeSets(pair, linkedPair)))
  return [...allSets]
    .map(s => JSON.parse(s).sort(ascending))
    .sort(arrayAscending)
}

const findSets = (max: number, size: number) => {
  let sets = findPrimePairs(max)
  let i = 2
  while (i++ < size) sets = mergeOverlappingSets(sets)
  return sets
}

console.time('findSets')
const s = findSets(700, 3)
console.timeEnd('findSets')

console.log(s)

export const solution060 = () => {
  return -1
}
