import { flatten } from './flatten'

export const combinations = (s: Set<any>, r: number = -1): Set<any>[] => {
  // work with a copy in array form
  const arr = [...s]

  // edge cases
  if (arr.length === 0 || r === 0 || r > arr.length) return []
  if (arr.length === 1) return [new Set(arr)]

  switch (r) {
    case -1:
      // return combinations for all values of r
      return arr.reduce((result, _, rr) => {
        return combinations(s, rr + 1).concat(result)
      }, [])
    case 1:
      // take 1 just returns an array of single-item sets, e.g.
      // combinations({1,2,3,4}, 1) -> [{1}, {2}, {3}, {4}]
      return arr.map(d => new Set([d]))
    default:
      // take r out of n items
      const subset = new Set(arr)
      return flatten(
        // for each item, return all combinations of r-1 from N for the remaining items,
        // plus that item
        arr.map(d => {
          subset.delete(d)
          const subCombinations = combinations(subset, r - 1)
          return subCombinations.map(sc => new Set([d, ...sc]))
        })
      )
  }
}
