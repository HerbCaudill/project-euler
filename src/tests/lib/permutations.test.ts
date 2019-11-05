import { permutations, nthPermutation } from 'lib/permutations'
import { factorial } from 'lib/factorial'

const MAX_SIZE = 8 // skip tests for arrays longer than this

describe('permutations', () => {
  describe('listing', () => {
    const testCase = (source: string, expected: string) => {
      const arr = source.split('')
      const actualArr = permutations(arr)
      const expectedArr = expected.split(/\s+/).map((s: string) => s.split(''))
      expect(actualArr).toEqual(expectedArr)
    }

    test('0', () => testCase('0', '0'))
    test('01', () => testCase('01', '01 10'))
    test('10', () => testCase('10', '01 10'))
    test('012', () => testCase('012', '012 021 102 120 201 210'))
    test('120', () => testCase('120', '012 021 102 120 201 210'))
    test('0123', () =>
      testCase(
        '0123',
        `0123 0132 0213 0231 0312 0321
         1023 1032 1203 1230 1302 1320 
         2013 2031 2103 2130 2301 2310 
         3012 3021 3102 3120 3201 3210`
      ))
  })

  describe('counting', () => {
    const testCase = (source: string) => {
      const arr = source.split('')
      if (arr.length > MAX_SIZE) return
      const actual = permutations(arr)
      const expectedLength = Number(factorial(arr.length))
      expect(actual.length).toEqual(expectedLength)
    }

    test('0', () => testCase('0'))
    test('01', () => testCase('01'))
    test('012', () => testCase('012'))
    test('0123', () => testCase('0123'))
    test('01234', () => testCase('01234'))
    test('012345', () => testCase('012345'))
    test('0123456', () => testCase('0123456'))
    test('01234567', () => testCase('01234567'))
    test('012345678', () => testCase('012345678'))
    test('0123456789', () => testCase('0123456789'))
  })

  describe('find nth permutation', () => {
    const testCase = (source: string, n: number, expected: string) => {
      const arr = source.split('')
      const actual = nthPermutation(arr, n).join('')
      expect(actual).toEqual(expected)
    }

    test('012', () => testCase('012', 3, '120'))
    test('012', () => testCase('012', 3, '120'))
    test('0123', () => testCase('0123', 0, '0123'))
    test('0123', () => testCase('0123', 1, '0132'))
    test('0123', () => testCase('0123', 14, '2103'))
    test('0123', () => testCase('0123', 16, '2301'))
    test('0123', () => testCase('0123', 17, '2310'))
    test('012345678', () => testCase('012345678', 100000 - 1, '247815360'))
    test('0123456789', () => testCase('0123456789', 1000000 - 1, '2783915460'))
  })
})
