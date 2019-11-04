import { isPrime as isPrime_MillerRabin } from './miller-rabin'
// export const knownPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// returns an array of primes lower than `max`
export const primesUpTo = (max = 100) => {
  let p = highestKnownPrime()
  while (p < max) {
    p = nextPrime(p)
    if (p > highestKnownPrime()) knownPrimes.push(p)
  }
  return knownPrimes.filter(p => p < max)
}

export const getPrimesFromSieve = (sieve: boolean[]) =>
  sieve.reduce(
    (primes, value, i) => {
      if (value) primes.push(i)
      return primes
    },
    [] as number[]
  )

// returns the next prime after `n`
export const nextPrime = (n: number): number => {
  // if it's in the range of the list, just look it up
  const nextKnown = knownPrimes.find(p => p > n) as number
  if (nextKnown !== undefined) return nextKnown

  // brute-force time
  let candidates = candidateGenerator(n)
  let candidate

  do candidate = candidates.next().value
  while (!isPrime(candidate))

  return candidate
}

export const nthPrime = (n: number): number => {
  let i = 1
  let p = 2 // 2 is the first prime
  while (i++ < n) p = nextPrime(p)
  return p
}

// uses the fact that every prime over 30 is in one of the forms
// 30k ± 1, 30k ± 7, 30k ± 11, 30k ± 13
// This allows us to eliminate more than half (11/15 = 73%) of the search space
export const candidateGenerator = function*(n: number) {
  const B = 30
  const D = [-13, -11, -7, -1, 1, 7, 11, 13]
  let i = 0
  let base = Math.trunc(n / B) * B
  while (true) {
    let candidate = base + D[i]
    if (candidate > n) yield candidate
    i += 1
    if (i >= D.length) {
      base += B
      i = 0
    }
  }
}

// returns true if a number is prime, false if it is composite
export const isPrime = (n: number) => {
  // negative numbers, zero, and one are not prime
  if (n <= 1) return false
  if (n < sieveMax) return sieve[n]
  return isPrime_MillerRabin(n)
}

export const eSieve = (max: number): boolean[] => {
  const isPrime = new Array(max).fill(true)
  isPrime[0] = isPrime[1] = false
  for (let i = 2; i < Math.sqrt(max); i++)
    // if i is prime, start at i² and mark every multiple of i from there as NOT a prime
    if (isPrime[i])
      for (let j = Math.pow(i, 2); j < max; j += i) isPrime[j] = false
  return isPrime
}

const sieveMax = 10 ** 7
const sieve = eSieve(sieveMax)
const knownPrimes = getPrimesFromSieve(sieve)
export const highestKnownPrime = () => knownPrimes[knownPrimes.length - 1]
