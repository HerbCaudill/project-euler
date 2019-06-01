export const collatz = (n: number, result = [n]): number[] => {
  if (n === 1) return result
  const next = isEven(n) ? n / 2 : 3 * n + 1
  return collatz(next, result.concat(next))
}

const isEven = (n: number) => n % 2 === 0
