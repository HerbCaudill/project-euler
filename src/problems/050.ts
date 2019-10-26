import { eSieve, getPrimesFromSieve } from 'lib/primes'

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

const isPrime = eSieve(10 ** 6)
const p = getPrimesFromSieve(isPrime)

// lookup of cumulative sum of primes: each element `sums[i]` is the sum of all primes smaller
// or equal to `primes[i]`
const sums = [] as number[]
p.forEach((d, i) => sums.push(d + (i > 0 ? sums[i - 1] : 0)))

// now we can easily look up the sum of primes from p[i] to p[j]
const consecutivePrimeSum = (i: number, j: number) =>
  sums[j] - (i > 0 ? sums[i - 1] : 0)

expect(consecutivePrimeSum(2, 4)).toEqual(23)
expect(consecutivePrimeSum(0, 5)).toEqual(41)

const longestPrimeSumBelow = (max: number) => {
  // make a place to store info about the best solution we've found so far
  let best = { sum: 0, length: 0, i: 0, j: 0 }

  // start testing
  for (let i = 0; i < p.length; i++)
    // `j - i` is the length of each series.
    // no point in testing series that are shorter than our best
    for (let j = i + best.length; j < p.length; j++) {
      const sum = consecutivePrimeSum(i, j)

      // once we go past the max, the sums are only going to get better;
      // so there's no point in trying larger values of j
      if (sum > max) break

      const length = j - i
      if (length > best.length && isPrime[sum]) best = { sum, length, i, j }
    }

  const { sum, i, j } = best
  const series = p.slice(i, j + 1)
  return { sum, series }
}

expect(longestPrimeSumBelow(100)).toEqual({
  sum: 41,
  series: [2, 3, 5, 7, 11, 13],
})

const t1000 = longestPrimeSumBelow(1000)
expect(t1000.sum).toEqual(953)
expect(t1000.series.length).toEqual(21)

export const solution050 = () => longestPrimeSumBelow(10 ** 6).sum
