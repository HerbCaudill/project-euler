import { primesUpTo, nthPrime, isPrime } from 'lib/primes'
import { sum } from 'lib/sum'

// Consecutive prime sum
// =====================
// The prime 41, can be written as the sum of six consecutive primes:
//
//                        41 = 2 + 3 + 5 + 7 + 11 + 13
//
// This is the longest sum of consecutive primes that adds to a prime below
// one-hundred.
//
// The longest sum of consecutive primes below one-thousand that adds to a
// prime, contains 21 terms, and is equal to 953.
//
// Which prime, below one-million, can be written as the sum of the most
// consecutive primes?

type NumberMap = {
  [key: number]: boolean
}

const longestPrimeSumBelow = (max: number) => {
  const primes = primesUpTo(max)

  // lookup of cumulative sum of primes: each element `sums[i]` is the sum of all primes smaller
  // or equal to `primes[i]`
  const sums = primesUpTo(max + 1).reduce(
    (result, d, i) => [...result, d + (i > 0 ? result[i - 1] : 0)],
    [] as number[]
  )

  const consecutivePrimeSum = (start: number, stop: number) =>
    sums[stop] - (start > 0 ? sums[start - 1] : 0)

  let best = { sum: 0, length: 0, i: 0, j: 0 }
  for (let i = 0; i < primes.length; i++)
    for (let j = i + best.length; j < primes.length + 1; j++) {
      const length = j - i
      if (length > best.length) {
        const sum = consecutivePrimeSum(i, j)
        if (sum < max && primes.includes(sum)) best = { sum, length, i, j }
      }
    }
  const { sum, i, j } = best
  const series = primes.slice(i, j + 1)
  return { sum, series }
}

expect(longestPrimeSumBelow(100)).toEqual({
  sum: 41,
  series: [2, 3, 5, 7, 11, 13],
})

const t1000 = longestPrimeSumBelow(1000)
expect(t1000.sum).toEqual(953)
expect(t1000.series.length).toEqual(21)

export const solution050 = () => {
  console.time('million')
  const result = longestPrimeSumBelow(1000000).sum
  console.timeEnd('million')
  return result
}
