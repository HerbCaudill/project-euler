import { commonLength } from './commonValue'
import { isEven } from 'lib/isEven'
import { ascending } from './sort'
import { arraysEqual } from './arraysEqual'
import { nDigitNumbers } from './nDigitNumbers'
import { combinations } from './combinations'
import { concat } from './concat'
import { numberLength } from './numberLength'

export const get1stHalf = (n: number) =>
  Math.trunc(n / 10 ** (numberLength(n) / 2))

export const get2ndHalf = (n: number) => n % 10 ** (numberLength(n) / 2)

export const isCyclic = (set: number[]) => {
  const length = commonLength(set)
  if (length === undefined) throw new Error('Must all have the same length') // all have to have the same length
  if (!isEven(length)) throw new Error('Must have even number of digits') // defining this as the second half of one number is the first half of another
  const firstHalves = set.map(get1stHalf).sort(ascending)
  const secondHalves = set.map(get2ndHalf).sort(ascending)
  return arraysEqual(firstHalves, secondHalves)
}

export const cyclicSets = (digitCount: number, length: number) => {
  if (!isEven(digitCount)) throw new Error('length must be even')
  const halfLength = digitCount / 2
  const halves = nDigitNumbers(halfLength) // e.g. [10 ... 99]
  const halfSets = combinations(halves, length) // e.g. [12, 34, 45]
  return halfSets.map(s =>
    s.map((firstHalf, i) => {
      const secondHalf = s[i === s.length - 1 ? 0 : i + 1]
      return concat(firstHalf, secondHalf)
    })
  )
}
