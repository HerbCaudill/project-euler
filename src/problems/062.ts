import { Sequence } from 'lib/Sequence'
import { permutations } from 'lib/permutations'
import { digits } from 'lib/digits'

// Cubic permutations
// ==================
// The cube, 41063625 (345^3), can be permuted to produce two other cubes:
// 56623104 (384^3) and 66430125 (405^3). In fact, 41063625 is the smallest
// cube which has exactly three permutations of its digits which are also
// cube.
//
// Find the smallest cube for which exactly five permutations of its digits
// are cube.

const cubes = new Sequence(n => n ** 3)
const isCube = (n: number) => cubes.includes(n)

expect(isCube(41063625)).toBe(true)
expect(isCube(56623104)).toBe(true)
expect(isCube(66430125)).toBe(true)

const distinct = (arr: number[]) => [...new Set(arr)]

const digitCount = (n: number) => Math.trunc(Math.log10(n))
const hasXDigits = (x: number) => (n: number) => digitCount(n) === x

const numberPermutations = (n: number) =>
  distinct(permutations(digits(n)).map(p => +p.join(''))).filter(
    hasXDigits(digitCount(n))
  )

expect(numberPermutations(123)).toEqual([123, 132, 213, 231, 312, 321])
expect(numberPermutations(112)).toEqual([112, 121, 211])

const cubicPermutations = (n: number) => numberPermutations(n).filter(isCube)

expect(cubicPermutations(41063625)).toEqual([41063625, 56623104, 66430125])

const findSmallestPermutableCube = (count: number) => {
  for (const candidate of cubes.valuesUpTo(41063626))
    if (cubicPermutations(candidate).length === count) return candidate
  return undefined
}
console.time('3')
const x = findSmallestPermutableCube(3)
console.timeEnd('3')
expect(x).toBe(41063625)

export const solution062 = () => -1
