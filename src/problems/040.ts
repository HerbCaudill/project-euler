import { range } from 'lib/range'

// Champernowne's constant
// =======================
// An irrational decimal fraction is created by concatenating the positive
// integers:
//
//                   0.123456789101112131415161718192021...
//                                ^
//
// It can be seen that the 12th digit of the fractional part is 1.
//
// If d[n] represents the n-th digit of the fractional part, find the value
// of the following expression.
//
//     d[1] * d[10] * d[100] * d[1000] * d[10000] * d[100000] * d[1000000]

const champernowne = (k: number) =>
  range({ start: 1, stop: k }).reduce(
    (result, d) => result.concat(d.toString()),
    ''
  )

expect(champernowne(21)).toEqual('123456789101112131415161718192021')

const num = champernowne(1000000) // should be enough
const d = (i: number) => +num[i - 1]

expect(d(12)).toEqual(1)

export const solution040 = () => {
  return d(1) * d(10) * d(100) * d(1000) * d(10000) * d(100000) * d(1000000)
}
