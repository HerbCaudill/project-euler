import { digitCount } from '../../lib/digitCount'

describe('digitCount', () => {
  test('1 digit', () => {
    expect(digitCount(0)).toBe(1)
    expect(digitCount(1)).toBe(1)
    expect(digitCount(3)).toBe(1)
  })
  test('2 digits', () => {
    expect(digitCount(10)).toBe(2)
    expect(digitCount(11)).toBe(2)
    expect(digitCount(99)).toBe(2)
  })
  test('3 digits', () => {
    expect(digitCount(100)).toBe(3)
    expect(digitCount(101)).toBe(3)
    expect(digitCount(999)).toBe(3)
  })
  test('many digits', () => {
    expect(digitCount(1234572134892)).toBe(13)
    expect(digitCount(9007199254740991)).toBe(16)
  })
})
