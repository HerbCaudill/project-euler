export const sum = (arr: number[]) =>
  arr.reduce((prev, current) => prev + (current || 0), 0)
