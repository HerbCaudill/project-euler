import { factorial as _factorial } from 'lib/factorial'
import memoize from 'fast-memoize'

// Combinatoric selections
// =======================
// There are exactly ten ways of selecting three from five, 12345:
//
//            123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
//
// In combinatorics, we use the notation, nCr(5,3) = 10.
//
// In general,
//
// nCr(n,r) = n!/(r!(n-r)!), where r =< n, n! = n * (n1) * ... * 3 * 2 * 1,
// and 0! = 1.
//
// It is not until n = 23, that a value exceeds one-million: nCr(23,10) =
// 1144066.
//
// How many values of nCr(n,r), for 1 =< n =< 100, are greater than one-million?

const factorial = memoize(_factorial)

export const nCr = (n: number, r: number) => {
  if (r > n) throw new RangeError('r cannot be larger than n')
  return factorial(n) / (factorial(r) * factorial(n - r))
}

expect(nCr(23, 10)).toEqual(1144066n)

export const solution053 = () => {
  let count = 0
  for (let n = 1; n <= 100; n++)
    for (let r = 1; r <= n; r++) if (nCr(n, r) > 1000000) count++
  return count
}
