import { range } from '../lib'

// Special Pythagorean triplet
// ===========================
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for
// which,
//                              a^2 + b^2 = c^2

// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

interface Triplet {
  a: number
  b: number
  c: number
}

const product = ({ a, b, c }: Triplet) => a * b * c

// We're given
// a + b + c = 1000
// a² + b² = c²

// We can eliminate c:
// c = 1000 - a - b
// a² + b² = (1000 - a - b)²

const C = (a: number, b: number) => 1000 - a - b

// Solve for b:
// a² + b² = a² + 2ab - 2000a + b² - 2000b + 1000000
// 0 = 2ab - 2000a - 2000b + 1000000
// 2000b - 2ab = 1000000 - 2000a
// b(2000 - 2a) = 1000000 - 2000a
// b = (1000000 - 2000a) / (2000 - 2a)

// Simplifying:
// b = (500000 - 1000a) / (1000 - a)
//   = 1000(500 - a) / (1000 - a)

const B = (a: number) => (1000 * (500 - a)) / (1000 - a)

// a and b and c are positive integers.
// a is less than 1000.
// So: We try a from 1 to 1000 ...

const A = range({ start: 1, stop: 999 })

// If a is positive, b is positive.
// If a is an integer and b is an integer, c is an integer.
// So we just need to check that:
// - b is an integer
// - c is positive

const match = ({ b, c }: Triplet) => Number.isInteger(b) && c > 0

const makeTriplet = (a: number): Triplet => {
  const b = B(a)
  const c = C(a, b)
  return { a, b, c }
}

export const solution009 = () => product(A.map(makeTriplet).find(match)!)
