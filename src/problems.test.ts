import problems from './problems.json'
import * as _solutions from '.'

const solutions: { [k: string]: Function } = _solutions

const SOLUTION_NAME_PATTERN = /solution(\d+)/
const NO_OP = () => {}

describe('answers', () => {
  Object.keys(solutions)
    .sort()
    .forEach((functionName: string) => {
      const solution = solutions[functionName]
      // only run functions named like `solution013`
      if (SOLUTION_NAME_PATTERN.test(functionName)) {
        // get the problem id
        const id = +functionName.match(SOLUTION_NAME_PATTERN)![1] // e.g. solution013 -> 13

        // execute function
        const start = new Date().getTime()
        const result = solution()
        const end = new Date().getTime()
        // check answer
        if (result === -1) {
          // -1 is returned to skip the problem, e.g. while working on them
          test.skip(`Problem ${id}`, NO_OP)
        } else {
          const correctAnswer = problems.find(p => p.id === id)!.answer
          test(`Problem ${id}: ${correctAnswer} [${end - start}ms]`, () => {
            expect(result.toString()).toEqual(correctAnswer)
          })
        }
      }
    })
})
