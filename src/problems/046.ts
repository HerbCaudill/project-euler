import { Sequence } from 'lib/Sequence'
import { primesUpTo, isPrime } from 'lib/primes'

// Goldbach's other conjecture
// ===========================
// It was proposed by Christian Goldbach that every odd composite number can
// be written as the sum of a prime and twice a square.
//
// 9 = 7 + 2 * 1^2
// 15 = 7 + 2 * 2^2
// 21 = 3 + 2 * 3^2
// 25 = 7 + 2 * 3^2
// 27 = 19 + 2 * 2^2
// 33 = 31 + 2 * 1^2
//
// It turns out that the conjecture was false.
//
// What is the smallest odd composite that cannot be written as the sum of a
// prime and twice a square?

const doubleSquares = new Sequence(n => 2 * n ** 2)

expect(doubleSquares.includes(2)).toBe(true)
expect(doubleSquares.includes(18)).toBe(true)

/**
 * For an odd number `n`, tries to find a pair of numbers - a prime number `p` and an integer `x` - such
 * that `n = p + 2 * x^2`. If there is no such pair, returns `undefined`.
 * @param n
 */
const goldbach = (n: number): { p: number; x: number } | undefined => {
  if (n % 2 === 0) throw new Error(`\`n\` must be odd; ${n} is an even number`)
  for (const p of primesUpTo(n)) {
    const diff = n - p
    if (doubleSquares.includes(n - p)) {
      const x = Math.sqrt(diff / 2)
      return { p, x }
    }
  }
  return undefined
}

//examples
expect(goldbach(9)).toEqual({ p: 7, x: 1 })
expect(goldbach(15)).toEqual({ p: 7, x: 2 })
expect(goldbach(21)).toEqual({ p: 3, x: 3 })
expect(goldbach(25)).toEqual({ p: 7, x: 3 })
expect(goldbach(27)).toEqual({ p: 19, x: 2 })
expect(goldbach(33)).toEqual({ p: 31, x: 1 })

// invalid input
expect(() => goldbach(14)).toThrow()

export const solution046 = () => {
  let n = 9 // first composite odd number
  while (true) {
    if (!isPrime(n) && goldbach(n) === undefined) return n
    n += 2
  }
}
