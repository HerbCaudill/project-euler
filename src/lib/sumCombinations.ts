/**
 * Returns all possible combinations of a set of coin values that add up to a given total value.
 *
 * @param total The total value that combinations will add up to
 * @param coinValues The available coin values
 */
export const sumCombinations = (
  total: number,
  coinValues: number[]
): CoinCounts[] => {
  //
  const descending = (a: number, b: number) => b - a
  coinValues.sort(descending)
  return coinValues.reduce(
    (result, coin, i) => {
      const quotient = Math.floor(total / coin)
      if (quotient > 0) {
        const remainder = total - quotient * coin
        const allThisCoin = { [coin]: quotient }
        const remainingCoins = coinValues.filter(d => d !== coin)
        if (remainder > 0) {
          const remainderCombos = sumCombinations(remainder, remainingCoins)
          remainderCombos.forEach(combo =>
            result.push({ ...allThisCoin, ...combo })
          )
        } else {
          result.push(allThisCoin)
          if (quotient > 1) {
            const remainderCombos = sumCombinations(coin, remainingCoins)
            const allThisCoinMinusOne = { [coin]: quotient - 1 }
            remainderCombos.forEach(combo => {
              result.push({ ...allThisCoinMinusOne, ...combo })
            })
          }
        }
      }
      return result
    },
    [] as CoinCounts[]
  )
}

export interface CoinCounts {
  [coinValue: number]: number
}
