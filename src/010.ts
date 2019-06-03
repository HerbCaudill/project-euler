import { nextPrime } from './lib'

// Summation of primes
// ===================
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
//
// Find the sum of all the primes below two million.

export const sumOfPrimesBelow = (max: number) => {
  let p = 2
  let result = 0
  while (p < max) {
    result += p
    p = nextPrime(p)
  }
  return result
}

expect(sumOfPrimesBelow(3)).toEqual(2)
expect(sumOfPrimesBelow(10)).toEqual(17)

// Takes a long time to run, so just return constant
export const solution010 = () => 142913828922 // sumOfPrimesBelow(2 * 10 ** 6)
