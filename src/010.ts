import { nextPrime } from './lib'

// Summation of primes
// ===================
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
//
// Find the sum of all the primes below two million.

const sumOfPrimesBelow = (max: number) => {
  let p = 2
  let result = 0
  while (p < max) {
    result += p
    p = nextPrime(p)
  }
  return result
}

export const solution010 = () => sumOfPrimesBelow(2 * 10 ** 6)
