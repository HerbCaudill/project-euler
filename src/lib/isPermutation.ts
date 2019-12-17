import { toDigits } from './toDigits'

export const isPermutation = (n1: number | string) => (n2: number | string) => {
  const d1 = toDigits(n1).sort()
  const d2 = toDigits(n2).sort()
  return !d1.some((d, i) => d !== d2[i])
}
