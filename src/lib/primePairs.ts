import { isPrime } from 'lib/primes'
import { concat } from './concat'

const cache = {} as { [key: string]: boolean }

const getKey = (arr: number[]) => arr.join('_')

/** Tests whether a pair of numbers a & b concatenate both ways (a & b, b & a) to form prime
 * numbers. Doesn't test a or b for primality. */
export const isPrimePair = ([a, b]: number[]) => {
  const key = getKey([a, b])
  if (cache.hasOwnProperty(key)) return cache[key]
  const ab = concat(a, b)
  const ba = concat(b, a)
  cache[key] = isPrime(ab) && isPrime(ba)
  return cache[key]
}
