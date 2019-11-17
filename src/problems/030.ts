import { sum } from '../lib/sum'
import { range } from '../lib/range'
import { digits } from '../lib/digits'

// Digit fifth powers
// ==================
// Surprisingly there are only three numbers that can be written as the sum
// of fourth powers of their digits:
//
//   1634 = 1^4 + 6^4 + 3^4 + 4^4
//   8208 = 8^4 + 2^4 + 0^4 + 8^4
//   9474 = 9^4 + 4^4 + 7^4 + 4^4
//
// As 1 = 1^4 is not a sum it is not included.
//
// The sum of these numbers is 1634 + 8208 + 9474 = 19316.
//
// Find the sum of all the numbers that can be written as the sum of fifth
// powers of their digits.

const sumOfPowers = (number: number, power: number) => {
  return sum(digits(number).map(d => d ** power))
}

expect(sumOfPowers(1634, 4)).toBe(1634)
expect(sumOfPowers(8208, 4)).toBe(8208)
expect(sumOfPowers(9474, 4)).toBe(9474)

export const solution030 = () =>
  /* ignore coverage */
  sum(range({ start: 2, stop: 999999 }).filter(d => sumOfPowers(d, 5) === d))
