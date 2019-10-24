import { range } from 'lib/range'
import { sum } from 'lib/sum'

// Number spiral diagonals
// =======================
// Starting with the number 1 and moving to the right in a clockwise
// direction a 5 by 5 spiral is formed as follows:
//
//                               21 22 23 24 25
//                               20  7  8  9 10
//                               19  6  1  2 11
//                               18  5  4  3 12
//                               17 16 15 14 13
//
// It can be verified that the sum of both diagonals is 101.
//
// What is the sum of both diagonals in a 1001 by 1001 spiral formed in the
// same way?

/*

Rather than try to construct the spiral, let's just look directly at the numbers on the diagonals:

    1    +0  1×1 spiral

    3    +2  
    5    +2 
    7    +2 
    9    +2  3×3 spiral

    13   +4  
    17   +4 
    21   +4 
    25   +4  5×5 spiral

    31   +6  
    37   +6 
    43   +6 
    49   +6 7×7 spiral      


Looks like a pretty straightforward pattern. 

      start with 1                              1
      increment by 2, 4 times (3x3 spiral)      3  5  7  9
      increment by 4, 4 times (5x5 spiral)      13 17 21 25
      increment by 6, 4 times (7x7 spiral)      31 37 43 49
      . . .
      increment by N-1, 4 times (NxN spiral)


Also, it looks like the upper-right diagonal of an NxN spiral is N²; so the outer diagonals of an
NxN spiral are 

      N² - 0(N - 1)
      N² - 1(N - 1)
      N² - 2(N - 1)
      N² - 3(N - 1)

*/

const isEven = (n: number) => n % 2 === 0
const outerDiagonals = (N: number) => {
  if (isEven(N)) throw new Error('N must be odd')
  if (N === 1) return [1]
  return [0, 1, 2, 3].map(d => N ** 2 - d * (N - 1)).sort()
}

expect(outerDiagonals(3)).toEqual([3, 5, 7, 9])
expect(outerDiagonals(5)).toEqual([13, 17, 21, 25])
expect(outerDiagonals(7)).toEqual([31, 37, 43, 49])

/*
Now that we have the outer diagonals for any given NxN spiral, we have all the diagonals.
*/

const oddNumbersThrough = (n: number) => range(0, n / 2).map(d => d * 2 + 1)

const spiralDiagonals = (N: any) => {
  if (isEven(N)) throw new Error('N must be odd')
  const allOuterDiagonals = oddNumbersThrough(N).map(outerDiagonals)
  return allOuterDiagonals.flat()
}

expect(spiralDiagonals(5)).toEqual([1, 3, 5, 7, 9, 13, 17, 21, 25])

export const solution028 = () => sum(spiralDiagonals(1001))
