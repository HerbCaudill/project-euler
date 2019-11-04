// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test

// with these bases, Miller-Rabin is deterministic
const bases = {
  '9007199254740991': [2, 3, 5, 7, 11, 13, 17, 19, 23], // MAX_SAFE_INTEGER - 1
  '341550071728321': [2, 3, 5, 7, 11, 13, 17],
  '3474749660383': [2, 3, 5, 7, 11, 13],
  '2152302898747': [2, 3, 5, 7, 11],
  '3215031751': [2, 3, 5, 7],
  '25326001': [2, 3, 5],
  '1373653': [2, 3],
  '2047': [2],
} as { [k: string]: number[] }

const lookupBases = (n: number): number[] => {
  const keys = Object.keys(bases)
    .map(d => +d)
    .sort((a, b) => a - b)
  const key = keys.find(d => n < d)
  return key ? bases[key] : [2]
}
{
  expect(lookupBases(9007199254740991 - 1)).toHaveLength(9)
  expect(lookupBases(341550071728321 - 1)).toHaveLength(7)
  expect(lookupBases(3474749660383 - 1)).toHaveLength(6)
  expect(lookupBases(2152302898747 - 1)).toHaveLength(5)
  expect(lookupBases(3215031751 - 1)).toHaveLength(4)
  expect(lookupBases(25326001 - 1)).toHaveLength(3)
  expect(lookupBases(1373653 - 1)).toHaveLength(2)
  expect(lookupBases(2047 - 1)).toHaveLength(1)
}

export function isPrime(n: number) {
  if ([2, 3, 5, 7, 11, 13, 17, 19, 23].includes(n)) return true
  if (n < 24) return false
  if (n % 2 === 0) return false
  if (n % 3 === 0) return false
  if (n % 5 === 0) return false

  const bases = lookupBases(n)
  if (bases.includes(n)) return true

  let d = (n - 1) / 2
  while (d % 2 === 0) d /= 2
  const r = Math.log2((n - 1) / d)

  WitnessLoop: for (const a of bases) {
    let x = modularExp(a, d, n)
    if (x === 1 || x === n - 1) continue WitnessLoop
    for (var i = 0; i < r - 1; i++) {
      x = modularExp(x, 2, n)
      if (x === n - 1) continue WitnessLoop
    }
    return false
  }
  return true
}

function modularExp(_a: number, _b: number, _n: number) {
  let a = BigInt(_a)
  let b = BigInt(_b)
  let n = BigInt(_n)

  let d = 1n
  let k = 0n
  while (b >> k > 0) k++
  while (k--) {
    d = (d * d) % n
    if (((b >> k) & 1n) > 0) d = (d * a) % n
  }
  return Number(d)
}
