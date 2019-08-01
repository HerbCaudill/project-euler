import { sumCombinations } from './sumCombinations'
describe('sumCombinations', () => {
  it('should ', () => {
    expect(sumCombinations(5, [5])).toEqual([[5]])
    expect(sumCombinations(5, [1, 5])).toEqual([[1, 1, 1, 1, 1], [5]])
  })
})
