import { range, sum, properDivisors } from '.'

export const divisorSum = (n: number): number => sum(properDivisors(n))

export const areAmicable = (a: number, b: number) =>
  a >= 2 &&
  b >= 2 && // smaller values of a and b don't have proper divisors
  divisorSum(a) === b &&
  divisorSum(b) === a

export const friend = (n: number): number | undefined => {
  if (n < 2) return undefined
  const maybeFriend = divisorSum(n)
  const isFriend = divisorSum(maybeFriend) === n && maybeFriend !== n
  return isFriend ? maybeFriend : undefined
}

// Returns all amicable numbers less than `max`
export const allAmicables = (max: number): number[] =>
  range({ start: 0, stop: max }).reduce<number[]>((result, _, n) => {
    const n2 = friend(n)
    return n2 && n2 < n ? result.concat([n2, n]) : result
  }, [])
