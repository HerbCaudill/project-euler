import { range } from 'lib/range'

// Square root convergents
// =======================
// It is possible to show that the square root of two can be expressed as an
// infinite continued fraction.
//
//             √2 = 1 + 1/(2 + 1/(2 + 1/(2 + ... ))) = 1.414213...
//
// By expanding this for the first four iterations, we get:
//
// 1 + 1/2 = 3/2 = 1.5
// 1 + 1/(2 + 1/2) = 7/5 = 1.4
// 1 + 1/(2 + 1/(2 + 1/2)) = 17/12 = 1.41666...
// 1 + 1/(2 + 1/(2 + 1/(2 + 1/2))) = 41/29 = 1.41379...
//
// The next three expansions are 99/70, 239/169, and 577/408, but the eighth
// expansion, 1393/985, is the first example where the number of digits in
// the numerator exceeds the number of digits in the denominator.
//
// In the first one-thousand expansions, how many fractions contain a
// numerator with more digits than denominator?

type Fraction = [bigint, bigint]

const add = (n: bigint, [num, den]: Fraction) =>
  [n * den + num, den] as Fraction
const invert = ([num, den]: Fraction) => [den, num] as Fraction

const sqrt2 = (iterations: number) => {
  let f: Fraction = [1n, 2n]
  let i = 1
  while (i++ < iterations) f = invert(add(2n, f)) // 1 / (2 + 1/f)
  return add(1n, f) // 1 + ...
}

expect(sqrt2(1)).toEqual([3n, 2n])
expect(sqrt2(2)).toEqual([7n, 5n])
expect(sqrt2(8)).toEqual([1393n, 985n])

const isTopHeavy = ([num, den]: Fraction) =>
  num.toString().length > den.toString().length

export const solution057 = () =>
  range(1, 1000).filter(i => isTopHeavy(sqrt2(i))).length
