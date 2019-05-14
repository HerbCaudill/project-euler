import { range } from '../util/range'
import { sum } from '../util/sum'

// Problem 1
// =========

// If we list all the natural numbers below 10 that are multiples of 3 or 5,
// we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below 1000.

// TODO: deduplicate
console.log(range({ step: 3, stop: 10, start: 3 }))
const specialSum = (stop: number) =>
  sum(range({ step: 3, stop })) + sum(range({ step: 5, stop }))

export const answer = specialSum(1000)
