import { nameScore, letterScore } from '../../src/lib/name-score'

describe('nameScore', () => {
  test('COLIN ', () => expect(nameScore('COLIN')).toBe(3 + 15 + 12 + 9 + 14))
  test('HERB ', () => expect(nameScore('HERB')).toBe(8 + 5 + 18 + 2))
})

describe('letterScore', () => {
  test('A', () => expect(letterScore('A')).toBe(1))
  test('C', () => expect(letterScore('C')).toBe(3))
  test('E', () => expect(letterScore('E')).toBe(5))
  test('H', () => expect(letterScore('H')).toBe(8))
  test('R', () => expect(letterScore('R')).toBe(18))
  test('Z', () => expect(letterScore('Z')).toBe(26))
})
