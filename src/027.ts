import { isPrime } from './lib/primes'

// Quadratic primes
// ================
// Euler published the remarkable quadratic formula:
//
//                                n^2 + n + 41
//
// It turns out that the formula will produce 40 primes for the consecutive
// values n = 0 to 39. However, when n = 40, 40^2 + 40 + 41 = 40(40 + 1) + 41
// is divisible by 41, and certainly when n = 41, 41^2 + 41 + 41 is clearly
// divisible by 41.
//
// Using computers, the incredible formula  n^2 - 79n + 1601 was discovered,
// which produces 80 primes for the consecutive values n = 0 to 79. The
// product of the coefficients, 79 and 1601, is 126479.
//
// Considering quadratics of the form:
//
//   n^2 + an + b, where |a| < 1000 and |b| < 1000
//
//                               where |n| is the modulus/absolute value of n
//                                                e.g. |11| = 11 and |-4| = 4
//
// Find the product of the coefficients, a and b, for the quadratic
// expression that produces the maximum number of primes for consecutive
// values of n, starting with n = 0.

const primeCount = (a: number, b: number): number => {
  let n = 0
  while (isPrime(n ** 2 + a * n + b)) n += 1
  return n
}

expect(primeCount(1, 41)).toEqual(40)
expect(primeCount(-79, 1601)).toEqual(80)

const highestPrime = (max: number) => {
  let highest = { count: 0, a: NaN, b: NaN }
  for (let a = -max; a <= max; a++) {
    for (let b = -max; b <= max; b++) {
      const count = primeCount(a, b)
      if (count > highest.count) highest = { a, b, count }
    }
  }
  return highest
}

expect(highestPrime(42)).toEqual({
  a: -1,
  b: 41,
  count: 41,
})

export const solution027 = () => {
  const h = highestPrime(1000)
  return h.a * h.b
}