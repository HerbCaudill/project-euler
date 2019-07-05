import { RequireAtLeastOne } from './types'

export type FibonacciProps = RequireAtLeastOne<
  {
    arr?: number[]
    count: number
    max: number
  },
  'count' | 'max'
>

export const fibonacci = ({
  count = Infinity,
  max = Infinity,
  arr = [1, 1],
}: FibonacciProps): number[] => {
  const N = arr.length

  // add the last two numbers in the array
  const [a, b] = arr.slice(N - 2)
  const next = a + b

  const keepgoing = next < max && N < count
  return keepgoing ? fibonacci({ count, max, arr: arr.concat(next) }) : arr
}
