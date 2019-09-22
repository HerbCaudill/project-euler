import { range } from 'lib/range'
import { isPalindrome } from 'lib/palindrome'
import { sum } from 'lib/sum'

// Double-base palindromes
// =======================
// The decimal number, 585 = 1001001001[2] (binary), is palindromic in both
// bases.
//
// Find the sum of all numbers, less than one million, which are palindromic
// in base 10 and base 2.
//
// (Please note that the palindromic number, in either base, may not include
// leading zeros.)

const nums = range({ start: 1, stop: 10 ** 6 })

const isDoubleBasePalindrome = (n: number) =>
  isPalindrome(n) && isPalindrome(n.toString(2))

expect(isDoubleBasePalindrome(585)).toBe(true)
expect(isDoubleBasePalindrome(586)).toBe(false)

export const solution036 = () => sum(nums.filter(isDoubleBasePalindrome))
