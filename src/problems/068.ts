import { sum } from 'lib/sum'
import { ascending } from 'lib/sort'
import { arraysEqual } from 'lib/arraysEqual'
import { range } from 'lib/range'
import { combinations } from 'lib/combinations'
import { permutations as _permutations } from 'lib/permutations'
import { distinct } from 'lib/distinct'
import memoize from 'fast-memoize'

const permutations = memoize(_permutations)

// Magic 5-gon ring
// ================
// Consider the following "magic" 3-gon ring, filled with the numbers 1 to 6,
// and each line adding to nine.
//
//         4
//          \
//           3
//          / \
//         1---2---6
//        /
//       5
//
// Working clockwise, and starting from the group of three with the
// numerically lowest external node (4,3,2 in this example), each solution
// can be described uniquely. For example, the above solution can be
// described by the set: 4,3,2; 6,2,1; 5,1,3.
//
// It is possible to complete the ring with four different totals: 9, 10, 11,
// and 12. There are eight solutions in total.
//
//         Total          Solution Set
//         9              4,2,3; 5,3,1; 6,1,2
//         9              4,3,2; 6,2,1; 5,1,3
//         10             2,3,5; 4,5,1; 6,1,3
//         10             2,5,3; 6,3,1; 4,1,5
//         11             1,4,6; 3,6,2; 5,2,4
//         11             1,6,4; 5,4,2; 3,2,6
//         12             1,5,6; 2,6,4; 3,4,5
//         12             1,6,5; 3,5,4; 2,4,6
//
// By concatenating each group it is possible to form 9-digit strings; the
// maximum string for a 3-gon ring is 432621513.
//
// Using the numbers 1 to 10, and depending on arrangements, it is possible
// to form 16- and 17-digit strings. What is the maximum 16-digit string for
// a "magic" 5-gon ring?
//
//         ?
//          \
//           ?
//          / \
//         /   \   ?
//        /     \ /
//       ?       ?
//      / \     /
//     ?   ?---?---?
//          \
//           ?
//

type Triad = [number, number, number]
type Ring = Triad[]

const isNgonRing = (ring: Ring): boolean => {
  return ring.every((triad, i) => {
    const next = i === ring.length - 1 ? ring[0] : ring[i + 1]
    return triad[2] === next[1]
  })
}

const usesEachNumberOnce = (ring: Ring): boolean => {
  const uniqueValues = [...new Set(ring.flat())].sort(ascending)
  const consecutiveNumbers = range(1, ring.length * 2)
  return arraysEqual(uniqueValues, consecutiveNumbers)
}

const isMagic = (ring: Ring): boolean => {
  const firstSum = sum(ring[0])
  const allAddToSameValue = ring.every(triad => sum(triad) === firstSum)
  return allAddToSameValue && usesEachNumberOnce(ring)
}

const isMagicNgonRing = (ring: Ring) => isNgonRing(ring) && isMagic(ring)

{
  expect(isMagic([[4, 2, 3], [5, 3, 1], [6, 1, 2]])).toBe(true)
  expect(isMagic([[5, 2, 3], [5, 3, 1], [6, 1, 2]])).toBe(false) // first triad doesn't add to 9

  expect(isNgonRing([[4, 2, 3], [5, 3, 1], [6, 1, 2]])).toBe(true)
  expect(isNgonRing([[3, 2, 4], [5, 3, 1], [6, 1, 2]])).toBe(false) // first triad in wrong order

  expect(isMagicNgonRing([[4, 2, 3], [5, 3, 1], [6, 1, 2]])).toBe(true)
  expect(isMagicNgonRing([[4, 3, 2], [6, 2, 1], [5, 1, 3]])).toBe(true)
  expect(isMagicNgonRing([[2, 3, 5], [4, 5, 1], [6, 1, 3]])).toBe(true)
  expect(isMagicNgonRing([[2, 5, 3], [6, 3, 1], [4, 1, 5]])).toBe(true)
  expect(isMagicNgonRing([[1, 4, 6], [3, 6, 2], [5, 2, 4]])).toBe(true)
  expect(isMagicNgonRing([[1, 6, 4], [5, 4, 2], [3, 2, 6]])).toBe(true)
  expect(isMagicNgonRing([[1, 5, 6], [2, 6, 4], [3, 4, 5]])).toBe(true)
  expect(isMagicNgonRing([[1, 6, 5], [3, 5, 4], [2, 4, 6]])).toBe(true)
}

/// orders the ring starting with the lowest outer value
const concatValue = (ring: Ring) => {
  const initialTriadIndex = ring.reduce(
    (result, triad, index) => {
      return triad[0] < result.lowest ? { lowest: triad[0], index } : result
    },
    { lowest: Number.POSITIVE_INFINITY, index: -1 }
  ).index
  const orderedRing = ring
    .slice(initialTriadIndex)
    .concat(ring.slice(0, initialTriadIndex))
  return +orderedRing.flat().join('')
}

{
  expect(concatValue([[4, 2, 3], [5, 3, 1], [6, 1, 2]])).toBe(423531612)
  expect(concatValue([[5, 3, 1], [6, 1, 2], [4, 2, 3]])).toBe(423531612)
  expect(concatValue([[6, 1, 2], [4, 2, 3], [5, 3, 1]])).toBe(423531612)
}

const allMagicNgonRings = (N: number) => {
  const nums = range(1, N * 2)
  const innerRingValues = combinations(nums, N)
  const innerRingCandidates = innerRingValues.flatMap(r => permutations(r))
  const candidates: Ring[] = innerRingCandidates.flatMap(innerRing => {
    const outerRingValues = nums.filter(n => !innerRing.includes(n))
    const outerRingCandidates = permutations(outerRingValues) as number[][]
    const joinWithInnerRing = (outerRing: number[]) =>
      outerRing.map(
        (outer, i) =>
          [outer, innerRing[i], innerRing[i === N - 1 ? 0 : i + 1]] as Triad
      )
    return outerRingCandidates.map(joinWithInnerRing)
  })
  return candidates.filter(isMagicNgonRing)
}

expect(distinct(allMagicNgonRings(3).map(concatValue))).toEqual([
  423531612,
  432621513,
  235451613,
  253631415,
  146362524,
  164542326,
  156264345,
  165354246,
])

const solutions = allMagicNgonRings(5)
const uniqueSolutions = distinct(solutions.map(concatValue)).sort(ascending)

export const solution068 = () =>
  Math.max(...uniqueSolutions.filter(s => s.toString().length === 16))
