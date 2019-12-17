import { isPermutation } from '../../lib/isPermutation'

describe('isPermutation', () => {
  it('should work', () => {
    expect(isPermutation(1234)(4321)).toBe(true)
    expect(isPermutation(4723)(3274)).toBe(true)
    expect(isPermutation(4723)(1234)).toBe(false)
  })
})
