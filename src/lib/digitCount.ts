export const digitCount = (n: number) => Math.trunc(Math.log10(n))
export const hasXDigits = (x: number) => (n: number) => digitCount(n) === x
