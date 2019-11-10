import { FactorMap, factorMap } from './factorMaps'

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

  return multiplyFactors(mergeFactorMaps(n.map(factorMap)))
}
