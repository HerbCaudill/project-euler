import problems from './problems.json'
const NO_OP = () => {}

export const executeTest = (id: number, solution: Function) => {
  const paddedId = `${id}`.padStart(3, '0')

  // execute function
  const start = new Date().getTime()
  const result = solution()
  const end = new Date().getTime()
  // check answer
  if (result === -1) {
    // -1 is returned to skip the problem, e.g. while working on it
    test.skip(`Problem ${id}`, NO_OP)
  } else {
    const correctAnswer = problems.find(p => p.id === id)!.answer
    test(`Problem ${paddedId}: ${correctAnswer} [${end - start}ms]`, () => {
      expect(result.toString()).toEqual(correctAnswer)
    })
  }
}
