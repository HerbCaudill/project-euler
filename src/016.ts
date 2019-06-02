import { sum } from './lib'

// Power digit sum
// ===============
// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
//
// What is the sum of the digits of the number 2^1000?

const powerDigitSum = (a: number) => {
  const n = BigInt(2) ** BigInt(a)
  return sum(
    n
      .toString()
      .split('')
      .map(d => +d)
  )
}

expect(powerDigitSum(4)).toEqual(7)
expect(powerDigitSum(15)).toEqual(26)

export const solution016 = () => powerDigitSum(1000)
