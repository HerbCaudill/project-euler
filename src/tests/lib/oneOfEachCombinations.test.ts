import { oneOfEachCombinations } from 'lib/oneOfEachCombinations'
describe('oneOfEachCombinations', () => {
  test('one set', () => {
    const sets = [[1, 2, 3]]
    expect(oneOfEachCombinations(sets)).toEqual([[1], [2], [3]])
  })

  test('two sets', () => {
    const sets = [[10, 20], [3, 4]]
    expect(oneOfEachCombinations(sets)).toEqual([
      [10, 3],
      [10, 4],
      [20, 3],
      [20, 4],
    ])
  })

  test('three sets', () => {
    const sets = [[100, 200, 300], [40], [5, 6]]
    expect(oneOfEachCombinations(sets)).toEqual([
      [100, 40, 5],
      [100, 40, 6],
      [200, 40, 5],
      [200, 40, 6],
      [300, 40, 5],
      [300, 40, 6],
    ])
  })
})
