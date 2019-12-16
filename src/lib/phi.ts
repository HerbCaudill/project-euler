import memoize from 'fast-memoize'
import { distinctSorted } from 'lib/distinct'
import { primeFactors as _primeFactors } from 'lib/primeFactors'
import { product } from 'lib/product'
import { ascending } from './sort'

const primeFactors = memoize(n => _primeFactors(n).sort(ascending))

export const phi = (n: number): number =>
  Math.round(n * product(distinctSorted(primeFactors(n)).map(p => 1 - 1 / p)))
