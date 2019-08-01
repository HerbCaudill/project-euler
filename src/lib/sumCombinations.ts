/**
 * Returns all possible combinations of a set of coin values that add up to a given total.
 *
 * @param total The number that combinations will add up to
 * @param coins The available coin values
 */
export const sumCombinations = (total: number, coins: number[]): number[][] => {
  return coins.reduce(
    (previous, current, i) => {
      if (total % current === 0) {
        const count = total / current
        previous.push(Array(count).fill(current))
      }
      return previous
    },
    [] as number[][]
  )
}
