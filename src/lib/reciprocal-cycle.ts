import { range } from './range'
import { deepEquals } from './deep-equals'

export const reciprocalCycle = (n: number): string => {
  if (n < 2) throw new Error('n must be 2 or larger')

  let stack: any[] = []
  const digits = digitGenerator(n)

  while (true) {
    const r = digits.next().value
    if (r.remainder === 0) return ''

    const cycleStart = stack.findIndex(d => deepEquals(d, r))

    if (cycleStart > -1)
      return stack
        .slice(cycleStart)
        .map(d => d.quotient)
        .join('')

    stack.push(r)
  }
}

const digitGenerator = function*(n: number) {
  let remainder = 1
  while (true) {
    const dividend = 10 * remainder
    const quotient = Math.floor(dividend / n)
    remainder = dividend % n
    yield { quotient, dividend, remainder }
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
