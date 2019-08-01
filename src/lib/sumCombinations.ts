/**
 * Returns all possible combinations of a set of coin values that add up to a given total value.
 *
 * @param total The total value that combinations of coins will add up to
 * @param coinValues The available coin values
 */
export const sumCombinations = (
  total: number,
  coinValues: number[]
): CoinCounts[] => {
  coinValues.sort(descending)
  const result: CoinCounts[] = []
  return coinValues.reduce((result, coin, i) => {
    const quotient = Math.floor(total / coin)
    if (quotient > 0) {
      const remainder = total - quotient * coin

      if (remainder === 0) result.push({ [coin]: quotient })

      if (quotient > 1 || remainder > 0) {
        const newRemainder = remainder > 0 ? remainder : coin
        const newQuotient = remainder > 0 ? quotient : quotient - 1
        const smallerCoins = coinValues.filter(d => d < coin)
        const remainderCombos = sumCombinations(newRemainder, smallerCoins)
        remainderCombos.forEach(combo =>
          result.push({
            [coin]: newQuotient,
            ...combo,
          })
        )
      }
    }
    return result
  }, result)
}

export interface CoinCounts {
  [coinValue: number]: number
}

const descending = (a: number, b: number) => b - a
