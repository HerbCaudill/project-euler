import { numberToWords } from '.'

describe('numberToWords', () => {
  const testCase = (n: number, s: string) =>
    test(`${n}: ${s}`, () => expect(numberToWords(n)).toEqual(s))

  testCase(0, 'zero')
  testCase(1, 'one')
  testCase(7, 'seven')
  testCase(13, 'thirteen')
  testCase(20, 'twenty')
  testCase(30, 'thirty')
  testCase(42, 'forty-two')
  testCase(99, 'ninety-nine')

  testCase(100, 'one hundred')
  testCase(101, 'one hundred and one')
  testCase(200, 'two hundred')
  testCase(232, 'two hundred and thirty-two')
  testCase(999, 'nine hundred and ninety-nine')

  testCase(1000, 'one thousand')
  testCase(1001, 'one thousand and one')
  testCase(2574, 'two thousand five hundred and seventy-four')
  testCase(12_345, 'twelve thousand three hundred and forty-five')
  testCase(200_042, 'two hundred thousand and forty-two')
  testCase(
    999_999,
    'nine hundred and ninety-nine thousand nine hundred and ninety-nine'
  )

  testCase(10 ** 6, 'one million')
  testCase(10 ** 6 + 1, 'one million and one')

  testCase(
    12_345_678_901_234,
    'twelve trillion three hundred and forty-five billion six hundred and seventy-eight million nine hundred and one thousand two hundred and thirty-four'
  )
})
