import { range } from './range'

export const repeatingDecimals = (n: number): string => {
  if (n < 2) throw new Error('n must be 2 or larger')
  let digits: number[] = []
  let remainders: number[] = []
  let dividends: number[] = []
  let prevRemainder = 1
  let skips = 0
  do {
    let dividend = prevRemainder
    do {
      dividend = 10 * dividend

      const quotient = Math.floor(dividend / n)
      const remainder = dividend % n

      if (remainder === 0) return ''

      const pos = remainders.findIndex(
        (d, i) => d === remainder && dividends[i] === dividend
      )
      if (pos > -1) {
        // found a cycle
        return digits.slice(pos).join('')
      }
      digits.push(quotient)
      prevRemainder = remainder
      dividends.push(dividend)
      remainders.push(remainder)
    } while (dividend < n)
  } while (true)
}

export const largestCycleUnderX = (X: number) => {
  let maxLength = 0
  let maxN = null
  range({ start: 2, stop: X }).forEach(n => {
    const length = repeatingDecimals(n).length
    if (length > maxLength) {
      maxLength = length
      maxN = n
    }
  })
  return maxN
}

expect(largestCycleUnderX(10)).toBe(7)
