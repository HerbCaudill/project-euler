import { isPalindrome } from '../lib/palindrome'
import { range } from '../lib/range'

// Problem 4
// =========
// A palindromic number reads the same both ways. The largest palindrome made
// from the product of two 2-digit numbers is 9009 = 91 * 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

const r = range({ start: 999, stop: 1, step: -1 })

export const solution004 = () =>
  Math.max(
    ...r.map(i =>
      r.reduce((max, j) => {
        const p = i * j
        return p > max && isPalindrome(p) ? p : max
      })
    )
  )
