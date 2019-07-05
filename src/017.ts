import { transcribe } from './lib/transcribe'
import { range } from './lib/range'
import { sum } from './lib/sum'

// Number letter counts
// ====================
// If the numbers 1 to 5 are written out in words: one, two, three, four,
// five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
//
// If all the numbers from 1 to 1000 (one thousand) inclusive were written
// out in words, how many letters would be used?
//
// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and
// forty-two) contains 23 letters and 115 (one hundred and fifteen) contains
// 20 letters. The use of "and" when writing out numbers is in compliance
// with British usage.

const removeWhiteSpaceAndDashes = (s: string): string =>
  s.replace(/(\s|\-)/g, '')

expect(removeWhiteSpaceAndDashes('twelve')).toEqual('twelve')
expect(removeWhiteSpaceAndDashes('three hundred and forty-two')).toEqual(
  'threehundredandfortytwo'
)

const numberLetterCount = (n: number): number =>
  removeWhiteSpaceAndDashes(transcribe(n)).length

expect(numberLetterCount(1)).toEqual(3)
expect(numberLetterCount(115)).toEqual(20)
expect(numberLetterCount(342)).toEqual(23)

const R = range({ start: 1, stop: 1000 })

export const solution017 = () => sum(R.map(numberLetterCount))
