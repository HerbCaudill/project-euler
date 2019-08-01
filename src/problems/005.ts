import { leastCommonMultiple } from '../lib/least-common-multiple'
import { range } from '../lib/range'

// Smallest multiple
// =================
// 2520 is the smallest number that can be divided by each of the numbers
// from 1 to 10 without any remainder.
//
// What is the smallest number that is evenly divisible by all of the numbers
// from 1 to 20?

const nums = range({ start: 2, stop: 20 })

export const solution005 = () => leastCommonMultiple(nums)
