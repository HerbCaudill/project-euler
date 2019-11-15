import { nDigitNumbers } from '../lib/nDigitNumbers'

// Permuted multiples
// ==================
// It can be seen that the number, 125874, and its double, 251748, contain
// exactly the same digits, but in a different order.
//
// Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x,
// contain the same digits.

type arrFilter = <T>(nums: T[]) => boolean

const toDigits = (n: number | string) => n.toString().split('')
const join = (arr: string[]) => +arr.join('')
const repeatedIn = <T>(a: T[]) => (i: T) => a.filter(j => j == i).length > 1
const noRepeatedElements: arrFilter = nums => !nums.some(repeatedIn(nums))

const isPermutation = (n1: number | string) => (n2: number | string) => {
  const d1 = toDigits(n1).sort()
  const d2 = toDigits(n2).sort()
  return !d1.some((d, i) => d !== d2[i])
}

expect(isPermutation(1234)(4321)).toBe(true)
expect(isPermutation(4723)(3274)).toBe(true)

/**
 * These are candidates for the first number.
 * @param digitCount
 * @param maxMultiple
 */
function solutionsGenerator(digitCount: number, maxMultiple: number = 6) {
  const smallEnoughToMultiply = (n: number) =>
    n < (10 ** digitCount - 1) / maxMultiple

  let result = nDigitNumbers(digitCount)
    .filter(smallEnoughToMultiply)
    .map(toDigits)
    .filter(noRepeatedElements)
    .map(join)

  for (let k = 2; k <= maxMultiple; k++)
    result = result.filter(d => isPermutation(d * k)(d))

  return result
}

export const solution052 = () => {
  let digitCount = 6
  let solutions = [] as number[]
  while (solutions.length === 0 && digitCount < 10)
    solutions = solutionsGenerator(digitCount++)
  return solutions[0]
}
