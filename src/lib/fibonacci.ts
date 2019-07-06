import { bigSum } from './sum'
import { RequireAtLeastOne } from './types'

export type FibonacciProps = RequireAtLeastOne<
  {
    arr?: (number | bigint)[]
    count: number
    max: number
  },
  'count' | 'max'
>

export const fibonacci = ({
  count = Infinity,
  max = Infinity,
  arr = [1n, 1n],
}: FibonacciProps): bigint[] => {
  const N = arr.length

  const bigArr = arr.map(BigInt)
  // add the last two numbers in the array
  const next = bigSum(bigArr.slice(N - 2)) as bigint

  if (Number(next) >= max || N >= count) return bigArr

  bigArr.push(next)

  return fibonacci({ count, max, arr: bigArr })
}
