import { primes, isPrime } from 'lib/primes'
import { permutations } from 'lib/permutations'
import { digits } from 'lib/digits'
import { combinations } from 'lib/combinations'
import { noDuplicates as noDuplicateDigits } from 'lib/noDuplicates'

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

const areEvenlySpaced = (nums: number[]) => {
  if (nums.length < 3) return true
  nums = nums.sort(ascending)
  let prev: number | undefined
  const diff = nums[1] - nums[0]
  for (const n of nums) {
    if (prev && n - prev !== diff) {
      return false
    }
    prev = n
  }
  return true
}

expect(areEvenlySpaced([8, 11, 14, 17, 20])).toBe(true)
expect(areEvenlySpaced([8, 11, 14, 17, 12])).toBe(false)

// example
expect(areEvenlySpaced([1487, 4817, 8147])).toBe(true)

// order doesn't matter
expect(areEvenlySpaced([100, 95, 85, 90])).toBe(true)
expect(areEvenlySpaced([100, 95, 85, 91])).toBe(false)

const joinDigits = (arr: number[]) => Number(arr.join(''))

const digitPermutations = (n: number) => permutations(digits(n)).map(joinDigits)

type arrFilter = (nums: number[]) => boolean

const allPrime: arrFilter = nums => !nums.some(n => !isPrime(n))

const inRange = (n: number) => n >= 1000 && n <= 9999
const allInRange: arrFilter = nums => !nums.some(n => !inRange(n))

const repeatedIn = (a: any[]) => (i: any) => a.filter(j => j === i).length > 1
const noRepeatedElements: arrFilter = nums => !nums.some(repeatedIn(nums))

const notKnownSolution: arrFilter = nums => !nums.includes(1487)

export const solution049 = () => {
  const solution = primes(9999)
    .filter(p => p > 1000)
    .map(digitPermutations)
    .map(arr => combinations(arr, 3).map(arr => arr.sort(ascending)))
    .flat()
    .filter(allInRange)
    .filter(areEvenlySpaced)
    .filter(allPrime)
    .filter(noRepeatedElements)

  const uniqueArrays = (arr: number[][]) =>
    [...new Set(arr.map(d => JSON.stringify(d)))].map(s => JSON.parse(s))

  console.log(uniqueArrays(solution))

  return solution.filter(notKnownSolution)[0].join('')
}
