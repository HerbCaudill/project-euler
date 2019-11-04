import { factorial } from './factorial'

const cache: { [k: string]: any[][] } = {}

export const permutations = <T>(arr: T[], sorted = false): T[][] => {
  const key = arr.join('')
  const result =
    cache[key] ||
    (arr.length === 1
      ? [arr]
      : (sorted ? arr : arr.sort()) // sort on first pass
          .flatMap((first, i, arr) => {
            sorted = true
            const rest = removeElementByIndex(arr, i)
            // return this element followed by all permutations of remaining elements
            const restPermutations = permutations(rest, sorted)
            return restPermutations.map(p => [first, ...p])
          }))
  if (arr.length < 7) cache[key] = result // so we don't run out of memory
  return result
}

/**
 * Returns the nth permutation (in lexicographic order) of the given array.
 */
export const nthPermutation = (arr: string[], n: number): string[] => {
  // For small arrays, it's faster just to generate all the permutations.
  // This is also our terminal case for recursion.
  if (arr.length < 4) return permutations(arr)[n]

  //For larger arrays, we have to be trickier. Suppose we want to find permutation #16 (zero-based)
  // of 0123.

  // It's 2301, as we can see here:
  // ```
  // 0123  0132  0213  0231  0312  0321
  // 1023  1032  1203  1230  1302  1320
  // 2013  2031  2103  2130  2301* 2310
  // 3012  3021  3102  3120  3201  3210
  // ```
  // Note that there are 24 permutations of 4 elements (4! = 24).

  // These permutations are in rows of 6 because there are 3! = 6 permutations of 3 elements.
  const rowSize = Number(factorial(arr.length - 1))

  // We can find the right *row* by taking the integer quotient of 16 by 6, which gives us row 2.
  const rowIndex = Math.floor(n / rowSize)

  // The right *column* within that row is the remainder of 16 by 6, in this case 4.
  const columnIndex = n % rowSize

  // The permutations in each row each start with the nth element of the original array: Row #2 is
  // element #2, followed by all the permutations of the remaining elements.

  // So we know that the 16th permutation starts with '2'; the rest of the permutation ('301') is
  // permutation #4 (zero-based) of the remaining elements, '013'. So we can find the remaining part
  // of the permutation recursively:
  const head = arr[rowIndex]
  const rest = removeElementByIndex(arr, rowIndex)
  const tail = nthPermutation(rest, columnIndex)
  return [head, ...tail]
}

function removeElementByIndex(arr: any[], i: number): any[] {
  const rest = [...arr] // clone
  rest.splice(i, 1) // remove current
  return rest
}
