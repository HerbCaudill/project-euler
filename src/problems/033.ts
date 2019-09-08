import { range } from 'lib/range'
import { product } from 'lib/product'
import { primeFactors } from 'lib/prime-factors'

// Digit cancelling fractions
// ==========================
// The fraction 49/98 is a curious fraction, as an inexperienced
// mathematician in attempting to simplify it may incorrectly believe that
// 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
//
// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
//
// There are exactly four non-trivial examples of this type of fraction, less
// than one in value, and containing two digits in the numerator and
// denominator.
//
// If the product of these four fractions is given in its lowest common
// terms, find the value of the denominator.

const isCurious = ([num, den]: number[]) => {
  if (num.toString().length !== 2 || den.toString().length !== 2) return false // not 2-digit numbers
  if (num % 10 === 0 && den % 10 === 0) return false // trivial
  if (num / den >= 1) return false // more than one in value
  const [a, b] = num.toString()
  const commonDigit = den.toString().includes(a)
    ? a
    : den.toString().includes(b)
    ? b
    : false
  if (!commonDigit) return false
  const num1 = +num.toString().replace(commonDigit, '')
  const den1 = +den.toString().replace(commonDigit, '')
  return num / den === num1 / den1
}

expect(isCurious([1, 2])).toBe(false) // not 2-digit numbers
expect(isCurious([49, 998])).toBe(false) // not 2-digit numbers
expect(isCurious([98, 49])).toBe(false) // more than 1 in value
expect(isCurious([30, 50])).toBe(false) // trivial
expect(isCurious([12, 34])).toBe(false) // no common digit
expect(isCurious([12, 24])).toBe(false) // "simplified" fraction isn't equal
expect(isCurious([49, 98])).toBe(true) // ✔ example from above

const allFractions = range({ start: 11, stop: 99 })
  .map(num => range({ start: num + 1, stop: 99 }).map(den => [num, den]))
  .flat()

const allCuriousFractions = allFractions.filter(isCurious)

const numProduct = product(allCuriousFractions.map(f => f[0]))
const denProduct = product(allCuriousFractions.map(f => f[1]))

const numProductFactors = primeFactors(numProduct)
const denProductFactors = primeFactors(denProduct)

console.log({ numProductFactors, denProductFactors })

export const solution033 = () => -1
