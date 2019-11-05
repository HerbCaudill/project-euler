import { isPandigital } from 'lib/panDigital'

describe('isPandigital', () => {
  describe('not pandigital', () => {
    test('12345', () => expect(isPandigital(12345)).toBe(false))
    test('333333333', () => expect(isPandigital(333333333)).toBe(false))
    test('1234567890123', () => expect(isPandigital(1234567890123)).toBe(false))
  })

  describe('default - 1 to 9 pandigital', () => {
    test('123456789', () => expect(isPandigital(123456789)).toBe(true))
    test('192384576', () => expect(isPandigital(192384576)).toBe(true))
    test('918273645', () => expect(isPandigital(918273645)).toBe(true))
  })

  describe('1 to K pandigital', () => {
    test('4231, 4', () => expect(isPandigital(4231, 4)).toBe(true))
    test('42318756, 8', () => expect(isPandigital(42318756, 8)).toBe(true))
    test('123456789, 4', () => expect(isPandigital(123456789, 4)).toBe(false))
  })
})
