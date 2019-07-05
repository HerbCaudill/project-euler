import { fastIncludes } from './fast-includes'

/**
 * Finds the first two numbers from `arr` that add up to `n`. For example, this might be used to see
 * if a number is the sum of two primes, or of two abundant numbers.
 * @param n
 * @param arr
 */
export const findSum = (n: number, arr: number[]): number[] | undefined => {
  const half = n / 2
  const includes = fastIncludes(arr)
  const a = arr.find(a => a <= half && includes(n - a))
  return a ? [a, n - a] : undefined
}
