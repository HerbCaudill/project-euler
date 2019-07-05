import { isPalindrome } from '../../src/lib/palindrome'

// describe('reverseNumber', () => {
//   const testCase = (n: number, expected: number) =>
//     test(`${n}: ${expected}`, () => expect(reverseNumber(n)).toEqual(expected))

//   testCase(0, 0)
//   testCase(1, 1)
//   testCase(2, 2)
//   testCase(22, 22)
//   testCase(101, 101)
//   testCase(1000, 1)
//   testCase(1234, 4321)
// })

describe('palindrome', () => {
  const testCase = (n: number, expected: boolean) =>
    test(`${n} is ${!expected ? 'not ' : ''}a palindrome`, () =>
      expect(isPalindrome(n)).toEqual(expected))

  testCase(2, true)
  testCase(22, true)
  testCase(202, true)
  testCase(222, true)
  testCase(42224, true)
  testCase(123321, true)
  testCase(1234321, true)
  testCase(1234567887654321, true)

  testCase(123, false)
  testCase(2224, false)
  testCase(123456788765432, false)
  testCase(12345678654321, false)
})
