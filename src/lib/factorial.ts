export const factorial = (n: number): bigint =>
  n === 1 ? 1n : BigInt(n) * factorial(n - 1)
