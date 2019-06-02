import { numberToWords } from '.'

describe('numberToWords', () => {
  const testCase = (n: number, s: string) =>
    test(`${n}`, () => expect(numberToWords(n)).toEqual(s))

  testCase(0, 'zero')
  testCase(1, 'one')
  testCase(7, 'seven')
  testCase(13, 'thirteen')
  testCase(20, 'twenty')
  testCase(21, 'twenty-one')
  testCase(30, 'thirty')
  testCase(77, 'seventy-seven')
  testCase(93, 'ninety-three')
  testCase(99, 'ninety-nine')
  testCase(100, 'one hundred')
  testCase(101, 'one hundred and one')
  testCase(200, 'two hundred')
  testCase(232, 'two hundred and thirty-two')
  testCase(999, 'nine hundred and ninety-nine')
})
