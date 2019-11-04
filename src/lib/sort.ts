export const ascending = (a: number, b: number) => a - b
export const descending = (a: number, b: number) => ascending(b, a)

export const arrayAscending = (a: number[], b: number[]) => {
  let i = 0
  while (a.length - i) {
    if (b[i] === undefined) return 1
    const result = a[i] - b[i]
    if (result !== 0) return result
    i++
  }
  return 0
}

export const arrayDescending = (a: number[], b: number[]) =>
  arrayAscending(b, a)
