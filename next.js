const path = require('path')
const fs = require('fs')
const problems = require('./problems.json')

const nextId =
  +fs
    .readdirSync('./src/problems')
    .map(f => path.parse(f).name)
    .filter(f => Number.isInteger(+f))
    .pop() + 1

const nextFileName = `${nextId}`.padStart(3, '0')
const problem = problems.find(p => p.id === nextId)
const problemText = `
${problem.name}
${''.padStart(problem.name.length, '=')}
${problem.description}`
  .split('\n')
  .join('\n// ')

const fileText = `${problemText}

export const solution${nextFileName} = () => -1`

fs.writeFileSync(`./src/problems/${nextFileName}.ts`, fileText)
