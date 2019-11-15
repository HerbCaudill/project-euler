import { numberLength } from '../../lib/numberLength'

describe('numberLength', () => {
  test.each`
    n       | expected
    ${2}    | ${1}
    ${12}   | ${2}
    ${123}  | ${3}
    ${1234} | ${4}
  `('numberLength', ({ n, expected }) => {
    expect(numberLength(n)).toBe(expected)
  })
})
