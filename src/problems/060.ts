import memoize from 'fast-memoize'
import fs from 'fs'
import { combinations } from 'lib/combinations'
import { isPrime } from 'lib/miller-rabin'
import { primesUpTo } from 'lib/primes'
import { arrayAscending } from 'lib/sort'
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
const _isPrimePair = ([a, b]: number[]) =>
  isPrime(concat(a, b)) && isPrime(concat(b, a))
const isPrimePair = memoize(_isPrimePair)
const isntPrimePair = (p: number[]) => !isPrimePair(p)
{
  expect(isPrimePair([3, 7])).toBe(true)
  expect(isPrimePair([7, 109])).toBe(true)
  expect(isPrimePair([3, 109])).toBe(true)
  expect(isPrimePair([109, 673])).toBe(true)
  expect(isPrimePair([113, 673])).toBe(false)

  expect(isntPrimePair([113, 673])).toBe(true)
}

const isPrimePairSet = (arr: number[]) =>
  !combinations(arr, 2).some(isntPrimePair)

function distinct(sets: number[][]) {
  const stringify = (s: any) => s.sort().join(',')
  const parse = (s: string) => s.split(',').map(d => +d)
  return [...new Set(sets.map(stringify))].map(parse)
}

const mergeOverlappingSets1 = (sets: number[][]) => {
  const result = []

  for (let i = 0; i < sets.length; i++) {
    const set1 = sets[i]
    for (let j = i + 1; j < sets.length; j++) {
      const set2 = sets[j]
      const additionalItems = getAdditionalItems(set2, set1)
      if (additionalItems.length === 1)
        result.push(set1.concat(additionalItems))
    }
  }
  return distinct(result)
    .filter(isPrimePairSet)
    .sort(arrayAscending)
}

const findSets = (max: number, size: number) => {
  let sets = primesUpTo(max).map(p => [p]) // start out with 'sets' of one
  let i = 1
  while (i++ < size) sets = mergeOverlappingSets1(sets)
  return sets
}

function getAdditionalItems(set2: number[], set1: number[]) {
  return set2.filter(d => !set1.includes(d))
}

export const solution060 = () => {
  profiler.startProfiling('1')
  console.time(`findSets`)
  const s = findSets(10000, 5)
  console.timeEnd(`findSets`)
  const profile = profiler.stopProfiling()

  profile.export((err: any, result: any) => {
    fs.writeFileSync('profile.cpuprofile', result)
    profile.delete()
  })
  return sum(s[0])
}
