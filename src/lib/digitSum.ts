import { sum } from '.'

// returns the sum of the digits of the given number
export function digitSum(n: bigint) {
  return sum(
    n
      .toString()
      .split('')
      .map(d => +d)
  )
}

export const powerDigitSum = (a: number): number => digitSum(2n ** BigInt(a))
