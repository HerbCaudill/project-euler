import {
  AliquotType,
  allAmicables,
  areAmicable,
  aliquotSumType,
  friend,
  aliquotSum,
} from '../../src/lib'

const { Deficient, Perfect, Abundant } = AliquotType

describe('perfect numbers', () => {
  test.each`
    n     | exp
    ${2}  | ${Deficient}
    ${6}  | ${Perfect}
    ${8}  | ${Deficient}
    ${9}  | ${Deficient}
    ${12} | ${Abundant}
    ${28} | ${Perfect}
  `('$n is $exp', ({ n, exp }) => expect(aliquotSumType(n)).toEqual(exp))
})

describe('amicables', () => {
  test('d', () => {
    expect(aliquotSum(220)).toEqual(284)
    expect(aliquotSum(284)).toEqual(220)
  })

  test('areAmicable', () => {
    expect(areAmicable(220, 284)).toBeTruthy()
    expect(areAmicable(284, 220)).toBeTruthy()
    expect(areAmicable(284, 219)).toBeFalsy()
  })

  test('friend', () => {
    expect(friend(284)).toEqual(220)
    expect(friend(220)).toEqual(284)
    expect(friend(283)).toEqual(undefined)
  })

  test('allAmicables', async () => {
    expect(allAmicables(300)).toEqual([220, 284])
  })
})
