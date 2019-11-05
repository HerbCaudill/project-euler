import { factorArrayToFactorMap, FactorMap, factorMap } from 'lib/factor-maps'

describe('factorArrayToFactorMap', () => {
  const testCase = (n: number[], result: FactorMap) =>
    expect(factorArrayToFactorMap(n)).toEqual(result)

  test('[2]', () => testCase([2], { 2: 1 }))
  test('[2, 3]', () => testCase([2, 3], { 2: 1, 3: 1 }))
  test('[2, 2, 2, 3, 3, 5]', () =>
    testCase([2, 2, 2, 3, 3, 5], { 2: 3, 3: 2, 5: 1 }))
})

describe('factorMap', () => {
  const testCase = (n: number, result: FactorMap) =>
    expect(factorMap(n)).toEqual(result)

  test('1', () => testCase(1, { 1: 1 }))
  test('2', () => testCase(2, { 2: 1 }))
  test('6', () => testCase(6, { 2: 1, 3: 1 }))
  test('360', () => testCase(360, { 2: 3, 3: 2, 5: 1 }))
})
