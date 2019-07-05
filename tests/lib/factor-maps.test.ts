import { factorArrayToFactorMap, FactorMap, factorMap } from '../../src/lib/factor-maps'

describe('factorArrayToFactorMap', () => {
  const testCase = (n: number[], result: FactorMap) =>
    test(`${n}`, () => {
      expect(factorArrayToFactorMap(n)).toEqual(result)
    })

  testCase([2], { 2: 1 })
  testCase([2, 3], { 2: 1, 3: 1 })
  testCase([2, 2, 2, 3, 3, 5], { 2: 3, 3: 2, 5: 1 })
})

describe('factorMaps', () => {
  const testCase = (n: number, result: FactorMap) =>
    test(`${n}`, () => {
      expect(factorMap(n)).toEqual(result)
    })

  testCase(2, { 2: 1 })
  testCase(6, { 2: 1, 3: 1 })
  testCase(360, { 2: 3, 3: 2, 5: 1 })
})
