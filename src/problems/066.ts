import { isInteger } from 'lib/integer'
import { isSquare } from 'lib/polygonalNumbers'
import { range } from 'lib/range'

// Diophantine equation
// ====================
// Consider quadratic Diophantine equations of the form:
//
//                               x² - Dy² = 1
//
// For example, when D=13, the minimal solution in x is 649² - 13 * 180² = 1.
//
// It can be assumed that there are no solutions in positive integers when D
// is square.
//
// By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the
// following:
//
// 3² - 2 * 2² = 1
// 2² - 3 * 1² = 1
// 9² - 5 * 4² = 1
// 5² - 6 * 2² = 1
// 8² - 7 * 3² = 1
//
// Hence, by considering minimal solutions in x for D<=7, the largest x is
// obtained when D=5.
//
// Find the value of D<=1000 in minimal solutions of x for which the largest
// value of x is obtained.

/*

x² - Dy² = 1
- Dy² = 1 - x² 
Dy² = x² - 1
y² = (x² - 1)/D
y = √((x² - 1)/D)

*/

const minimalSolution = (D: number) => {
  if (isSquare(D)) return -1
  let x = 1
  while (true) {
    const y = Math.sqrt((x ** 2 - 1) / D)
    if (isInteger(y) && y > 0) return x
    x += 1
  }
}
{
  expect(minimalSolution(2)).toBe(3)
  expect(minimalSolution(3)).toBe(2)
  expect(minimalSolution(5)).toBe(9)
  expect(minimalSolution(6)).toBe(5)
  expect(minimalSolution(7)).toBe(8)
}

const largestMinimalSolution = (max: number) => {
  const solutions = range(1, max)
    .map(d => ({ d, solution: minimalSolution(d) }))
    .filter(d => d.solution !== -1)
  return solutions.reduce(
    (best, d) => (d.solution > best.solution ? d : best),
    { d: -1, solution: -1 }
  ).d
}

expect(largestMinimalSolution(7)).toBe(5)

export const solution066 = () => largestMinimalSolution(70)
