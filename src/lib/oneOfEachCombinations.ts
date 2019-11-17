/** Returns all possible combinations taking one item from each set in `sets`.*/
export const oneOfEachCombinations = <T>(sets: T[][]): T[][] => {
  const [first, ...rest] = sets

  return sets.length === 1
    ? first.map(d => [d])
    : first.map(d => oneOfEachCombinations(rest).map(c => [d].concat(c))).flat()
}
