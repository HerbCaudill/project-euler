import { fibonacci } from './lib/fibonacci'
import { sum } from './lib/sum'

// Problem 2
// =========
// Each new term in the Fibonacci sequence is generated by adding the
// previous two terms. By starting with 1 and 2, the first 10 terms will be:
//    1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
// Find the sum of all the even-valued terms in the sequence which do not
// exceed four million.

const isEven = (n: number) => n % 2 === 0
const evenOnly = (arr: number[]) => arr.filter(isEven)

const max = 4000000

export const solution002 = () => {
  const series = fibonacci({ max })
  return sum(evenOnly(series))
}
