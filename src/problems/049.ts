import { combinations } from 'lib/combinations'
import { digits } from 'lib/digits'
import { permutations } from 'lib/permutations'
import { isPrime, primesUpTo } from 'lib/primes'
import { areEvenlySpaced } from '../lib/areEvenlySpaced'

// Prime permutations
// ==================
// The arithmetic sequence, 1487, 4817, 8147, in which each of the terms
// increases by 3330, is unusual in two ways: (i) each of the three terms are
// prime, and, (ii) each of the 4-digit numbers are permutations of one
// another.
//
// There are no arithmetic sequences made up of three 1-, 2-, or 3-digit
// primes, exhibiting this property, but there is one other 4-digit
// increasing sequence.
//
// What 12-digit number do you form by concatenating the three terms in this
// sequence?

const ascending = (a: number, b: number) => a - b

const joinDigits = (arr: number[]) => Number(arr.join(''))

const digitPermutations = (n: number) => permutations(digits(n)).map(joinDigits)

// array filters

type arrFilter = (nums: number[]) => boolean

const inRange = (n: number) => n >= 1000 && n <= 9999
const allInRange: arrFilter = nums => !nums.some(n => !inRange(n))

const repeatedIn = (a: any[]) => (i: any) => a.filter(j => j === i).length > 1
const noRepeatedElements: arrFilter = nums => !nums.some(repeatedIn(nums))

const notKnownSolution: arrFilter = nums => !nums.includes(1487)

// We'll end up with a lot of arrays that are the same. Since `Set` deduplicates based on identity,
// we serialize them before deduplicating, then deserialize the deduplicated set.
const distinctArrays = (arr: number[][]) => {
  const stringify = (arr: number[]) => JSON.stringify(arr)
  const parse = (s: string) => JSON.parse(s) as number[]
  return Array.from(new Set(arr.map(stringify))).map(parse)
}

export const solution049 = () => {
  // get all sets of 4-digit prime numbers that are permutations of each other
  const primePermutations = primesUpTo(9999)
    .map(digitPermutations)
    .map(arr => arr.filter(isPrime)) // only permutations that are prime themselves
    .map(arr => arr.filter(inRange)) // only 4-digit numbers
    .filter(arr => arr.length >= 3) // only sets of at least 3

  const distinctPrimePermutations = distinctArrays(primePermutations)

  const candidates = distinctPrimePermutations
    .map(arr => combinations(arr, 3).map(arr => arr.sort(ascending)))
    .flat()

  const distinctCandidates = distinctArrays(candidates)

  const solutions = distinctCandidates
    .filter(areEvenlySpaced)
    .filter(noRepeatedElements)

  const newSolutions = solutions.filter(notKnownSolution)
  return newSolutions[0].join('')
}
