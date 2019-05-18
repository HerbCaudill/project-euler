import { factors, isPrime } from '.'

// A FactorMap expresses a number's factors by mapping its unique factors with the exponent for each.
type FactorMap = {
  [f: number]: number
}

// Takes an array of numbers, and returns an array of arrays of factors.
// For prime numbers, returns an array just containing that number.
// Example:
// ```js
// getFactors([8, 12]) = [[2,2,2], [2,2,3]]
// getFactors([5, 14]) = [[5], [2,7]]
// ```
const getFactors = (n: number[]) => n.map(d => (isPrime(d) ? [d] : factors(d)))

// Takes an array of factors, and summarizes as a FactorMap.
// Example:
// ```
// factors(360) = [2,2,2,3,3,5]
// factorArrayToFactorMap([2,2,2,3,3,5]) = {2:3, 3:2, 5:1}
// ```
const factorArrayToFactorMap = (f: number[]) =>
  f.reduce((FactorMap: FactorMap, f: number) => {
    FactorMap[f] = (FactorMap[f] || 0) + 1
    return FactorMap
  }, {})

// Takes an array of numbers, and returns an array of `FactorMap` objects.
const getFactorMaps = (n: number[]) => getFactors(n).map(factorArrayToFactorMap)

// Takes an array of FactorMaps, and returns a single FactorMap
// that contains the *highest* exponent for each factor in all of the maps.
// Example:
// ```js
// mergeFactorMaps([
//   {2:3, 3:2, 5:1},
//   {2:2, 3:4},
// ]) = {2:3, 3:4, 5:1}
// ```
const mergeFactorMaps = (factorMaps: FactorMap[]) =>
  factorMaps.reduce((FactorMap: FactorMap, current: FactorMap) => {
    for (const key in current)
      FactorMap[key] = FactorMap[key]
        ? Math.max(current[key], FactorMap[key])
        : current[key]
    return FactorMap
  }, {})

// Multiplies all the factors in a FactorMap, each raised to the corresponding exponent.
// Example:
// ```js
// multiplyFactors({2:3, 3:2, 5:1}) = 2^3 * 3^2 * 5^1 = 360
// ```
const multiplyFactors = (factorMaps: FactorMap) =>
  Object.keys(factorMaps)
    .map(key => +key) // convert keys to numbers
    .reduce((result, key) => result * key ** factorMaps[key], 1)

export const leastCommonMultiple = (n: number[]) => {
  // edge cases
  if (n.length === 0) return 0
  if (n.length === 1) return n[0]

  return multiplyFactors(mergeFactorMaps(getFactorMaps(n)))
}
