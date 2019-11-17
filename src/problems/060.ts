import { arraysEqual } from 'lib/arraysEqual'
import { combinations } from 'lib/combinations'
import { isPrimePair } from 'lib/primePairs'
import { primesUpTo } from 'lib/primes'
import { profile } from 'lib/profile'
import { arrayAscending, ascending } from 'lib/sort'
import { sum } from 'lib/sum'

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
 * Group sets of N by their first N-1 items, and for each group make a list of the *final* item of
 * each set. Then see if we can make prime pairs from those final items.
 *
 * For example with N = 2 we have a bunch of sets starting with 3:
 * ```ts
 * [3,7], [3,11], [3,17], [3,31], [3,37], ... [3,109], ... [3,947]
 * ```
 *
 * So let's take the final item from each of these pairs and see if any of them make prime pairs.
 * ```ts
 * [ 7, 11, 17, 31, 37,..., 109,..., 947]
 * ```
 *
 * In this case, for example, [7, 109] is a prime pair; so we know that `[3, 7, 109]` is a prime pair
 * set.
 */
const findSets = (max: number, size: number) => {
  let sets = combinations(primesUpTo(max), 2).filter(isPrimePair)
  let i = 2
  while (i++ < size) sets = extendSets(sets)
  return sets
}

const extendSets = (sets: number[][]) => {
  const extendedSets = []
  let initialValues = [] as number[]
  let finalValues = [] as number[]
  /* ignore coverage */
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

// SLOW: ~17s
export function solution060() {
  return sum(findSets(10000, 5)[0])
}

// profile(solution060)
