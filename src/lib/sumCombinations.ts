/**
 * Returns all possible combinations of a set of coin values that add up to a given total value.
 *
 * @param total The total value that combinations of coins will add up to
 * @param coins The available coin values
 */
export const sumCombinations = (total: number, coins: number[]): Counts[] => {
  coins.sort(descending)
  const result: Counts[] = []
  return coins.reduce((result, coin, i) => {
    let quotient = Math.floor(total / coin)
    while (quotient > 0) {
      let remainder = total - quotient * coin
      const thisCoinCount = { [coin]: quotient }
      const smallerCoins = coins.filter(d => d < coin)
      const remainderCombinations =
        remainder > 0 ? sumCombinations(remainder, smallerCoins) : [{}]
      remainderCombinations.forEach(combination =>
        result.push({ ...thisCoinCount, ...combination })
      )
      quotient -= 1
      remainder -= coin
    }
    return result
  }, result)
}

export interface Counts {
  [coinValue: number]: number
}

const descending = (a: number, b: number) => b - a
