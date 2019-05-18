import { highestKnownPrime, nextPrime, isPrime } from './primes'

export const factors = (n: number): number[] => {
  if (n <= 0)
    throw new RangeError(`Negative numbers have no prime factorization.`)
  if (n === 0) throw new RangeError(`Zero has no prime factorization.`)
  if (n === 1) throw new RangeError(`One has no prime factorization.`)

  if (isPrime(n)) return []

  // we now know n is composite, let's get to work
  let factor = 1
  do {
    if (factor < highestKnownPrime()) {
      // as long as we have precomputed prime numbers, just run through them
      factor = nextPrime(factor)
    } else {
      // at this point it's faster just to try all the odd numbers
      // than to make sure they're prime
      factor += 2 // factor is guaranteed to be odd, so factor + 2 is too
    }
  } while (n % factor != 0)

  const rest = n / factor

  return [factor].concat(isPrime(rest) ? rest : factors(rest))
}
