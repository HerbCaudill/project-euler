import { range } from 'lib/range'
import { isEven } from 'lib/isEven'
import { isSquare } from 'lib/polygonalNumbers'

// Odd period square roots
// =======================
// All square roots are periodic when written as continued fractions and can
//  be written in the form:
//
//      √N = a[0] +            1
//                 -----------------------------
//                 a[1] +         1
//                        ---------------------
//                        a[2] +     1
//                               -------------
//                               a[3] + ...
//
//  For example, let us consider √23:
//
//      √23 =  4 + √23 - 4  =  4 +  1       = 4 +      1
//                                --------         ------------
//                                   1             1 + √23 - 3
//                                 -----               -------
//                                 √23-4                  7
//
//  If we continue we would get the following expansion:
//
//      √23 = 4 +          1
//               ----------------------
//               1 +        1
//                   -----------------
//                   3 +      1
//                       ------------
//                       1 +    1
//                           -------
//                           8 + ...
//
//  The process can be summarised as follows:
//
//       a[0] = 4,     1    =  √23+4    = 1 + √23-3
//                   -----     -----          -----
//                   √23-4       7              7
//
//       a[1] = 1,     7    =  7(√23+3)  = 3 + √23-3
//                   -----     --------        -----
//                   √23-3        14             2
//
//       a[2] = 3,     2    =  2(√23+3)  = 1 + √23-4
//                   -----     --------        -----
//                   √23-3        14             7
//
//       a[3] = 1,     7    =  7(√23+4)  = 8 + √23-4
//                   -----     --------
//                   √23-4        7
//
//       a[4] = 8,     1    =  √23+4    = 1 + √23-3
//                   -----     -----          -----
//                   √23-4       7              7
//
//       a[5] = 1,     7    =  7(√23+3)  = 3 + √23-3
//                   -----     --------        -----
//                   √23-3        14             2
//
//       a[6] = 3,     2    =  2(√23+3)  = 1 + √23-4
//                   -----     --------        -----
//                   √23-3        14             7
//
//       a[7] = 1,     7    =  7(√23+4)  = 8 + √23-4
//                   -----     --------
//                   √23-4        7
//
//  It can be seen that the sequence is repeating. For conciseness, we use the
//  notation √23 = [4;(1,3,1,8)], to indicate that the block (1,3,1,8) repeats
//  indefinitely.
//
//  The first ten continued fraction representations of (irrational) square
//  roots are:
//
//      √2  = [1;(2)]          period=1
//      √3  = [1;(1,2)]        period=2
//      √5  = [2;(4)]          period=1
//      √6  = [2;(2,4)]        period=2
//      √7  = [2;(1,1,1,4)]    period=4
//      √8  = [2;(1,4)]        period=2
//      √10 = [3;(6)]          period=1
//      √11 = [3;(3,6)]        period=2
//      √12 = [3;(2,6)]        period=2
//      √13 = [3;(1,1,1,1,6)]  period=5
//
//  Exactly four continued fractions, for N<=13, have an odd period.
//
//  How many continued fractions for N<=10000 have an odd period?
//

/**
 * Given an integer `N`, let `a` be the integer part of `√N`.
 *
 *     √N = a + √N - a
 *
 *        = a +    1
 *              -------
 *                 1
 *               -----
 *               √N-a
 *
 *        = a +    1
 *              -------
 *               √N+a
 *               ----
 *               N-a²
 *
 * ex.
 *
 *     √23 = 4 + √N - 4
 *
 *        = 4 +    1
 *              -------
 *                 1
 *               -----
 *               √23-4
 *
 *        = 4 +    1
 *              -------
 *               √23+4
 *               -----
 *                 7
 *
 * Now let `a₁` be the integer part of the denominator `(√N+a)/(N-a²)`.
 *
 *     √N = a +    1
 *              ----------------
 *               a₁ + √N+a - a₁
 *                    ----
 *                    N-a²
 *
 *        = a +    1
 *              ------------------------
 *               a₁ + √N + a - a₁(N-a²)
 *                    -----------------
 *                         N-a²
 *
 * ex. (a₁=1)
 *
 *     √23 = 4 +    1
 *               ----------------
 *                1 + √23+4 - 1
 *                    -----
 *                    23-16
 *
 *        = 4 +           1
 *              ------------------
 *               1 + √23 - 3
 *                   ---------
 *                       7
 *
 * Let `c₁ = N - a²` and `b₁ = a - a₁(N-a²) = a - a₁c₁`.
 *
 *         c₁           c₁(√N - b₁)        c₁(√N - b₁)
 *      -------  =  -------------------- = -----------
 *      √N + b₁      (√N + b₁)(√N - b₁)      N - b₁²
 *
 *
 * ex. (c₁ = 7; b₁ = -3)
 *
 *         7       7(√23 + 3)
 *      -------  = ----------
 *      √23 - 3        14
 *
 *
 * Now let `a₂` be the integer part of that number. We have
 *
 *      c₁(√N - b₁)        c₁(√N - b₁) - a₂(N - b₁²)
 *      ----------- = a₂ + -------------------------
 *        N - b₁²                  N - b₁²
 *
 *
 *                 √N - b₁ - a₂(N - b₁²)/c₁
 *          = a₂ + -------------------------
 *                         (N - b₁²)/c₁
 *
 * ex. (a₂=3)
 *
 *      7(√23 + 3)        7(√23 + 3) - 3(14)        √23 + 3 - 3(2)       √23 - 3
 *      ----------- = 3 + ------------------- = 3 + -------------- = 3 + -------
 *        23 - 9                  14                      2                 2
 *
 * Now we have
 *
 *      c₂ = (N - b₁²)/c₁
 *      b₂ = - b₁ - a₂(N - b₁²)/c₁
 *         = - b₁ - a₂c₂
 *
 * ex.
 *
 *      c₂ = (23 - 9)/7 = 2
 *      b₂ = 3 - 3(23 - 9)/7
 *         = 3 - 6 = -3
 *
 * We can generalize
 *
 *      cₖ₊₁ = (N - bₖ²)/cₖ
 *      bₖ₊₁ = -bₖ - aₖ₊₁cₖ₊₁
 *
 * Working backwards to confirm: We had `a₀=4` and `1/(√23-4)`, so `c₀=1` and `b₀=-4`. Using the
 * formula above, we get
 *
 *      c₁ = (N - b₀²)/c₀ = (23 - (-4)²)/1 = 7
 *      b₁ = - b₀ - a₁c₁ = 4 - 1(7) = -3
 *
 * which checks out.
 *
 * k | a | b  | c
 * --|---|----|---
 * 0 | 4 | -4 | 1
 * 1 | 1 | -3 | 7
 * 2 | 3 | -3 | 2
 * 3 | 1 | -3 | 2
 *
 */

const rootAsPeriodicFraction = (N: number) => {
  let a = Math.trunc(Math.sqrt(N))
  let b = -a
  let c = 1
  let match = -1
  let history = []
  while (match === -1) {
    history.push({ a, b, c })
    a = Math.trunc((c * (Math.sqrt(N) - b)) / (N - b ** 2))
    c = (N - b ** 2) / c
    b = -b - a * c
    match = history.findIndex(h => h.a === a && h.b === b && h.c === c)
  }
  const integers = history.map(h => h.a)
  return {
    initial: integers.slice(0, match),
    periodic: integers.slice(match),
  }
}

expect(rootAsPeriodicFraction(2)).toEqual({
  initial: [1],
  periodic: [2],
})

expect(rootAsPeriodicFraction(3)).toEqual({
  initial: [1],
  periodic: [1, 2],
})

expect(rootAsPeriodicFraction(13)).toEqual({
  initial: [3],
  periodic: [1, 1, 1, 1, 6],
})

expect(rootAsPeriodicFraction(23)).toEqual({
  initial: [4],
  periodic: [1, 3, 1, 8],
})

const oddPeriodCount = (max: number) =>
  range(max).filter(d => {
    if (isSquare(d)) return false
    const { periodic } = rootAsPeriodicFraction(d)
    // console.log({ d, periodic })
    return !isEven(periodic.length)
  }).length

expect(oddPeriodCount(13)).toBe(4)

export const solution064 = () => oddPeriodCount(10000)
