export const isPalindrome = (n: number): boolean => {
  const s = n.toString()

  if (s.length <= 1) return true

  const midpoint = s.length / 2 - 1

  let i = 0
  do {
    if (s[i] != s[s.length - 1 - i]) return false
  } while (i++ <= midpoint)
  return true
}
