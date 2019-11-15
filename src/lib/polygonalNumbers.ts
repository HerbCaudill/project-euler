import { isInteger } from './integer'
import { Sequence } from './Sequence'

// Triangle     P[3,n]=n(n+1)/2    1, 3, 6, 10, 15, ...    ½(n² + n)
// Square       P[4,n]=n^2         1, 4, 9, 16, 25, ...
// Pentagonal   P[5,n]=n(3n-1)/2   1, 5, 12, 22, 35, ...   2n² - n
// Hexagonal    P[6,n]=n(2n-1)     1, 6, 15, 28, 45, ...
// Heptagonal   P[7,n]=n(5n-3)/2   1, 7, 18, 34, 55, ...
// Octagonal    P[8,n]=n(3n-2)     1, 8, 21, 40, 65, ...

export const isPolygonal = (s: number) => (n: number) =>
  isInteger(
    (Math.sqrt(8 * (s - 2) * n + (s - 4) ** 2) + (s - 4)) / (2 * (s - 2))
  )

export const isTriangleNumber = isPolygonal(3)
export const isSquare = isPolygonal(4)
export const isPentagonal = isPolygonal(5)

export class PolygonalSequence extends Sequence<number> {
  constructor(s: number) {
    const fn = (n: number) => (n ** 2 * (s - 2) - n * (s - 4)) / 2
    super(fn)
  }
}
