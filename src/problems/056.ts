import { digitSum } from 'lib/digit-sum'
import { range } from 'lib/range'

// Powerful digit sum
// ==================
// A googol (10^100) is a massive number: one followed by one-hundred zeros;
// 100^100 is almost unimaginably large: one followed by two-hundred zeros.
// Despite their size, the sum of the digits in each number is only 1.
//
// Considering natural numbers of the form, a^b, where a, b < 100, what is
// the maximum digital sum?

expect(digitSum(100n ** 100n)).toBe(1)

export const solution056 = () => {
  let best = { sum: 0, a: 0, b: 0 }
  // I can get the same result just by going from 90 to 100 - probably easy enough to prove
  // but why bother when I can do this in <100ms
  for (const a of range(0, 100))
    for (const b of range(0, 100)) {
      const sum = digitSum(BigInt(a) ** BigInt(b))
      if (sum > best.sum) best = { sum, a, b }
    }
  // console.log(best, BigInt(best.a) ** BigInt(best.b))
  return best.sum
}
