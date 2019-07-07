import { range } from './range'

export const reciprocalCycle = (n: number): string => {
  if (n < 2) throw new Error('n must be 2 or larger')

  let stack: any[] = []

  let remainder = 1

  while (true) {
    const dividend = 10 * remainder
    const quotient = Math.floor(dividend / n)
    remainder = dividend % n

    if (remainder === 0) return ''

    const cycleStart = stack.findIndex(
      d => d.remainder === remainder && d.dividend === dividend
    )

    if (cycleStart > -1)
      return stack
        .slice(cycleStart)
        .map(d => d.quotient)
        .join('')

    stack.push({ quotient, dividend, remainder })
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
