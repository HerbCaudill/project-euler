import { sum } from './sum'
import { digits } from './digits'

// returns the sum of the digits of the given number
export const digitSum = (n: bigint) => sum(digits(n))

export const powerDigitSum = (a: number): number => digitSum(2n ** BigInt(a))
