import { range } from './range'
import { primes_1000 as knownPrimes } from './precomputed/primes_1000'
const highestKnownPrime = knownPrimes[knownPrimes.length - 1]

// returns an array of primes lower than `max`
export const primes = (max = 100) => {
  if (max < highestKnownPrime) return knownPrimes.filter(p => p < max)

  // TODO: change this to use a smarter algorithm

  if (max < 2) return []
  // start by assuming all numbers are prime
  const isPrimeMap = Array(Math.floor(max)).fill(true)

  // edge cases
  isPrimeMap[0] = false // 0 is not prime
  isPrimeMap[1] = false // 1 is not prime

  // returns all multiples of c smaller than `max`
  const getMultiples = (c: number) => {
    const coefficients = range({
      start: 2,
      stop: Math.floor(max / c),
    })
    return coefficients.map(coefficient => coefficient * c)
  }

  const counters = range({
    start: 2,
    stop: max / 2,
  })

  // seive of eratosthenes
  counters.forEach((c, _) => {
    if (isPrimeMap[c]) {
      // only get multiples of prime numbers
      getMultiples(c).forEach(multiple => {
        // record these not-prime values in our map
        isPrimeMap[multiple] = false
      })
    }
  })

  // collect all indices that are marked `true`
  return isPrimeMap.reduce(
    (result: number[], isPrime: boolean, index: number) =>
      result.concat(isPrime ? [index] : []),
    []
  )
}

// returns the next prime after `n`
export const nextPrime = (n: number) => {
  // if it's in the range of the list, just look it up
  if (n < highestKnownPrime) return knownPrimes.find(p => p > n)

  // brute-force it
  let candidate = Math.ceil(n / 2) * 2 + 1 // next odd number
  do {
    candidate = candidate + 2
  } while (!isPrime(candidate))
  return candidate
}

// returns true if a number is prime, false if it is composite
export const isPrime = (n: number) => {
  // if it's in the range of the list,
  // then it's only prime if it's on the list
  if (n <= highestKnownPrime) return knownPrimes.includes(n)

  // if it's divisible by a number on the list, it's not prime
  if (knownPrimes.some(p => n % p === 0)) return false
  // if it's not divisible by a number on the list and it's
  // smaller than the square of the largest known prime, then it's prime
  else if (Math.sqrt(n) < highestKnownPrime) return true

  // I see that you're going to make this difficult.
  let i = highestKnownPrime + 2
  do {
    if (n % i === 0) {
      return false
    }
    i = i + 2 // we know it's not divisible by an even number
  } while (i < n)
  // must be prime
  return true
}
