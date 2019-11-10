import { isPolygonal } from '../../lib/polygonalNumbers'

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
