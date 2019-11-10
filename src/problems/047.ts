import { factorMap } from 'lib/factorMaps'

// Distinct primes factors
// =======================
// The first two consecutive numbers to have two distinct prime factors are:
//
// 14 = 2 * 7
// 15 = 3 * 5
//
// The first three consecutive numbers to have three distinct prime factors
// are:
//
// 644 = 2^2 * 7 * 23
// 645 = 3 * 5 * 43
// 646 = 2 * 17 * 19.
//
// Find the first four consecutive integers to have four distinct primes
// factors. What is the first of these numbers?

const hasNDistinctPrimeFactors = (n: number, count: number) =>
  Object.keys(factorMap(n)).length === count

expect(hasNDistinctPrimeFactors(13, 2)).toBe(false) // has 1: 13
expect(hasNDistinctPrimeFactors(14, 2)).toBe(true) // has 2: 2 * 7
expect(hasNDistinctPrimeFactors(15, 2)).toBe(true) // has 2: 3 * 5
expect(hasNDistinctPrimeFactors(16, 2)).toBe(false) // has 1: 4 * 4

const findConsecutiveNumbersWithPrimeFactors = (count: number): number => {
  let i = 2
  let firstNumber: number | undefined
  let consecutiveCount = 0
  while (true) {
    if (hasNDistinctPrimeFactors(i, count)) {
      if (firstNumber === undefined) firstNumber = i
      consecutiveCount += 1
      if (consecutiveCount === count) return firstNumber!
    } else {
      // reset count
      consecutiveCount = 0
      firstNumber = undefined
    }
    i += 1
  }
}

expect(findConsecutiveNumbersWithPrimeFactors(2)).toEqual(14)
expect(findConsecutiveNumbersWithPrimeFactors(3)).toEqual(644)

export const solution047 = () => findConsecutiveNumbersWithPrimeFactors(4)
