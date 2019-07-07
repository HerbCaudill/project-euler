import { range } from './lib/range'

// Reciprocal cycles
// =================
// A unit fraction contains 1 in the numerator. The decimal representation of
// the unit fractions with denominators 2 to 10 are given:
//
//    1/2  =  0.5
//    1/3  =  0.(3)
//    1/4  =  0.25
//    1/5  =  0.2
//    1/6  =  0.1(6)
//    1/7  =  0.(142857)
//    1/8  =  0.125
//    1/9  =  0.(1)
//   1/10  =  0.1
//
// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can
// be seen that ^1/[7] has a 6-digit recurring cycle.
//
// Find the value of d < 1000 for which ^1/[d] contains the longest recurring
// cycle in its decimal fraction part.

/* 
1/51 = 0.(0196078431372549) period 16

d: 0
div: 100
q: 1
r: 49

d: 01
div: 490
q: 9
r: 31

d: 019
div: 310
q: 6
r: 4

d: 01960
div: 400
q: 7
r: 43




 */
const cycle = (n: number): string => {
  if (n < 2) throw new Error('n must be 2 or larger')
  let digits: number[] = []
  let remainders: number[] = []
  let dividends: number[] = []
  let prevRemainder = 1
  do {
    let dividend = 10 * prevRemainder
    while (dividend < n) {
      dividend = 10 * dividend
      digits.push(0)
    }

    const quotient = Math.floor(dividend / n)
    const remainder = dividend % n

    if (remainder === 0) return ''

    const pos = remainders.findIndex(
      (d, i) => d === remainder && digits[i] === quotient
    )

    // console.log({ n, dividend, remainder, quotient, pos, remainders, digits })
    if (pos > -1) {
      // found a cycle
      return digits.slice(pos).join('')
    }
    digits.push(quotient)

    prevRemainder = remainder
    dividends.push(dividend)
    remainders.push(remainder)
  } while (true)
}

expect(cycle(2)).toEqual('')
expect(cycle(3)).toEqual('3')
expect(cycle(4)).toEqual('')
expect(cycle(6)).toEqual('6')
expect(cycle(7)).toEqual('142857')

const largestCycleUnderX = (X: number) => {
  let maxLength = 0
  let maxN = null
  range({ start: 2, stop: X }).forEach(n => {
    const length = cycle(n).length
    if (length > maxLength) {
      maxLength = length
      maxN = n
    }
  })
  return maxN
}

// range({ start: 2, stop: 100 }).forEach(n => {
//   const c = cycle(n)
//   if (c.length > 3) console.log(n, c.join(''))
// })

expect(largestCycleUnderX(10)).toBe(7)

export const solution026 = () => -1 //largestCycleUnderX(1000)
