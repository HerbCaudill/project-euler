import { sumCombinations } from './sumCombinations'
describe('sumCombinations', () => {
  it('$.04, nickels', () => expect(sumCombinations(4, [5])).toEqual([]))
  it('$.05, nickels', () => {
    expect(sumCombinations(5, [5])).toEqual([[5]])
  })
  it('$.05, nickels & pennies', () => {
    expect(sumCombinations(5, [1, 5])).toEqual([[1, 1, 1, 1, 1], [5]])
  })
})
