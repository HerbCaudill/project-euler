import { d, areAmicable, amicablePair, allAmicables } from '.'

describe('amicables', () => {
  test('d', () => {
    expect(d(220)).toEqual(284)
    expect(d(284)).toEqual(220)
  })

  test('areAmicable', () => {
    expect(areAmicable(220, 284)).toBeTruthy()
    expect(areAmicable(284, 220)).toBeTruthy()
    expect(areAmicable(284, 219)).toBeFalsy()
  })

  test('amicablePair', () => {
    expect(amicablePair(284)).toEqual([220, 284])
    expect(amicablePair(283)).toEqual([])
  })

  test('allAmicables', async () => {
    expect(allAmicables(300)).toEqual([220, 284])
  })
})
