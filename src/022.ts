// Names scores
// ============
// Using names.txt, a 46K text file containing over five-thousand first names,
// begin by sorting it into alphabetical order. Then working out the
// alphabetical value for each name, multiply this value by its alphabetical
// position in the list to obtain a name score.
//
// For example, when the list is sorted into alphabetical order, COLIN, which
// is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So,
// COLIN would obtain a score of 938 * 53 = 49714.
//
// What is the total of all the name scores in the file?

import { nameScore } from './lib/name-score'
import { names } from './resources/022'
import { sum } from './lib/sum'

const nameScoreSum = (names: string[]) =>
  sum(
    names.sort().map((name, i) => {
      const pos = i + 1
      return nameScore(name) * pos
    })
  )

expect(nameScoreSum(['COLIN'])).toBe(53)
expect(nameScoreSum(['COLIN', 'HERB'])).toBe(53 * 1 + 33 * 2)
expect(nameScoreSum(['HERB', 'COLIN'])).toBe(53 * 1 + 33 * 2)

export const solution022 = () => nameScoreSum(names)