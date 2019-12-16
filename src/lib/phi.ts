import memoize from 'fast-memoize'
import { distinct } from 'lib/distinct'
import { primeFactors as _primeFactors } from 'lib/primeFactors'
import { product } from 'lib/product'

const distinctPrimeFactors = memoize(n => distinct(_primeFactors(n)))

export const phi = (n: number): number =>
  n === 1
    ? 1
    : Math.round(n * product(distinctPrimeFactors(n).map(p => 1 - 1 / p)))
