import { primes_10000 } from './precomputed/primes_10000'

export const knownPrimes = primes_10000
export let highestKnownPrime = knownPrimes[knownPrimes.length - 1]

// returns an array of primes lower than `max`
export const primes = (max = 100) => {
  if (max < highestKnownPrime) return knownPrimes.filter(p => p < max)
  while (highestKnownPrime < max) {
    highestKnownPrime = nextPrime(highestKnownPrime)
    knownPrimes.push(highestKnownPrime)
  }
  return knownPrimes.filter(p => p < max)
}

// returns the next prime after `n`
export const nextPrime = (n: number): number => {
  // if it's in the range of the list, just look it up
  if (n < highestKnownPrime) return knownPrimes.find(p => p > n) as number

  // brute-force it
  let candidate = Math.ceil(n / 2) * 2 + 1 // next odd number
  while (!isPrime(candidate)) {
    candidate = candidate + 2
  }
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
  // We're just going to try every odd number from here on
  let i = highestKnownPrime + 2
  do {
    if (n % i === 0) return false
    i = i + 2 // we know it's not divisible by an even number
  } while (i < n)
  // must be prime
  return true
}
