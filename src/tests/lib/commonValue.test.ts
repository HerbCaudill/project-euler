import { commonValue, commonLength } from '../../lib/commonValue'

describe('commonLength', () => {
  test('[12, 23, 34]', () => expect(commonLength([12, 23, 34])).toBe(2))
  test('[1, 2, 34]', () => expect(commonLength([1, 2, 34])).toBe(undefined))
  test('[99, 98, 97]', () => expect(commonLength([99, 98, 97])).toBe(2))
  test('[100, 101, 102]', () => expect(commonLength([100, 101, 102])).toBe(3))
})
