import { range, sum, properDivisors } from '.'

export const aliquotSum = (n: number): number => sum(properDivisors(n))

export enum AliquotType {
  Deficient = 'deficient',
  Perfect = 'perfect',
  Abundant = 'abundant',
}

export const aliquotSumType = (n: number): AliquotType => {
  const sum = aliquotSum(n)
  if (sum < n) return AliquotType.Deficient
  if (sum > n) return AliquotType.Abundant
  return AliquotType.Perfect
}

// amicables

export const areAmicable = (a: number, b: number) =>
  a >= 2 &&
  b >= 2 && // smaller values of a and b don't have proper divisors
  aliquotSum(a) === b &&
  aliquotSum(b) === a

export const friend = (n: number): number | undefined => {
  if (n < 2) return undefined
  const maybeFriend = aliquotSum(n)
  const isFriend = aliquotSum(maybeFriend) === n && maybeFriend !== n
  return isFriend ? maybeFriend : undefined
}

// Returns all amicable numbers less than `max`
export const allAmicables = (max: number): number[] =>
  range({ start: 0, stop: max }).reduce<number[]>((result, _, n) => {
    const n2 = friend(n)
    return n2 && n2 < n ? result.concat([n2, n]) : result
  }, [])
