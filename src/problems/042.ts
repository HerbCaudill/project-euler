import { sum } from 'lib/sum'
import { words } from '../resources/042'

// Coded triangle numbers
// ======================
// The nth term of the sequence of triangle numbers is given by, t[n] =
// n(n+1)/2; so the first ten triangle numbers are:
//
//                  1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
//
// By converting each letter in a word to a number corresponding to its
// alphabetical position and adding these values we form a word value. For
// example, the word value for SKY is 19 + 11 + 25 = 55 = t[10]. If the word
// value is a triangle number then we shall call the word a triangle word.
//
// Using words.txt, a 16K text file containing nearly two-thousand common
// English words, how many are triangle words?

const t = (n: number) => (n * (n + 1)) / 2

function* tGenerator(): IterableIterator<number> {
  let n = 1
  while (true) yield t(n++)
}

const knownTs: number[] = [t(1)]

const highestKnownT = () => knownTs[knownTs.length]

const isT = (x: number) => {
  let tNumbers = tGenerator()
  let nextT: number = highestKnownT()
  do {
    nextT = tNumbers.next().value
    knownTs.push(nextT)
  } while (nextT < x)
  return knownTs.includes(x)
}

expect(isT(55)).toBe(true)
expect(isT(1)).toBe(true)
expect(isT(21)).toBe(true)
expect(isT(20)).toBe(false)

const asciiOffset = 'A'.charCodeAt(0) - 1
const wordValue = (word: string) =>
  sum(
    word
      .toUpperCase()
      .split('')
      .map(c => c.charCodeAt(0) - asciiOffset)
  )

expect(wordValue('SKY')).toBe(55)
expect(wordValue('FOOBAR')).toBe(57)

const isTriangleWord = (word: string) => isT(wordValue(word))

expect(isTriangleWord('SKY')).toBe(true)
expect(isTriangleWord('FOOBAR')).toBe(false)

export const solution042 = () => words.filter(isTriangleWord).length
