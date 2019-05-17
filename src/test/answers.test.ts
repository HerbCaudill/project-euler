import { answers } from './answers'
import * as _solutions from '../problems'

const solutions: { [k: string]: () => number } = _solutions

describe('answers', () => {
  Object.keys(solutions)
    .sort()
    .forEach((k: string, i) => {
      const solution = solutions[k]
      const start = new Date().getTime()
      const result = solution()
      const end = new Date().getTime()
      test(`Problem ${i + 1}: ${end - start}ms`, () => {
        if (result === -1) {
          /// skip
        } else {
          expect(result).toEqual(answers[i])
        }
      })
    })
})
