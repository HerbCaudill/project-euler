import { numberLength } from './numberLength'

export const commonValue = (set: number[], fn: (d: number) => number) => {
  const values = set.map(fn)
  const result = values[0]
  if (values.some(v => result !== v)) return undefined
  return result
}

export const commonLength = (set: number[]) => commonValue(set, numberLength)
