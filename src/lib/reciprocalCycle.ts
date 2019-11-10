import { range } from './range'
import { deepEquals } from './deepEquals'

export const reciprocalCycle = (n: number) => {
  if (n < 2) throw new Error('n must be 2 or larger')

  let history: any[] = []
  const digits = reciprocalDigitGenerator(n)

  for (const r of digits) {
    const cycleStart = history.findIndex(d => deepEquals(d, r))

    if (cycleStart > -1)
      return history
        .slice(cycleStart)
        .map(d => d.quotient)
        .join('')

    history.push(r)
  }

  return ''
}

const reciprocalDigitGenerator = function*(n: number) {
  let remainder = 1
  while (true) {
    const dividend = 10 * remainder
    const quotient = Math.floor(dividend / n)
    remainder = dividend % n
    const r = { quotient, dividend, remainder }
    if (remainder === 0) return r
    else yield r
  }
}

export const largestReciprocalCycle = (max: number) => {
  let maxLength = 0
  let largest = null
  range({ start: 2, stop: max }).forEach(n => {
    const length = reciprocalCycle(n).length
    if (length > maxLength) {
      maxLength = length
      largest = n
    }
  })
  return largest
}
