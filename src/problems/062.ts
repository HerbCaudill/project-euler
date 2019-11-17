import { digits } from 'lib/digits'
import { profile } from 'lib/profile'
import { ascending } from 'lib/sort'

// Cubic permutations
// ==================
// The cube, 41063625 (345^3), can be permuted to produce two other cubes:
// 56623104 (384^3) and 66430125 (405^3). In fact, 41063625 is the smallest
// cube which has exactly three permutations of its digits which are also
// cube.
//
// Find the smallest cube for which exactly five permutations of its digits
// are cube.

function* cubes() {
  let i = 1
  while (true) yield (i++) ** 3
}

const smallestPermutation = (n: number) => {
  const allDigits = digits(n)
  const zeroes = allDigits.filter(d => d === 0)
  const [first, ...rest] = allDigits.filter(d => d > 0).sort(ascending)
  return +[first, ...zeroes, ...rest].join('')
}

const findSmallestPermutableCube = (permutationCount: number) => {
  const counts = {} as {
    [key: number]: { count: number; smallestCube: number }
  }
  for (const cube of cubes()) {
    const key = smallestPermutation(cube)
    let { count = 0, smallestCube = cube } = counts[key] || {}
    if (++count === permutationCount) return smallestCube
    counts[key] = { count, smallestCube }
  }
  return undefined
}

export function solution062() {
  return findSmallestPermutableCube(5)
}

// profile(solution062)
