import { factorial } from 'lib/factorial'
import { range } from 'lib/range'
import { sum } from 'lib/sum'
import { digits } from '../lib/digits'

// Digit factorials
// ================
// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.
//
// Find the sum of all numbers which are equal to the sum of the factorial of
// their digits.
//
// Note: as 1! = 1 and 2! = 2 are not sums they are not included.

const factorials = range({ start: 0, stop: 9 }).map(d => Number(factorial(d)))
const lookupFactorial = (n: number) => factorials[n]

const factorialSum = (n: number) => sum(digits(n).map(lookupFactorial))
const isCurious = (n: number) => factorialSum(n) === n

expect(factorialSum(145)).toBe(145)
expect(isCurious(145)).toBe(true)

const start = 10 // not interested in single-digit numbers
const stop = lookupFactorial(9) * 7 // 9!7 is the upper limit, because 9!8 is also a 7-digit number

export const solution034 = () =>
  sum(range({ start, stop }).map(d => (isCurious(d) ? d : 0)))
