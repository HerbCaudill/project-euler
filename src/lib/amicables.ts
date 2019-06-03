import { range, sum, properDivisors } from '.'

export const divisorSum = (n: number): number => sum(properDivisors(n))

export const areAmicable = (a: number, b: number) =>
  divisorSum(a) === b && divisorSum(b) === a

// For any given positive integer, returns a corresponding *smaller* amicable number if there is one
export const amicablePair = (n: number): number[] => {
  const friend = range({ start: 1, stop: n - 1 }).find(n2 => areAmicable(n, n2))
  return friend ? [friend, n] : []
}

// Returns all amicable numbers less than `max`
export const allAmicables = (max: number): number[] =>
  range({ start: 0, stop: max })
    .map(n => (n > 0 ? divisorSum(n) : -1))
    .reduce<number[]>((result, d, n, arr) => {
      const n2 = arr.findIndex((d2, n2) => d2 === n && d === n2 && n > n2)
      return n2 > 0 ? result.concat([n2, n]) : result
    }, [])
