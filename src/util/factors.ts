import { primes } from './primes'

export const factors = (n: number): number[] => {
  if (n < 2) return []
  let candidates = primes(n / 2 + 1)
  const visit = (n: number, acc: number[] = []): number[] => {
    const factor = candidates.find((f: number) => n % f === 0)
    if (factor === undefined) {
      return acc
    } else {
      return visit(n / factor, acc.concat(factor))
    }
  }
  return visit(n)
}
