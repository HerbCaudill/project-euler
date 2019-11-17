import { digits } from '../../lib/digits'

describe('digits', () => {
  test('number', () => expect(digits(12345)).toEqual([1, 2, 3, 4, 5]))
  test('repeats', () => expect(digits(111432)).toEqual([1, 1, 1, 4, 3, 2]))
  // prettier-ignore
  test('bigint', () => expect(digits(111432342834735481239123987n)).toEqual([ 1, 1, 1, 4, 3, 2, 3, 4, 2, 8, 3, 4, 7, 3, 5, 4, 8, 1, 2, 3, 9, 1, 2, 3, 9, 8, 7, ]))
})
