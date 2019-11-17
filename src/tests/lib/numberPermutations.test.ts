import { numberPermutations } from '../../lib/numberPermutations'

describe('numberPermutations', () => {
  it('should work', () => {
    expect(numberPermutations(123)).toEqual([123, 132, 213, 231, 312, 321])
    expect(numberPermutations(112)).toEqual([112, 121, 211])
  })
})
