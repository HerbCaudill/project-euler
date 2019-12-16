import { phi } from 'lib/phi'

describe('phi', () => {
  it('should work', () => {
    expect(phi(1)).toBe(1)
    expect(phi(2)).toBe(1)
    expect(phi(9)).toBe(6)
    expect(phi(10)).toBe(4)
  })
})
