export const digits = (n: number | bigint) =>
  n
    .toString()
    .split('')
    .map(Number)
