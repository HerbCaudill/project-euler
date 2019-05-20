import { flatten } from './flatten'

export const combinations = (s: Set<any>, r: number = -1): Set<any>[] => {
  s = new Set(s)
  if (s.size === 0 || r === 0 || r > s.size) return []
  if (s.size === 1) return [s]

  if (r === -1) {
    return [
      ...[...s].reduce((result, _, i) => {
        return new Set(combinations(s, i + 1).concat([...result]))
      }, new Set()),
    ]
  } else {
    if (r === 1) {
      // take 1 just returns an array of single-item sets, e.g.
      // combinations({1,2,3,4}, 1) -> [{1}, {2}, {3}, {4}]
      return [...s].map(d => new Set([d]))
    } else {
      // take r out of n items
      const copy = new Set(s)
      return flatten(
        [...s].map(d => {
          copy.delete(d)
          let subCombinations = combinations(copy, r - 1).map(sc => {
            sc.add(d)
            return sc
          })
          return subCombinations
        })
      )
    }
  }
}
