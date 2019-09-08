import { primeFactors } from './prime-factors'
import { product } from './product'

export const eliminateCommon = (a: number[], b: number[]) => {
  const a1 = [...a]
  const b1 = [...b]
  a.forEach(x => {
    const i = a1.findIndex(x1 => x1 === x)
    const j = b1.findIndex(y => y === x)
    if (j >= 0 && i >= 0) {
      a1.splice(i, 1)
      b1.splice(j, 1)
    }
  })
  return [a1, b1]
}

export const simplify = ([num, den]: number[]) => {
  if (num === 1 || den === 1 || num === 0 || den === 0) return [num, den]
  const numFactors = primeFactors(num)
  const denFactors = primeFactors(den)
  const [uniqueNumFactors, uniqueDenFactors] = eliminateCommon(
    numFactors,
    denFactors
  )
  const simpleNum = product(uniqueNumFactors)
  const simpleDen = product(uniqueDenFactors)
  expect(num / den).toEqual(simpleNum / simpleDen)
  return [simpleNum, simpleDen]
}
