const path = require('path')
const fs = require('fs')

const corpus = fs.readFileSync('./src/resources/corpus.txt')

const sum = arr => arr.reduce((prev, current) => prev + current, 0)

const toPercentages = ft => {
  const total = sum(Object.values(ft))
  return Object.keys(ft).reduce((result, key) => ({
    ...result,
    [key]: Math.round((ft[+key] * 10000) / total) / 100,
  }))
}

const b = new Buffer.from(corpus)
const ft = b.reduce((r, d) => ({ ...r, [d]: (r[d] || 0) + 1 }), {})
const ft_percent = toPercentages(ft)
console.log(ft_percent)
