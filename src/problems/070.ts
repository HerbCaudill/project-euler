import { isPermutation } from 'lib/isPermutation'
import { phi } from 'lib/phi'

// Totient permutation
// ===================
// Euler's Totient function, φ(n) [sometimes called the phi function], is
// used to determine the number of positive numbers less than or equal to n
// which are relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are
// all less than nine and relatively prime to nine, φ(9)=6.
// The number 1 is considered to be relatively prime to every positive
// number, so φ(1)=1.
//
// Interestingly, φ(87109)=79180, and it can be seen that 87109 is a
// permutation of 79180.
//
// Find the value of n, 1 < n < 10^7, for which φ(n) is a permutation of n
// and the ratio n/φ(n) produces a minimum.

const max = 10 ** 7

export const solution070 = () => {
  let n = 1
  let best = { n: 0, ratio: Number.POSITIVE_INFINITY }
  while (n++ <= max) {
    const p = phi(n)
    if (isPermutation(n)(p)) {
      const ratio = n / p
      if (ratio < best.ratio) best = { n, ratio }
    }
  }
  
  return best.n
}
