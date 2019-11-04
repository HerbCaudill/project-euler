// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test

// with these bases, Miller-Rabin is deterministic
const bases = {
  '3317044064679887385961981': [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41],
  '318665857834031151167461': [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37],
  '9007199254740991': [2, 3, 5, 7, 11, 13, 17, 19, 23], // MAX_SAFE_INTEGER - 1
  '341550071728321': [2, 3, 5, 7, 11, 13, 17],
  '3474749660383': [2, 3, 5, 7, 11, 13],
  '2152302898747': [2, 3, 5, 7, 11],
  '3215031751': [2, 3, 5, 7],
  '25326001': [2, 3, 5],
  '1373653': [2, 3],
  '2047': [2],
} as { [k: string]: number[] }

const lookupBases = (n: bigint): number[] => {
  const keys = Object.keys(bases)
    .map(d => BigInt(d))
    .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
  const key = keys.find(d => BigInt(n) <= d)
  return key ? bases[key.toString()] : [2]
}
{
  expect(lookupBases(9007199254740991n - 1n)).toHaveLength(9)
  expect(lookupBases(341550071728321n - 1n)).toHaveLength(7)
  expect(lookupBases(3474749660383n - 1n)).toHaveLength(6)
  expect(lookupBases(2152302898747n - 1n)).toHaveLength(5)
  expect(lookupBases(3215031751n - 1n)).toHaveLength(4)
  expect(lookupBases(25326001n - 1n)).toHaveLength(3)
  expect(lookupBases(1373653n - 1n)).toHaveLength(2)
  expect(lookupBases(2047n - 1n)).toHaveLength(1)
}

export function isPrime(_n: number | bigint) {
  const n = BigInt(_n)
  _n = Number(n)
  if ([2, 3, 5, 7, 11, 13, 17, 19, 23].includes(_n)) return true
  if (_n < 24) return false
  if (n % 2n === 0n) return false
  if (n % 3n === 0n) return false
  if (n % 5n === 0n) return false

  const bases = lookupBases(n)
  if (bases.includes(_n)) return true

  let d = (n - 1n) / 2n
  while (d % 2n === 0n) d /= 2n
  const r = BigInt(Math.log2(Number((n - 1n) / d)))

  WitnessLoop: for (const a of bases) {
    let x = modularExp(a, d, n)
    if (x === 1n || x === n - 1n) continue WitnessLoop
    for (var i = 0; i < r - 1n; i++) {
      x = modularExp(x, 2, n)
      if (x === n - 1n) continue WitnessLoop
    }
    return false
  }
  return true
}

function modularExp(
  _a: number | bigint,
  _b: number | bigint,
  _n: number | bigint
) {
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
  return d
}
