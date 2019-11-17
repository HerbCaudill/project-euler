import { permutations } from 'lib/permutations'
import { digits } from 'lib/digits'
import { hasXDigits, digitCount } from 'lib/digitCount'
import { distinct } from 'lib/distinct'
import { ascending } from 'lib/sort'

export const numberPermutations = (n: number) =>
  distinct(
    permutations(digits(n))
      .map(p => p.join(''))
      .map(Number)
  )
    .filter(hasXDigits(digitCount(n)))
    .sort(ascending)
