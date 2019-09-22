import { isPrime, nextPrime } from 'lib/primes'

// Circular primes
// ===============
// The number, 197, is called a circular prime because all rotations of the
// digits: 197, 971, and 719, are themselves prime.
//
// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37,
// 71, 73, 79, and 97.
//
// How many circular primes are there below one million?

const rotations = (n: number) => {
  const result = []
  const multiplier = 10 ** Math.trunc(Math.log10(n)) // e.g. 100 for a 3-digit number
  let rotation = n
  do {
    result.push(rotation)
    rotation = (rotation % 10) * multiplier + Math.trunc(rotation / 10)
  } while (rotation != n)
  return result
}

expect(rotations(197)).toEqual([197, 719, 971])
expect(rotations(2)).toEqual([2])
expect(rotations(71)).toEqual([71, 17])

// checks for digits that are 5 or even
const divisibleDigits = [0, 2, 4, 5, 6, 8]
const hasDivisibleDigits = (n: number) => {
  if (n < 10) return false
  do {
    if (divisibleDigits.includes(n % 10)) return true
    n = Math.trunc(n / 10)
  } while (n > 0)
  return false
}

expect(hasDivisibleDigits(10007)).toBe(true)
expect(hasDivisibleDigits(151)).toBe(true)
expect(hasDivisibleDigits(179)).toBe(false)

const isCircularPrime = (n: number) =>
  !hasDivisibleDigits(n) && !rotations(n).some(r => !isPrime(r))

expect(isCircularPrime(197)).toBe(true)
expect(isCircularPrime(198)).toBe(false)
expect(isCircularPrime(2)).toBe(true)
expect(isCircularPrime(37)).toBe(true)
expect(isCircularPrime(10007)).toBe(false)

export const solution035 = () => {
  let p = 2
  let count = 0
  while (p < 1000000) {
    if (isCircularPrime(p)) count++
    p = nextPrime(p)
  }
  return count
}
