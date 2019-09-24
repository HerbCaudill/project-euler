import { range } from '../lib/range'
import { merge } from '../lib/merge'
import { sum } from '../lib/sum'

// Problem 1
// =========
// If we list all the natural numbers below 10 that are multiples of 3 or 5,
// we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

const specialSum = (N: number) => {
  const stop = N - 1
  const multiples3 = range({ start: 0, step: 3, stop })
  const multiples5 = range({ start: 0, step: 5, stop })
  return sum(merge(multiples3, multiples5))
}

export const solution001 = () => specialSum(1000)
