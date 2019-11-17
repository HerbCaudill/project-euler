export const digitCount = (n: number) => Math.trunc(Math.log10(n)) - 1
export const hasXDigits = (x: number) => (n: number) => digitCount(n) === x
