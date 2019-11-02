// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Testing_against_small_sets_of_bases
const bases = {
  '341550071728321': [2, 3, 5, 7, 11, 13, 17],
  '3474749660383': [2, 3, 5, 7, 11, 13],
  '2152302898747': [2, 3, 5, 7, 11],
  '3215031751': [2, 3, 5, 7],
  '25326001': [2, 3, 5],
  '1373653': [2, 3],
  '2047': [2],
} as { [k: string]: number[] }

const getBases = (n: number): number[] => {
  const keys = Object.keys(bases)
    .map(d => +d)
    .sort((a, b) => a - b)
  const key = keys.find(d => n < d)
  return key ? bases[key] : [2]
}
expect(getBases(341550071728321 - 1)).toHaveLength(7)
expect(getBases(3474749660383 - 1)).toHaveLength(6)
expect(getBases(2152302898747 - 1)).toHaveLength(5)
expect(getBases(3215031751 - 1)).toHaveLength(4)
expect(getBases(25326001 - 1)).toHaveLength(3)
expect(getBases(1373653 - 1)).toHaveLength(2)
expect(getBases(2047 - 1)).toHaveLength(1)

// Input: n > 1, an odd integer to be tested for primality
// Output: “composite” if n is composite, “prime” otherwise

// write n as 2r·d + 1 with d odd (by factoring out powers of 2 from n − 1)
// WitnessLoop: for all a in the range [2, min(n−2, ⌊2(ln n)2⌋)]:
//    x ← a^d mod n
//    if x = 1 or x = n − 1 then
//       continue WitnessLoop
//    repeat r − 1 times:
//       x ← x2 mod n
//       if x = n − 1 then
//          continue WitnessLoop
//    return “composite”
// return “prime”

export function isPrime(n: number) {
  if (n <= 1) return false
  if (n == 2) return true
  if (n % 2 == 0) return false
  if (n < 9) return true
  if (n % 3 == 0) return false
  if (n % 5 == 0) return false

  let d = (n - 1) / 2
  while (d % 2 === 0) d /= 2
  const r = Math.log2((n - 1) / d)

  WitnessLoop: for (const a of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]) {
    let x = modularExp(a, d, n)
    if (x === 1 || x === n - 1) continue WitnessLoop
    for (var i = 0; i < r - 1; i++) {
      x = x ** 2 % n
      if (x === n - 1) continue WitnessLoop
    }
    return false
  }
  return true
}

function modularExp(a: number, b: number, n: number) {
  let d = 1
  let k = 0
  while (b >> k > 0) k++
  while (k--) {
    d = (d * d) % n
    if (((b >> k) & 1) > 0) d = (d * a) % n
  }
  return d
}
