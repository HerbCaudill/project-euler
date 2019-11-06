import fs from 'fs'
const profiler = require('v8-profiler-node8')

export const profile = (fn: Function) => {
  profiler.startProfiling()
  fn()
  const profile = profiler.stopProfiling()
  profile.export((err: any, result: any) => {
    fs.writeFileSync('profile.cpuprofile', result)
    profile.delete()
  })
}
