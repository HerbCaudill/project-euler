export const findSum = (n: number, arr: number[]): number[] | undefined => {
  const a = arr.find(a => a <= n / 2 && arr.includes(n - a))
  if (a !== undefined) return [a, n - a]
  return undefined
}
