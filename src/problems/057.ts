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

// add a whole number and a fraction
const add = (n: bigint, [num, den]: Fraction) =>
  [n * den + num, den] as Fraction

// invert a fraction
const invert = ([num, den]: Fraction) => [den, num] as Fraction

// returns an array of N fractions, each one a further iteration of the approximation of sqrt(2)
const precalcSqrt2 = (N: number) => {
  let f: Fraction = [1n, 2n]

  // In each iteration we add 2, invert the result, and then add 1
  const iterate = (result: Fraction[], i: number) => {
    if (i > 1) f = invert(add(2n, f)) // 1/(2+f)
    return result.concat([add(1n, f)]) // + 1,
  }

  const initialValue = [f]
  return range(N).reduce(iterate, initialValue)
}

expect(precalcSqrt2(8)).toEqual([
  [1n, 2n],
  [3n, 2n],
  [7n, 5n],
  [17n, 12n],
  [41n, 29n],
  [99n, 70n],
  [239n, 169n],
  [577n, 408n],
  [1393n, 985n],
])

const isTopHeavy = ([num, den]: Fraction) =>
  num.toString().length > den.toString().length

export const solution057 = () => precalcSqrt2(1000).filter(isTopHeavy).length
