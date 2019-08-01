import { sumCombinations } from './sumCombinations'
describe('sumCombinations', () => {
  it('case 1', () => {
    expect(sumCombinations(5, [5])).toEqual([[5]])
  })
  it('case 2 ', () => {
    expect(sumCombinations(5, [1, 5])).toEqual([[1, 1, 1, 1, 1], [5]])
  })
})
