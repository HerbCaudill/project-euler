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

  do {
    candidate = candidates.next().value
  } while (!isPrime(candidate))

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

  const sqrt = Math.sqrt(n)

  // if it's divisible by a number on the list, it's not prime
  if (knownPrimes.some(p => n % p === 0)) return false
  // if it's not divisible by a number on the list and it's
  // smaller than the square of the largest known prime, then it's prime
  else if (sqrt < highestKnownPrime()) return true

  // Brute-force time
  let candidate = highestKnownPrime()
  let candidates = candidateGenerator(candidate)
  do {
    if (n % candidate === 0) return false
    candidate = candidates.next().value
  } while (candidate <= sqrt)

  // must be prime
  return true
}

export const eSieve = (max: number): boolean[] => {
  const isPrime = new Array(max).fill(true)
  isPrime[0] = isPrime[1] = false
  for (let i = 2; i < Math.sqrt(max); i++)
    // if i is prime, we can start at i² and mark every multiple of i from there as NOT a prime
    if (isPrime[i])
      for (let j = Math.pow(i, 2); j < max; j += i) isPrime[j] = false
  return isPrime
}

const sieveMax = 10 ** 7
const sieve = eSieve(sieveMax)
const knownPrimes = getPrimesFromSieve(sieve)
export const highestKnownPrime = () => knownPrimes[knownPrimes.length - 1]

// miller-rabin primality test
export const probablyPrime = (n: number, k: number) => {
  if (n === 2 || n === 3) return true
  if (n % 2 === 0 || n < 2) return false

  // Write (n - 1) as 2^s * d
  let s = 0
  let d = n - 1
  while (d % 2 === 0) {
    d /= 2
    ++s
  }

  WitnessLoop: do {
    // A base between 2 and n - 2
    var x = Math.pow(2 + Math.floor(Math.random() * (n - 3)), d) % n

    if (x === 1 || x === n - 1) continue

    for (var i = s - 1; i--; ) {
      x = (x * x) % n
      if (x === 1) return false
      if (x === n - 1) continue WitnessLoop
    }

    return false
  } while (--k)

  return true
}
