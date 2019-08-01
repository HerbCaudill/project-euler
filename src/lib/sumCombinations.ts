/**
 * Returns all combinations of a set of numbers that add up to a given total.
 * @param total The number that combinations will add up to
 * @param numbers The numbers being added up
 */
export const sumCombinations = (
  total: number,
  numbers: number[]
): number[][] => {
  return numbers.reduce(
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
