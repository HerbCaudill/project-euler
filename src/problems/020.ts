import { factorial } from '../lib/factorial'
import { digitSum } from '../lib/digit-sum'

// Factorial digit sum
// ===================
// n! means n * (n - 1) * ... * 3 * 2 * 1
//
// Find the sum of the digits in the number 100!

export const solution020 = () => digitSum(factorial(100))
