import { areAmicable, divisorSum, friend, allAmicables } from '../../src/lib'

describe('amicables', () => {
  test('d', () => {
    expect(divisorSum(220)).toEqual(284)
    expect(divisorSum(284)).toEqual(220)
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
