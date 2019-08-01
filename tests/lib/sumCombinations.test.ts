import { sumCombinations, CoinCounts } from '../../src/lib/sumCombinations'

const makeTestCase = (coins: number[]) => (
  total: number,
  expected: CoinCounts[]
) => {
  const actual = sumCombinations(total, coins)
  expect(actual).toEqual(expect.arrayContaining(expected))
  expect(actual).toHaveLength(expected.length)
}

const pennies = 1
const nickels = 5
const dimes = 10
const quarters = 25

describe('sumCombinations', () => {
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
    test.only(`$.06`, () =>
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
  })
})
