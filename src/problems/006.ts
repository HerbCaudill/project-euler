import { sum } from '../lib/sum'
import { range } from '../lib/range'

// Sum square difference
// =====================
// The sum of the squares of the first ten natural numbers is,
//                        1^2 + 2^2 + ... + 10^2 = 385
//
// The square of the sum of the first ten natural numbers is,
//                     (1 + 2 + ... + 10)^2 = 55^2 = 3025
//
// Hence the difference between the sum of the squares of the first ten
// natural numbers and the square of the sum is 3025 - 385 = 2640.
//
// Find the difference between the sum of the squares of the first one
// hundred natural numbers and the square of the sum.

const square = (n: number) => n ** 2
const nums = range({ start: 1, stop: 100 })

export const solution006 = () =>
  Math.abs(sum(nums.map(square)) - square(sum(nums)))
