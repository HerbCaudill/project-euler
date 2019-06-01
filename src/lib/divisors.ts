import { factors, combinations, product } from '.'

export const divisors = (n: number): number[] => {
  if (n === 1) return [1]
  const uniqueFactors = factors(n)
  const factorCombinations = combinations(uniqueFactors)
  const nonOneDivisors = factorCombinations.map(s => [...s]).map(product)
  const allDivisors = [1, n].concat(nonOneDivisors)
  return deduplicate(sortNumeric(allDivisors))
}

const sortNumeric = (arr: number[]) => arr.sort((a, b) => a - b)
const deduplicate = (arr: number[]) => Array.from(new Set(arr))
