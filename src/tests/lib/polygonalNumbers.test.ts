import { isPolygonal, PolygonalSequence } from '../../lib/polygonalNumbers'

describe('polygonal numbers', () => {
  test.each`
    n     | expected
    ${1}  | ${true}
    ${3}  | ${true}
    ${6}  | ${true}
    ${10} | ${true}
    ${15} | ${true}
    ${16} | ${false}
    ${17} | ${false}
  `('triangle numbers', ({ n, expected }) => {
    expect(isPolygonal(3)(n)).toBe(expected)
  })

  test.each`
    n     | expected
    ${1}  | ${true}
    ${4}  | ${true}
    ${9}  | ${true}
    ${16} | ${true}
    ${25} | ${true}
    ${26} | ${false}
    ${27} | ${false}
  `(`square numbers`, ({ n, expected }) => {
    expect(isPolygonal(4)(n)).toBe(expected)
  })

  test.each`
    n     | expected
    ${1}  | ${true}
    ${5}  | ${true}
    ${12} | ${true}
    ${22} | ${true}
    ${35} | ${true}
    ${36} | ${false}
    ${37} | ${false}
  `(`pentagonal numbers`, ({ n, expected }) => {
    expect(isPolygonal(5)(n)).toBe(expected)
  })
})

describe('PolygonalSequence', () => {
  it('triangular', () =>
    expect(new PolygonalSequence(3).valuesUpTo(20)).toEqual([1, 3, 6, 10, 15]))
  it('square', () =>
    expect(new PolygonalSequence(4).valuesUpTo(30)).toEqual([1, 4, 9, 16, 25]))
  it('pentagonal', () =>
    expect(new PolygonalSequence(5).valuesUpTo(40)).toEqual([1, 5, 12, 22, 35]))
  it('hexagonal', () =>
    expect(new PolygonalSequence(6).valuesUpTo(50)).toEqual([1, 6, 15, 28, 45]))
})
