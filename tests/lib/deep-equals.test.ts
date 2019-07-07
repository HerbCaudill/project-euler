import { deepEquals } from '../../src/lib/deep-equals'

describe('deepEquals', () => {
  test.each`
    i     | a                        | b                        | exp
    ${1}  | ${{ a: 1 }}              | ${{ a: 1 }}              | ${true}
    ${2}  | ${{ a: 1, b: 2 }}        | ${{ a: 1, b: 2 }}        | ${true}
    ${3}  | ${{ a: 1 }}              | ${{ a: 2 }}              | ${false}
    ${4}  | ${{ a: 1 }}              | ${{ b: 1 }}              | ${false}
    ${5}  | ${{ a: 1, b: 2 }}        | ${{ b: 2 }}              | ${false}
    ${6}  | ${{ a: 1 }}              | ${{ a: 1, b: 2 }}        | ${false}
    ${7}  | ${[1, 2]}                | ${[1, 2]}                | ${true}
    ${7}  | ${[1, 2]}                | ${[1]}                   | ${false}
    ${8}  | ${[1, 2]}                | ${[1, 3]}                | ${false}
    ${9}  | ${{ a: 1, b: { c: 2 } }} | ${{ a: 1, b: { c: 2 } }} | ${true}
    ${10} | ${{ a: 1, b: { c: 2 } }} | ${{ a: 1, b: { c: 3 } }} | ${false}
    ${11} | ${{ a: 1, b: { c: 2 } }} | ${{ a: 1, b: { d: 2 } }} | ${false}
  `('$i', ({ i, a, b, exp }) => {
    expect(deepEquals(a, b)).toBe(exp)
  })
})
