import { isInteger } from '../../lib/integer'

describe('isInteger', () => {
  test('2', () => expect(isInteger(2)).toBe(true))
  test('2.5', () => expect(isInteger(2.5)).toBe(false))
})
