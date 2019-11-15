import { isPrimePair } from 'lib/primePairs'

describe('isPrimePair', () => {
  test('3, 7', () => expect(isPrimePair([3, 7])).toBe(true))
  test('7, 109', () => expect(isPrimePair([7, 109])).toBe(true))
  test('3, 109', () => expect(isPrimePair([3, 109])).toBe(true))
  test('109, 673', () => expect(isPrimePair([109, 673])).toBe(true))
  test('113, 673', () => expect(isPrimePair([113, 673])).toBe(false))
})
