export const sum = (arr: number[]) =>
  arr.reduce((prev, current) => prev + current, 0)

export const bigSum = (arr: (number | BigInt)[]) =>
  arr.reduce((prev, current) => BigInt(prev) + BigInt(current), 0n)
