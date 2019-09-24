/**
 * Returns all possible combinations of a set of coin values that add up to a given total value.
 *
 * @param amount The total value that combinations of coins will add up to
 * @param coins The available coin values
 */
export const sumCombinations = (amount: number, coins: number[]): Counts[] =>
  // suppose the amount is $1.05 and I have quarters, dimes, nickels, and pennies (.25, .10, .05, .01)
  coins.reduce(
    (combinations, coin) => {
      // start by getting as close as possible to $1.37 using quarters: 5 quarters = $1.25
      let count = Math.floor(amount / coin)

      while (count > 0) {
        // record how many of this coin we're using
        const thisCoinCount = { [coin]: count } // we represent '5 quarters' as {'.25': 5}

        // are we still short?
        let remainder = amount - count * coin // in this example, we're short $0.12

        if (remainder > 0) {
          // yes - let's make that amount with smaller coins
          const smallerCoins = coins.filter(d => d < coin) // .10, .05, .01

          // now we have a problem with the same form as the original problem - how many ways can we
          // make $.12 with dimes, nickels and pennies?
          // This give us
          // {1 dime, 2 pennies}
          // {2 nickels, 2 pennies}
          // {1 nickel, 7 pennies}
          // ... etc.
          const remainderCombos = sumCombinations(remainder, smallerCoins)

          // now combine each of these combinations with our 5 quarters
          // This give us
          // {5 quarters, 1 dime, 2 pennies}
          // {5 quarters, 2 nickels, 2 pennies}
          // {5 quarters, 1 nickel, 7 pennies}
          // ... etc.
          const newCombos = remainderCombos.map(combo => ({
            ...thisCoinCount,
            ...combo,
          }))

          // add these to our final result
          combinations.push(...newCombos)
        } else {
          // no - I can make the exact amount using just this coin; record this combination and continue
          combinations.push(thisCoinCount)
        }

        // now use one less quarter and repeat
        count -= 1
      }
      return combinations
    },
    [] as Counts[]
  )

export interface Counts {
  [coinValue: number]: number
}
