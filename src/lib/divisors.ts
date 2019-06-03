import { primeFactors, combinations, product, factorMap } from '.'
import { sort, unique, allButLast } from './arrays';

export const divisors = (n: number): number[] => {
  if (n === 1) return [1]
  const uniqueFactors = primeFactors(n)
  const factorCombinations = combinations(uniqueFactors)
  const nonOneDivisors = factorCombinations.map(s => [...s]).map(product)
  const allDivisors = [1, n].concat(nonOneDivisors)
  return sort(unique(allDivisors))
}

export const properDivisors = (n: number): number[] => allButLast(divisors(n))

// If all we need is the *number* of divisors, we don't need to go to the
// trouble of finding the divisors themselves. We know that given a number N
// and its prime factorization
//   p₁ᵃ¹p₂ᵃ²p₃ᵃ³ ...
// the number of divisors is
//   (a₁+1)(a₂+1)(a₃+1) ...
// because a divisor can use each of the prime factors anywhere from 0 to a times.
export const divisorCount = (n: number): number => {
  if (n === 1) return 1
  const factors = factorMap(n) // {p₁: a₁, p₂: a₂, p₃: a₃, ...}
  const factorExponents = Object.values(factors) // [a₁, a₂, a₃]
  return product(factorExponents.map(a => a + 1)) // (a₁+1)(a₂+1)(a₃+1) ...
}


