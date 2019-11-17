import { range } from 'lib/range'
import { PolygonalSequence, isPolygonal } from 'lib/polygonalNumbers'
import { get2ndHalf, get1stHalf } from 'lib/cyclicSet'
import { ascending } from 'lib/sort'
import { sum } from 'lib/sum'
import { oneOfEachCombinations } from 'lib/oneOfEachCombinations'
import { distinctArrays } from 'lib/distinctArrays'

// Cyclical figurate numbers
// =========================
// Triangle, square, pentagonal, hexagonal, heptagonal, and octagonal numbers
// are all figurate (polygonal) numbers and are generated by the following
// formulae:
//
// Triangle     P[3,n]=n(n+1)/2    1, 3, 6, 10, 15, ...
// Square       P[4,n]=n^2         1, 4, 9, 16, 25, ...
// Pentagonal   P[5,n]=n(3n-1)/2   1, 5, 12, 22, 35, ...
// Hexagonal    P[6,n]=n(2n-1)     1, 6, 15, 28, 45, ...
// Heptagonal   P[7,n]=n(5n-3)/2   1, 7, 18, 34, 55, ...
// Octagonal    P[8,n]=n(3n-2)     1, 8, 21, 40, 65, ...
//
// The ordered set of three 4-digit numbers: 8128, 2882, 8281, has three
// interesting properties.
//
//  1. The set is cyclic, in that the last two digits of each number is the
//     first two digits of the next number (including the last number with
//     the first).
//  2. Each polygonal type: triangle (P[3,127]=8128), square (P[4,91]=8281),
//     and pentagonal (P[5,44]=2882), is represented by a different number in
//     the set.
//  3. This is the only set of 4-digit numbers with this property.
//
// Find the sum of the only ordered set of six cyclic 4-digit numbers for
// which each polygonal type: triangle, square, pentagonal, hexagonal,
// heptagonal, and octagonal, is represented by a different number in the
// set.

const min = 3 // triangle numbers
const max = 8 // octagonal numbers

// generate arrays containing each triangular number in range, each square number in range, etc.
// [
//   [ 1035, 1081, 1128, ..., 9870 ], // triangle numbers
//   [ 1024, 1089, 1156, ..., 9801 ], // square numbers
//   ...,
//   [ 1045, 1160, 1281, ..., 9976]
// ]
const sequences = range(0, max - min).map(s =>
  new PolygonalSequence(s + min).valuesUpTo(9999).filter(n => n > 999)
)

const allNumbers = Array.from(new Set(sequences.flat()))

const findMatchesForNumber = (n: number, s: number[]) => {
  const secondHalf = get2ndHalf(n)
  return s.filter(candidate => get1stHalf(candidate) === secondHalf)
}

// for every number that appears in any of the sequences, create a lookup entry that lists
// - every other number (in any sequence) that it "matches" (every number that starts with this number's last digits)
// - the index of every sequence that this number belongs to (usually just one, but a number can be both triangular and square, etc.)
const numberLookup = sequences.reduce(
  (lookup, arr, s) => {
    arr.forEach(d => {
      if (!lookup[d]) {
        // first time seeing this number; look up all matches
        lookup[d] = {
          matches: findMatchesForNumber(d, allNumbers),
          sequences: [s],
        }
      } else {
        // entry already exists - just add this sequence's index to the sequences list
        lookup[d].sequences.push(s)
      }
    })
    return lookup
  },
  {} as { [key: number]: { matches: number[]; sequences: number[] } }
)

// Determine whether the given set of sequences fulfills the "one of each kind" rule.
// This is tricky because a number might belong to multiple sequences (e.g. both triangular and square).
const oneOfEach = (sequences: number[][]) =>
  oneOfEachCombinations(sequences).filter(
    (combination: number[]) =>
      !combination.some(d => d >= sequences.length) &&
      new Set(combination).size === sequences.length
  ).length > 0
{
  expect(oneOfEach([[0], [1], [2]])).toBe(true)
  expect(oneOfEach([[0], [2], [1]])).toBe(true)
  expect(oneOfEach([[0], [2], [1, 2]])).toBe(true)
  expect(oneOfEach([[0], [1], [1, 2]])).toBe(true)
  expect(oneOfEach([[0], [1, 2], [1]])).toBe(true)
  expect(oneOfEach([[0], [1, 2], [2]])).toBe(true)
  expect(oneOfEach([[0], [7, 1], [2]])).toBe(true)
  expect(oneOfEach([[1], [1], [1]])).toBe(false)
  expect(oneOfEach([[1], [1], [2]])).toBe(false)
  expect(oneOfEach([[0], [7], [2]])).toBe(false)
}

const chainSequences = (chain: number[]) =>
  chain.map(d => numberLookup[d].sequences)

const chainHasOneOfEach = (chain: number[]) => oneOfEach(chainSequences(chain))

const isCycle = (chain: number[]) => {
  const first = chain[0]
  const last = chain[chain.length - 1]
  return get2ndHalf(last) === get1stHalf(first)
}
{
  const example = [8128, 2882, 8281]
  expect(chainHasOneOfEach(example)).toBe(true)
  expect(isCycle(example)).toBe(true)
}

const findChains = (length: number, chain: number[] = []) => {
  let next: number[]
  if (chain.length) {
    const last = chain[chain.length - 1]
    next = numberLookup[last].matches
  } else {
    next = allNumbers
  }
  let chains = next.filter(n => !chain.includes(n)).map(n => chain.concat([n]))

  if (chain.length < length - 1)
    chains = chains.map(c => findChains(length, c)).flat()

  return chains.filter(isCycle).filter(chainHasOneOfEach)
}

export const solution061 = () => {
  const solution = distinctArrays(findChains(6))[0]
  return sum(solution)
}
