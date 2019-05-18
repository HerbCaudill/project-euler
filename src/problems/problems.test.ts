import problems from './problems.json'
import * as _solutions from '.'

const solutions: { [k: string]: () => number | string } = _solutions

describe('answers', () => {
  Object.keys(solutions)
    .sort()
    .forEach((k: string, i) => {
      const solution = solutions[k]
      const start = new Date().getTime()
      const result = solution()
      const end = new Date().getTime()
      const id = i + 1
      test(`Problem ${id}: ${end - start}ms`, () => {
        if (result === -1) {
          /// skip
        } else {
          const correctAnswer = problems.find(p => p.id === id)!.answer
          expect(result.toString()).toEqual(correctAnswer)
        }
      })
    })
})
