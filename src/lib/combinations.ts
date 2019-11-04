// returns all combinations of r items (without repeating) from `set`
export const combinations = <T>(set: T[], r: number = -1): T[][] => {
  // base cases
  if (set.length === 0 || r === 0 || r > set.length) return []
  if (set.length === 1) return [set]

  switch (r) {
    case -1:
      // return combinations for all values of r between [1..N]
      return set.reduce(
        (result, _, i) => combinations(set, i + 1).concat(result),
        [] as T[][]
      )

    case 1:
      // take 1 just returns an array of single-item sets, e.g.
      // combinations({1,2,3,4}, 1) -> [{1}, {2}, {3}, {4}]
      return set.map(d => [d])

    default:
      // take r out of n items
      let remaining = [...set]
      // for each item, return that item,
      // plus all combinations of (r - 1) items from the remaining items
      return set.flatMap(() => {
        let [first, ...rest] = remaining
        remaining = rest
        const restCombinations = combinations(rest, r - 1)
        return restCombinations.map(c => [first, ...c])
      })
  }
}
