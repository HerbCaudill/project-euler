import { permutations } from './permutations'

export const allDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

export const isPandigital = (n: number | string, K: number = 9) =>
  // the number has to have K digits (e.g. 9 digits for 1-to-9 pandigital)
  n.toString().length === K &&
  // if we remove each digit from the number once, we'll have nothing left
  allDigits
    .slice(0, K)
    .reduce((result, d) => result.replace(d.toString(), ''), n.toString())
    .length === 0

export const panDigitals = (K = 9) =>
  permutations(allDigits.slice(0, K)).map(arr => +arr.join(''))
