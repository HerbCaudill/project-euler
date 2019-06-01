import { factors, combinations, product } from '.'

export const divisors = (n: number): number[] => {
  if (n === 1) return [1]
  const uniqueFactors = factors(n)
  const factorCombinations = combinations(uniqueFactors)
  const nonOneDivisors = factorCombinations.map(s => [...s]).map(product)
  return [1].concat(nonOneDivisors)
}
