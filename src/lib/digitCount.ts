export const digitCount = (n: number) =>
  n === 0 ? 1 : Math.trunc(Math.log10(n)) + 1

export const hasXDigits = (x: number) => (n: number) => digitCount(n) === x
