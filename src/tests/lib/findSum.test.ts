import { primesUpTo } from 'lib/primes'
import { findSum } from 'lib/find-sum'
const p = primesUpTo(3428)

describe('find-sum', () => {
  test('works ', () => {
    expect(findSum(20, p)).toEqual([3, 17])
    expect(findSum(1234, p)).toEqual([3, 1231])
    expect(findSum(3248, p)).toEqual([19, 3229])
    // expect(findSum(77777, p)).toEqual(undefined) // slow test
  })
})
