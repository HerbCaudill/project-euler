import memoize from 'fast-memoize'
import fs from 'fs'
import { combinations } from 'lib/combinations'
import { isPrime, primesUpTo } from 'lib/primes'
import { ascending, arrayAscending } from 'lib/sort'
import { sum } from 'lib/sum'
const profiler = require('v8-profiler-node8')

// Prime pair sets
// ===============
// The primes 3, 7, 109, and 673, are quite remarkable. By taking any two
// primes and concatenating them in any order the result will always be
// prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The
// sum of these four primes, 792, represents the lowest sum for a set of four
// primes with this property.
//
// Find the lowest sum for a set of five primes for which any two primes
// concatenate to produce another prime.

// ---------------------------------------------------------------------------------------------------
const concat = (a: number, b: number) =>
  a * 10 ** Math.floor(Math.log10(b) + 1) + b

/** Tests whether a pair of numbers a & b concatenate both ways (a & b, b & a) to form prime
 * numbers. Doesn't test a or b for primality. */
const primePairLookup = {} as { [key: number]: boolean }
const getKey = ([a, b]: number[]) => ((a + b) * (a + b + 1)) / 2 + a // Cantor pairing function
const isPrimePair = ([a, b]: number[]) => {
  const key = getKey([a, b])
  if (primePairLookup.hasOwnProperty(key)) return primePairLookup[key]
  const result = (primePairLookup[key] =
    isPrime(concat(a, b)) && isPrime(concat(b, a)))
  return result
}
{
  expect(isPrimePair([3, 7])).toBe(true)
  expect(isPrimePair([7, 109])).toBe(true)
  expect(isPrimePair([3, 109])).toBe(true)
  expect(isPrimePair([109, 673])).toBe(true)
  expect(isPrimePair([113, 673])).toBe(false)
}

/**
 * Our strategy is to find all sets of size 2, and then use those to find all sets of size 3, and so
 * on until N (N=5 for this problem).
 *
 * For example, starting with primes up to 1000, we get sets of 2 like these:
 * ```ts
 *  [3,7],   [3,11],  [3,17],  [3,31],  [3,37],
 *  [3,59],  [3,67],  [3,73],  [3,109], [3,137],
 *  [3,191], [3,229], [3,271], [3,331], [3,359],
 *  [3,373], [3,449], [3,467], [3,499], [3,541],
 *  [3,557], [3,607], [3,613], [3,617], [3,673],
 *  [3,701], [3,719], [3,733], [3,739], [3,823],
 *  [3,929], [3,947], [7,19],  [7,61],  [7,97],
 *  // ...
 * ```
 * We proceed by daisy-chaining these - e.g. `[3,7]` with `[7,97]` - by finding sets that partially
 * overlap, to get sets of 3 like `[3,7,97]`. We then filter these sets to keep only those that are
 * prime pair sets.
 *
 * ```ts
 *  [3,7,109],    [3,7,229],    [3,7,541],    [3,7,673],
 *  [3,7,823],    [3,11,701],   [3,17,449],   [3,37,67],
 *  [3,37,607],   [3,59,929],   [3,73,607],   [3,73,823],
 *  [3,109,673],  [3,137,191],  [3,137,359],  [3,137,947],
 *  [3,229,373],  [3,229,499],  [3,229,613],  [3,331,739],
 *  [3,359,701],  [3,373,823],  [3,449,557],  [3,467,617],
 *  [3,499,673],  [3,613,673],  [3,719,947],  [7,19,97],
 *  [7,19,433],   [7,19,937],   [7,61,487],   [7,97,829],
 *  // ...
 * ```
 * One more pass gets us just two sets of 4:
 * ```ts
 *  [3,7,109,673],
 *  23,311,677,827]
 * ```
 */

function arraysEqual(a: number[], b: number[]) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length != b.length) return false
  for (var i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false
  return true
}

const extendSets = (sets: number[][]) => {
  const extendedSets = []
  // Group sets of N by their first N-1 items, and for each group make a list of the *final* item of
  // each set. Then see if we can make prime pairs from those final items.

  // For example with N = 2 we have a bunch of sets starting with 3:

  // [3,7],   [3,11],  [3,17],  [3,31],  [3,37], ... [3,109], ... [3,947]

  // So let's take the final item from each of these pairs and see if any of them make prime pairs.

  // In this case, for example, [7, 109] is a prime pair; so we know that [3,7,109] is a prime pair
  // set.

  let initialValues = [] as number[]
  let finalValues = [] as number[]
  for (const set of sets) {
    const newInitialValues = set.slice(0, set.length - 1)
    const finalValue = set[set.length - 1]
    if (arraysEqual(initialValues, newInitialValues)) {
      // same initial items as previous
      finalValues.push(finalValue)
    } else {
      // new set of initial items
      if (finalValues.length) {
        const newPrimePairs = combinations(finalValues, 2).filter(isPrimePair)
        for (const pair of newPrimePairs)
          extendedSets.push(initialValues.concat(pair).sort(ascending))
      }
      initialValues = newInitialValues
      finalValues = [finalValue]
    }
  }

  const result = extendedSets.sort(arrayAscending)
  return result
}

const findSets = (max: number, size: number) => {
  let primePairs = new Set(combinations(primesUpTo(max), 2).filter(isPrimePair))
  let sets = [...primePairs] // start with sets of 2
  let i = 2
  while (i++ < size) sets = extendSets(sets)
  return sets
}

export const solution060 = () => {
  let s = [] as number[][]
  profile(() => (s = findSets(10000, 5)))
  return sum(s[0])
}

const profile = (fn: Function) => {
  profiler.startProfiling()
  fn()
  const profile = profiler.stopProfiling()

  profile.export((err: any, result: any) => {
    fs.writeFileSync('profile.cpuprofile', result)
    profile.delete()
  })
}
