import { sum } from '.'

export const nameScore = (s: string): number =>
  sum(s.split('').map(letterScore))

export const letterScore = (c: string): number =>
  c.charCodeAt(0) - 'A'.charCodeAt(0) + 1
