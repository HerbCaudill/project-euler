import { sum } from '.'

describe('sum', () => {
  test('empty array ', () => {
    expect(sum([])).toEqual(0)
  })
  test('single element', () => {
    expect(sum([123])).toEqual(123)
  })
  test('multiple elements', () => {
    expect(sum([1, 2, 3, 4])).toEqual(10)
  })
})
