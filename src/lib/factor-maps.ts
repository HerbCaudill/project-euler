import { primeFactors } from './prime-factors'

// A FactorMap expresses a number's factors by mapping its unique factors with the exponent for each.
export type FactorMap = {
  [f: number]: number
}

// Takes an array of factors, and summarizes as a FactorMap.
// Takes an array of factors, and summarizes as a FactorMap.
// Example:
// ```
// primeFactors(360) = [2,2,2,3,3,5]
// factorArrayToFactorMap([2,2,2,3,3,5]) = {2:3, 3:2, 5:1}
// ```
export const factorArrayToFactorMap = (f: number[]) =>
  f.reduce((FactorMap: FactorMap, f: number) => {
    FactorMap[f] = (FactorMap[f] || 0) + 1
    return FactorMap
  }, {})

// Returns the `FactorMap` for a single number
// factorMap(360) = {2:3, 3:2, 5:1}
export const factorMap = (n: number) => factorArrayToFactorMap(primeFactors(n))
