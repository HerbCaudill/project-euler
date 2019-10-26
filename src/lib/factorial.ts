export const factorial = (n: number | bigint): bigint =>
  n < 1 ? 1n : BigInt(n) * factorial(BigInt(n) - 1n)
