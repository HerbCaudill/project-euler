export const permutations = (arr: string[], sorted = false): string[][] => {
  if (arr.length === 1) return [arr]

  // if this is our first pass, sort the array
  if (!sorted) arr.sort()

  const initial = [] as string[][]
  return arr.reduce((result, X, i, arr) => {
    const rest = [...arr] // clone
    rest.splice(i, 1) // remove current
    const permutationsStartingWithX = permutations(rest, (sorted = true)).map(
      p => [X, ...p]
    )
    return result.concat(permutationsStartingWithX)
  }, initial)
}

/*





*/
