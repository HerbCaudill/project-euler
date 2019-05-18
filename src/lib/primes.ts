export const knownPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
export const highestKnownPrime = () => knownPrimes[knownPrimes.length - 1]

// returns an array of primes lower than `max`
export const primes = (max = 100) => {
  let p = highestKnownPrime()
  while (p < max) {
    p = nextPrime(p)
    if (p > highestKnownPrime()) knownPrimes.push(p)
  }
  return knownPrimes.filter(p => p < max)
}

// returns the next prime after `n`
export const nextPrime = (n: number): number => {
  // if it's in the range of the list, just look it up
  if (n < highestKnownPrime()) return knownPrimes.find(p => p > n) as number

  // brute-force it
  let candidate = Math.ceil(n / 2) * 2 + 1 // next odd number
  while (!isPrime(candidate)) candidate += 2

  return candidate
}

export const nthPrime = (n: number): number => {
  let i = 1
  let p = 2 // 2 is the first prime
  while (i++ < n) {
    p = nextPrime(p)
    if (p > highestKnownPrime()) knownPrimes.push(p)
  }
  return p
}

// returns true if a number is prime, false if it is composite
export const isPrime = (n: number) => {
  // if it's in the range of the list,
  // then it's only prime if it's on the list
  if (n <= highestKnownPrime()) return knownPrimes.includes(n)

  // if it's divisible by a number on the list, it's not prime
  if (knownPrimes.some(p => n % p === 0)) return false
  // if it's not divisible by a number on the list and it's
  // smaller than the square of the largest known prime, then it's prime
  else if (Math.sqrt(n) < highestKnownPrime()) return true

  // I see that you're going to make this difficult.
  // We're just going to try every odd number from here on
  let i = highestKnownPrime()
  do {
    if (n % i === 0) return false
    i = i + 2 // we know it's not divisible by an even number
  } while (i <= Math.sqrt(n))

  // must be prime
  return true
}
