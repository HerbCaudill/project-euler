import { factorial } from '../../src/lib/factorial'

describe('factorial', () => {
  const testCase = (n: number, expected: bigint) =>
    test(`${n}: ${expected}`, () => expect(factorial(n)).toEqual(expected))

  testCase(1, 1n)
  testCase(2, 2n)
  testCase(3, 6n)
  testCase(4, 24n)
  testCase(5, 120n)
  testCase(20, 2432902008176640000n) // that escalated quickly
  testCase(
    100,
    93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000n
  )
})
