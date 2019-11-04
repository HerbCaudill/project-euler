import { isPrime, nextPrime, primesUpTo } from 'lib/primes'
import { sum } from 'lib/sum'

// Truncatable primes
// ==================
// The number 3797 has an interesting property. Being prime itself, it is
// possible to continuously remove digits from left to right, and remain
// prime at each stage: 3797, 797, 97, and 7. Similarly we can work from
// right to left: 3797, 379, 37, and 3.
//
// Find the sum of the only eleven primes that are both truncatable from left
// to right and right to left.
//
// NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

const truncateLeft = (n: number) => +n.toString().slice(1)
const truncateRight = (n: number) => Math.trunc(n / 10)

const truncatable = ({ reverse = false } = {}) => (n: number) => {
  if (n <= 10) return false // 1-digit primes are not considered to be truncatable
  while (n > 0) {
    if (!isPrime(n)) return false
    n = reverse ? truncateRight(n) : truncateLeft(n)
  }
  return true
}

const ltrTruncatable = truncatable()

expect(ltrTruncatable(379)).toBe(false) // 379, 79, 9*
expect(ltrTruncatable(967)).toBe(true) // 967, 67, 7
expect(ltrTruncatable(3797)).toBe(true)

const rtlTruncatable = truncatable({ reverse: true })

expect(rtlTruncatable(379)).toBe(true) // 379, 37, 3
expect(rtlTruncatable(967)).toBe(false) // 967, 96*, 9*
expect(rtlTruncatable(3797)).toBe(true)

export const solution037 = () => {
  const knownPrimes = primesUpTo(10 ** 6).filter(p => p > 10)

  let p = 7 // smallest 1-digit prime
  const knownCount = 11 // given
  const result = []
  for (p of knownPrimes) {
    if (ltrTruncatable(p) && rtlTruncatable(p)) result.push(p)
    if (result.length === knownCount) break
  }
  return sum(result)
}
