import {
  highestKnownPrime,
  nextPrime,
  isPrime,
  candidateGenerator,
} from './primes'

// Returns an array containing all prime factors of `n`.
// If `n` is prime, just returns `[n]`.
export const primeFactors = (n: number): number[] => {
  if (n <= 0)
    throw new RangeError(`Negative numbers have no prime factorization.`)
  if (n === 0) throw new RangeError(`Zero has no prime factorization.`)
  if (n === 1) throw new RangeError(`One has no prime factorization.`)

  if (isPrime(n)) return [n]

  // we now know n is composite, let's get to work
  let factor = 1
  let candidates = candidateGenerator(highestKnownPrime())

  do {
    if (factor < highestKnownPrime()) {
      // as long as we have pre-computed prime numbers, just run through them
      factor = nextPrime(factor)
    } else {
      // at this point it's faster just to try likely numbers
      // than to make sure they're prime
      factor = candidates.next().value
    }
  } while (n % factor != 0)

  const rest = n / factor

  return [factor].concat(primeFactors(rest))
}
