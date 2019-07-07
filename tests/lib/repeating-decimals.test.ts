import { repeatingDecimals } from '../../src/lib/repeating-decimals'
test.each`
  n     | exp
  ${2}  | ${''}
  ${3}  | ${'3'}
  ${4}  | ${''}
  ${6}  | ${'6'}
  ${7}  | ${'142857'}
  ${13} | ${'076923'}
  ${28} | ${'571428'}
  ${51} | ${'0196078431372549'}
  ${92} | ${'0869565217391304347826'}
  ${96} | ${'6'}
`('$n: $exp', ({ n, exp }) => {
  expect(repeatingDecimals(n)).toEqual(exp)
})
