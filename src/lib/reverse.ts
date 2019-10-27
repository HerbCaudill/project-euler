export const reverse = (n: bigint): bigint =>
  BigInt(
    n
      .toString()
      .split('')
      .reverse()
      .join('')
  )

// expect(reverse(74)).toBe(47)
// expect(reverse(1292)).toBe(2921)
// expect(reverse(4213)).toBe(3124)
