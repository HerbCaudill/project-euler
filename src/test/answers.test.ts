import fs from 'fs'
import { answers } from './answers'

let files = fs.readdirSync(`${__dirname}/../problems`)

for (let i = 1; i <= files.length; i++) {
  test(`Problem ${i}`, async () => {
    let filename = i.toString().padStart(3, '0')
    const { answer } = await import(`../problems/${filename}`)
    expect(answer).toEqual(answers[i - 1])
  })
}
