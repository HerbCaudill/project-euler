import { range } from './range'
import { sum } from './sum'
import { properDivisors } from './divisors'

export const aliquotSum = (n: number): number => sum(properDivisors(n))

// perfect, deficient, abundant

export enum AliquotType {
  Deficient = 'deficient',
  Perfect = 'perfect',
  Abundant = 'abundant',
}

export const { Deficient, Perfect, Abundant } = AliquotType

export const aliquotSumType = (n: number): AliquotType => {
  const sum = aliquotSum(n)
  if (sum < n) return AliquotType.Deficient
  if (sum > n) return AliquotType.Abundant
  return AliquotType.Perfect
}

export const allAbundants = (
  start: number = 2,
  stop: number = 28123
): number[] =>
  range({ start, stop }).filter(n => aliquotSumType(n) === Abundant)

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
