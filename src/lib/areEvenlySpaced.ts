const ascending = (a: number, b: number) => a - b

export const areEvenlySpaced = (nums: number[]) => {
  if (nums.length < 3) return true
  nums = nums.sort(ascending)
  let prev: number | undefined
  const diff = nums[1] - nums[0]
  for (const n of nums) {
    if (prev && n - prev !== diff) {
      return false
    }
    prev = n
  }
  return true
}

// trivial cases
expect(areEvenlySpaced([])).toBe(true)
expect(areEvenlySpaced([8])).toBe(true)
expect(areEvenlySpaced([8, 11])).toBe(true)

expect(areEvenlySpaced([8, 11, 14, 17, 20])).toBe(true)
expect(areEvenlySpaced([8, 11, 14, 17, 12])).toBe(false)
expect(areEvenlySpaced([1487, 4817, 8147])).toBe(true)
expect(areEvenlySpaced([100, 95, 85, 90])).toBe(true)
expect(areEvenlySpaced([100, 95, 85, 91])).toBe(false)
