import { permutations } from 'lib/permutations'
import { sum } from 'lib/sum'
import { unique } from 'lib/arrays'

// Pandigital products
// ===================
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n
// exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
//
// The product 7254 is unusual, as the identity, 39 * 186 = 7254, containing multiplicand,
// multiplier, and product is 1 through 9 pandigital.
//
// Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1
// through 9 pandigital.
//
// HINT: Some products can be obtained in more than one way so be sure to only include it once in
// your sum.

// Solution
// ========
//
// Observation: We can rule out many possibilities; there are no identities of the form
// ```
//   xxx * xxx = xxx
// ````
// because the product of two 3-digit numbers will never be another 3-digit number. In fact all
// identities will be of one of these two forms:
// ```
//   xx * xxx = xxxx
//   x * xxxx = xxxx
// ```
// So we'll generate all permutations of the digits 1 - 9, break them into each of these two forms,
// and test them.

const perms = permutations([1, 2, 3, 4, 5, 6, 7, 8, 9])
expect(perms.length).toBe(362880)

const testProduct = (arr: number[], [b1, b2]: number[]) => {
  const n1 = +arr.slice(0, b1).join('')
  const n2 = +arr.slice(b1, b1 + b2).join('')
  const n3 = +arr.slice(b1 + b2).join('')

  const result = n1 * n2 === n3 ? n3 : false
  // if (result) console.log({ n1, n2, n3, result })
  return result
}

// check with example from above: 39 * 186 = 7254
{
  const perm = [3, 9, 1, 8, 6, 7, 2, 5, 4]
  const breakpoints = [2, 3]
  expect(testProduct(perm, breakpoints)).toBe(7254)
}

const allPandigitalProducts = () =>
  perms.reduce((result, perm) => {
    const product = testProduct(perm, [2, 3]) || testProduct(perm, [1, 4])
    if (product) result.push(product)
    return result
  }, [])

export const solution032 = () => sum(unique(allPandigitalProducts()))
