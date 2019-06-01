import { primeFactors, combinations, product } from '.'

export const divisors = (n: number): number[] => {
  if (n === 1) return [1]
  const uniqueFactors = primeFactors(n)
  const factorCombinations = combinations(uniqueFactors)
  const nonOneDivisors = factorCombinations.map(s => [...s]).map(product)
  const allDivisors = [1, n].concat(nonOneDivisors)
  return sort(unique(allDivisors))
}

const sort = (arr: number[]) => arr.sort((a, b) => a - b)
const unique = (arr: number[]) => Array.from(new Set(arr))
