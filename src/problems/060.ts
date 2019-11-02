import { combinations } from 'lib/combinations'
import { isPrime, primesUpTo } from 'lib/primes'

// Prime pair sets
// ===============
// The primes 3, 7, 109, and 673, are quite remarkable. By taking any two
// primes and concatenating them in any order the result will always be
// prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The
// sum of these four primes, 792, represents the lowest sum for a set of four
// primes with this property.
//
// Find the lowest sum for a set of five primes for which any two primes
// concatenate to produce another prime.

// const concat = (a: number, b: number) => +`${a}${b}`
const concat = (a: number, b: number) =>
  a * 10 ** Math.floor(Math.log10(b) + 1) + b

const isPrimePairSet = (arr: number[]) => {
  const pairs = combinations(arr, 2)
  return !pairs.some(
    ([a, b]) => !isPrime(concat(a, b)) || !isPrime(concat(b, a))
  )
}

expect(isPrimePairSet([3, 7, 109, 673])).toBe(true)
expect(isPrimePairSet([3, 7, 109, 123])).toBe(false)

const solutions = (max: number, setSize: number = 5) =>
  combinations(primesUpTo(max), setSize).filter(isPrimePairSet)

console.log(solutions(674, 4))

export const solution060 = () => -1
