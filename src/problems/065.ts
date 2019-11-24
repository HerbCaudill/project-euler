import { Sequence } from 'lib/Sequence'
import { Fraction, add, invert } from 'lib/Fraction'
import { digitSum } from 'lib/digitSum'
import { range } from 'lib/range'

// Convergents of e
// ================
// The square root of 2 can be written as an infinite continued fraction.
//
// 2 = 1 +          1
//         -------------------
//         2 +        1
//             ---------------
//             2 +      1
//                 -----------
//                 2 +    1
//                     -------
//                     2 + ...
//
// The infinite continued fraction can be written, 2 = [1;(2)], (2) indicates
// that 2 repeats ad infinitum. In a similar way, 23 = [4;(1,3,1,8)].
//
// It turns out that the sequence of partial values of continued fractions
// for square roots provide the best rational approximations. Let us consider
// the convergents for 2.
//
// 1 + 1              = 3/2
//    ---
//     2
//
// 1 +   1            = 7/5
//     -------
//     2 + 1
//        ---
//         2
//
// 1 +     1          = 17/12
//     ---------
//     2 +   1
//         -----
//         2 + 1
//            ---
//             2
//
// 1 +       1        = 41/29
//     -------------
//     2 +     1
//         ---------
//         2 +   1
//             -----
//             2 + 1
//                ---
//                 2
//
// Hence the sequence of the first ten convergents for 2 are:
// 1, 3/2, 7/5, 17/12, 41/29, 99/70, 239/169, 577/408, 1393/985, 3363/2378,
// ...
//
// What is most surprising is that the important mathematical constant,
// e = [2; 1,2,1, 1,4,1, 1,6,1 , ... , 1,2k,1, ...].
//
// The first ten terms in the sequence of convergents for e are:
// 2, 3, 8/3, 11/4, 19/7, 87/32, 106/39, 193/71, 1264/465, 1457/536, ...
//
// The sum of digits in the numerator of the 10th convergent is 1+4+5+7=17.
//
// Find the sum of digits in the numerator of the 100th convergent of the
// continued fraction for e.

const ints = new Sequence<bigint>(i =>
  i === 1
    ? 2n //
    : BigInt(i) % 3n === 0n
    ? ((BigInt(i) + 2n) / 3n) * 2n
    : 1n
)

expect(ints.values(10).map(Number)).toEqual([2, 1, 2, 1, 1, 4, 1, 1, 6, 1])

const convergent = (_s: bigint[]) => {
  const s = [..._s]
  let fraction = [s.pop()!, 1n] as Fraction
  while (s.length > 0) fraction = add(s.pop()!, invert(fraction))
  return fraction
}

expect(convergent([1n, 2n])).toEqual([3n, 2n])
expect(convergent([1n, 2n, 2n])).toEqual([7n, 5n])
expect(convergent([1n, 2n, 2n, 2n])).toEqual([17n, 12n])

{
  const [num, den] = convergent(ints.values(10))
  expect(digitSum(num)).toBe(17)
}

export const solution065 = () => {
  const [num, den] = convergent(ints.values(100))
  return digitSum(num)
}
