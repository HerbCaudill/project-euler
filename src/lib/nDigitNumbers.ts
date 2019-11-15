import { range } from 'lib/range'
export const nDigitNumbers = (digitCount: number) =>
  range(10 ** (digitCount - 1), 10 ** digitCount - 1)
