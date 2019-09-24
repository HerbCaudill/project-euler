import { range } from 'lib/range'
import { isPandigital } from '../lib/panDigital'

// Pandigital multiples
// ====================
// Take the number 192 and multiply it by each of 1, 2, and 3:
//
//   192 * 1 = 192
//   192 * 2 = 384
//   192 * 3 = 576
//
// By concatenating each product we get the 1 to 9 pandigital, 192384576. We
// will call 192384576 the concatenated product of 192 and (1,2,3)
//
// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4,
// and 5, giving the pandigital, 918273645, which is the concatenated product
// of 9 and (1,2,3,4,5).
//
// What is the largest 1 to 9 pandigital 9-digit number that can be formed as
// the concatenated product of an integer with (1,2, ... , n) where n > 1?

export const solution038 = () => {
  let best = 918273645 // highest known pandigital multiple, given in instructions

  // the factor has to be a 2, 3, or 4-digit number, and it has to start with 9 (because the largest
  // number we already know starts with 9); so we can narrow the search space
  const searchSpace = [
    range({ start: 90, stop: 99 }),
    range({ start: 900, stop: 999 }),
    range({ start: 9000, stop: 9999 }),
  ].flat()

  for (let factor of searchSpace) {
    let i = 1
    let concatProduct = ''

    // concatenate products until we have at least a 9-digit number
    while (concatProduct.length < 9)
      concatProduct = concatProduct.concat((factor * i++).toString())

    // check if it's better than the best result we've found
    if (+concatProduct > best && isPandigital(concatProduct))
      best = +concatProduct
  }
  return best
}
