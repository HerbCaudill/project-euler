import { factorial } from 'lib/factorial'
import { range } from 'lib/range'
import { sum } from 'lib/sum'
import { digits } from '../lib/digits'

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
