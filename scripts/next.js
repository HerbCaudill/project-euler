const path = require('path')
const fs = require('fs')
const problems = require('../src/problems.json')
const prettier = require('prettier')
const prettierConfig = require('../package.json').prettier

const nextFile = (dir, template, suffix = '') => {
  const nextId =
    +fs
      .readdirSync(dir)
      .map(f => path.parse(f).name.replace(suffix, ''))
      .filter(f => Number.isInteger(+f))
      .pop() + 1 || 1

  const nextFileName = `${nextId}`.padStart(3, '0')
  const fileText = prettier.format(template(nextId), {
    ...prettierConfig,
    parser: 'typescript',
  })
  fs.writeFileSync(`${dir}/${nextFileName}${suffix}.ts`, fileText)
}

const problemTemplate = nextId => {
  const nextFileName = `${nextId}`.padStart(3, '0')
  const problem = problems.find(p => p.id === nextId)
  const divider = ''.padStart(problem.name.length, '=')
  const heading = [
    '',
    problem.name,
    divider,
    ...problem.description.split('\n'),
  ].join('\n// ') // comment out problem heading

  return `
    ${heading}

    export const solution${nextFileName} = () => -1`.trim()
}

const testTemplate = nextId => {
  const nextFileName = `${nextId}`.padStart(3, '0')
  const problem = problems.find(p => p.id === nextId)
  return `
    import { solution${nextFileName} } from '../src/${nextFileName}'
    import { executeTest } from '../src/execute'
    executeTest(${nextId}, solution${nextFileName})
    `.trim()
}

nextFile('./src/problems', problemTemplate)
nextFile('./tests/problems', testTemplate, '.test')
