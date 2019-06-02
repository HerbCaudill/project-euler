import { readFileSync, writeFileSync } from 'fs'

export const collatz = (n: number): number[] => {
  if (n <= 1) return [1]
  if (!cache[n] || !cache[n].sequence) {
    const next = step(n)
    const sequence = [n].concat(collatz(next))
    const length = sequence.length
    cache[n] = { next, sequence, length }
  }
  return cache[n].sequence!
}

export const collatzLength = (n: number): number => {
  if (n <= 1) return 1
  if (!cache[n] || !cache[n].length) {
    const next = step(n)
    const sequence = null
    const length = 1 + collatzLength(next)
    cache[n] = { next, sequence, length }
  }
  return cache[n].length!
}

const step = (n: number) => (n % 2 === 0 ? n / 2 : 3 * n + 1)

// Cache

interface CollatzCache {
  [k: number]: {
    next: number
    length: number
    sequence: number[] | null
  }
}

const CACHE_FILE = './src/lib/precomputed/collatz.json'

export const getCache = () => cache
export const clearCache = () => (cache = {})

export const loadCache = () => readFileSync(CACHE_FILE).toJSON()

export const saveCache = () =>
  writeFileSync(CACHE_FILE, JSON.stringify(getCache()))

let cache: CollatzCache = {}
