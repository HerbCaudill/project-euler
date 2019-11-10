import { primeFactors } from './primeFactors'

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
export const factorArrayToFactorMap = (f: number[]): FactorMap =>
  f.reduce((fm: FactorMap, f: number) => {
    fm[f] = (fm[f] || 0) + 1
    return fm
  }, {})

// Returns the `FactorMap` for a single number
// factorMap(360) = {2:3, 3:2, 5:1}
export const factorMap = (n: number) =>
  n === 1 ? { 1: 1 } : factorArrayToFactorMap(primeFactors(n))
