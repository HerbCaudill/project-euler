import { isPrime } from 'lib/primes'
import { range } from 'lib/range'
//  Spiral primes
// =============
// Starting with 1 and spiralling anticlockwise in the following way, a
// square spiral with side length 7 is formed.
//
//                            37 36 35 34 33 32 31
//                            38 17 16 15 14 13 30
//                            39 18  5  4  3 12 29
//                            40 19  6  1  2 11 28
//                            41 20  7  8  9 10 27
//                            42 21 22 23 24 25 26
//                            43 44 45 46 47 48 49
//
// It is interesting to note that the odd squares lie along the bottom right
// diagonal, but what is more interesting is that 8 out of the 13 numbers
// lying along both diagonals are prime; that is, a ratio of 8/13 62%.
//
// If one complete new layer is wrapped around the spiral above, a square
// spiral with side length 9 will be formed. If this process is continued,
// what is the side length of the square spiral for which the ratio of primes
// along both diagonals first falls below 10%?

// ------------------

// Same reasoning (and code) from 028:
const isEven = (n: number) => n % 2 === 0

const outerDiagonals = (N: number) => {
  if (isEven(N)) throw new Error('N must be odd')
  if (N === 1) return [1]
  return [0, 1, 2, 3].map(d => N ** 2 - d * (N - 1)).sort()
}

const oddNumbersUpTo = (n: number) => range(0, n / 2).map(d => d * 2 + 1)

const spiralDiagonals = (N: number) => {
  if (isEven(N)) throw new Error('N must be odd')
  const allOuterDiagonals = oddNumbersUpTo(N).map(outerDiagonals)
  return allOuterDiagonals.flat()
}

expect(spiralDiagonals(5)).toEqual([1, 3, 5, 7, 9, 13, 17, 21, 25])

export const solution058 = () => {
  let i = 1
  let primes = 0
  let total = 1
  do {
    const diagonals = outerDiagonals((i += 2))
    primes += diagonals.filter(isPrime).length
    total += 4
  } while (primes / total >= 0.1)
  console.log({ primes, total, i, d: outerDiagonals(i) })
  return i
}
