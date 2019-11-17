import { range } from 'lib/range'
import { digitCount } from 'lib/digitCount'

// Powerful digit counts
// =====================
// The 5-digit number, 16807=7^5, is also a fifth power. Similarly, the
// 9-digit number, 134217728=8^9, is a ninth power.
//
// How many n-digit positive integers exist which are also an nth power?

export function solution063() {
  const powers = range(1, 100)
  const solutions = powers.flatMap(exp => {
    let base = 0
    let num = 0
    const result = []
    while (num < 10 ** exp) {
      num = (++base) ** exp
      if (digitCount(num) === exp) result.push(num)
    }
    return result
  })
  return solutions.length
}
