import { permutations, nthPermutation } from '../../src/lib/permutations'
import { factorial } from '../../src/lib/factorial'

const MAX_SIZE = 8 // skip tests for arrays longer than this

describe('permutations', () => {
  test.each`
    source   | expected
    ${'0'}   | ${`0`}
    ${'01'}  | ${`01 10`}
    ${'10'}  | ${`01 10`}
    ${'012'} | ${'012 021 102 120 201 210'}
    ${'120'} | ${`012 021 102 120 201 210`}
    ${'0123'} | ${`0123 0132 0213 0231 0312 0321 
                   1023 1032 1203 1230 1302 1320 
                   2013 2031 2103 2130 2301 2310 
                   3012 3021 3102 3120 3201 3210`}
  `('$source', ({ source, expected }) => {
    const arr = source.split('')
    const actualArr = permutations(arr)
    const expectedArr = expected.split(/\s+/).map((s: string) => s.split(''))
    expect(actualArr).toEqual(expectedArr)
  })

  test.each`
    source
    ${'0'}
    ${'01'}
    ${'012'}
    ${'0123'}
    ${'01234'}
    ${'012345'}
    ${'0123456'}
    ${'01234567'}
    ${'012345678'}
    ${'0123456789'}
  `('$source count', ({ source }) => {
    const arr = source.split('')
    if (arr.length > MAX_SIZE) return
    const actual = permutations(arr)
    const expectedLength = Number(factorial(arr.length))
    expect(actual.length).toEqual(expectedLength)
  })
})

describe('nthPermutation', () => {
  test.each`
    source          | n              | expected
    ${'012'}        | ${3}           | ${'120'}
    ${'0123'}       | ${0}           | ${'0123'}
    ${'0123'}       | ${1}           | ${'0132'}
    ${'0123'}       | ${14}          | ${'2103'}
    ${'0123'}       | ${16}          | ${'2301'}
    ${'0123'}       | ${17}          | ${'2310'}
    ${'012345678'}  | ${100000 - 1}  | ${'247815360'}
    ${'0123456789'} | ${1000000 - 1} | ${'2783915460'}
  `('permutation #$n of $source is $expected', ({ source, n, expected }) => {
    const arr = source.split('')
    const actual = nthPermutation(arr, n).join('')
    expect(actual).toEqual(expected)
  })
})
