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

type Pair = [number, number]

const concat = (a: number, b: number) =>
  a * 10 ** Math.floor(Math.log10(b) + 1) + b

/** Tests whether a pair of numbers a & b concatenate both ways (a & b, b & a) to form prime
 * numbers. Doesn't test a or b for primality. */
const isPrimePair = ([a, b]: Pair) =>
  isPrime(concat(a, b)) && isPrime(concat(b, a))
{
  expect(isPrimePair([3, 7])).toBe(true)
  expect(isPrimePair([7, 109])).toBe(true)
  expect(isPrimePair([3, 109])).toBe(true)
  expect(isPrimePair([109, 673])).toBe(true)
  expect(isPrimePair([113, 673])).toBe(false)
}

const isntPrimePair = (p: Pair) => !isPrimePair(p)

const findPrimePairs = (max: number): Pair[] => {
  const allPairs = combinations(primesUpTo(max), 2) as Pair[]
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

const mergeAll = (...pairs: Pair[]) =>
  pairs.reduce(
    (result, pair, i) => [...new Set(result.concat(pair))],
    [] as number[]
  )

const mergePairs = (pair1: Pair, pair2: Pair): number[] =>
  [...new Set(pair1.concat(pair2))] as Pair

const areOverlapping = (pair1: Pair, pair2: Pair) =>
  mergePairs(pair1, pair2).length === 3 // 2 means they're the same pair; 4 means there's no overlap

const isLinked = (pair1: Pair) => (pair2: Pair) =>
  areOverlapping(pair1, pair2) && isPrimePairSet(mergePairs(pair1, pair2))

const isPrimePairSet = (arr: number[]) => {
  const pairs = combinations(arr, 2) as Pair[]
  return !pairs.some(isntPrimePair)
}

type PairSets = Map<Pair, Set<Pair>>

/** Given an array of pairs of numbers, maps each pair to all pairs that combine to make a set  */
const findLinkedPairs = (max: number) => {
  const pairSets = new Map() as PairSets
  const pairs = findPrimePairs(max)
  for (const pair of pairs) {
    const linkedPairs = pairs.filter(isLinked(pair))
    if (linkedPairs.length) pairSets.set(pair, new Set(linkedPairs))
  }
  return pairSets
}

const lp = findLinkedPairs(700)
console.log('lp', lp)

export const solution060 = () => {
  return -1
}
