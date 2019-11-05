import { sumCombinations, Counts } from 'lib/sumCombinations'

describe('sumCombinations', () => {
  const makeTestCase = (coins: number[]) => (
    total: number,
    expected: Counts[]
  ) => {
    const actual = sumCombinations(total, coins)
    expected.forEach(arr =>
      expect(actual).toEqual(expect.arrayContaining([arr]))
    )
    expect(actual).toHaveLength(expected.length)
  }

  const pennies = 1
  const nickels = 5
  const dimes = 10
  const quarters = 25

  describe('pennies', () => {
    const t = makeTestCase([pennies])
    test(`$.04`, () => t(4, [{ 1: 4 }])) // 4 pennies
    test(`$.05`, () => t(5, [{ 1: 5 }])) // 5 pennies
  })

  describe('nickels', () => {
    const t = makeTestCase([nickels])
    test(`$.04`, () => t(4, [])) // can't make change
    test(`$.05`, () => t(5, [{ 5: 1 }])) // one nickel
    test(`$.06`, () => t(6, [])) // can't make change
  })

  describe('pennies and nickels', () => {
    const t = makeTestCase([pennies, nickels])
    test(`$.04`, () => t(4, [{ 1: 4 }])) // 4 pennies
    test(`$.05`, () =>
      t(5, [
        { 1: 5 }, // 5 pennies
        { 5: 1 }, // 1 nickel
      ]))
    test(`$.06`, () =>
      t(6, [
        { 5: 1, 1: 1 }, // 1 nickel + 1 penny
        { 1: 6 }, // 6 pennies
      ]))
    test(`$.10`, () =>
      t(10, [
        { 1: 10 }, // 10 pennies
        { 5: 2 }, // 2 nickels
        { 5: 1, 1: 5 }, // 1 nickel + 5 pennies
      ]))
    test(`$.11`, () =>
      t(11, [
        { 1: 11 }, // 11 pennies
        { 5: 2, 1: 1 }, // 2 nickels, 1 penny
        { 5: 1, 1: 6 }, // 1 nickel + 6 pennies
      ]))
  })

  describe('pennies, nickels, and dimes', () => {
    const t = makeTestCase([pennies, nickels, dimes])
    test(`$.10`, () =>
      t(10, [
        { 1: 10 }, // 10 pennies
        { 5: 2 }, // 2 nickels
        { 5: 1, 1: 5 }, // 1 nickel + 5 pennies
        { 10: 1 }, // 1 dime
      ]))
    test(`$.11`, () =>
      t(11, [
        { 1: 11 }, // 10 pennies
        { 5: 2, 1: 1 }, // 2 nickels
        { 5: 1, 1: 6 }, // 1 nickel + 6 pennies
        { 10: 1, 1: 1 }, // 1 dime + 1 penny
      ]))
  })

  describe('dimes and quarters', () => {
    const t = makeTestCase([dimes, quarters])
    test(`$1.00`, () =>
      t(100, [
        { 10: 10 }, //..
        { 10: 5, 25: 2 },
        { 25: 4 },
      ]))
  })

  describe('dimes, quarters, nickels', () => {
    const t = makeTestCase([dimes, quarters, nickels])
    test(`$1.00`, () =>
      t(50, [
        { 25: 2 }, //..
        { 25: 1, 10: 2, 5: 1 },
        { 25: 1, 10: 1, 5: 3 },
        { 25: 1, 5: 5 },
        { 10: 5 },
        { 10: 4, 5: 2 },
        { 10: 3, 5: 4 },
        { 10: 2, 5: 6 },
        { 10: 1, 5: 8 },
        { 5: 10 },
      ]))
  })
})
