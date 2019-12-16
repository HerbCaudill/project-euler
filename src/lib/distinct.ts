// export const distinct = (arr: number[]) => [...new Set(arr)]

const LARGE_ARRAY_SIZE = 200

export const distinct = (array: number[]) => {
  let index = -1
  let isCommon = true

  const { length } = array
  const result: number[] = []
  let seen = result

  if (length >= LARGE_ARRAY_SIZE) {
    return [...new Set(array)]
  } else {
    seen = result
  }
  outer: while (++index < length) {
    let value = array[index]
    const computed = value

    value = value !== 0 ? value : 0
    if (isCommon && computed === computed) {
      let seenIndex = seen.length
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    } else if (!seen.some(array.includes)) {
      if (seen !== result) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}

export const distinctSorted = (array: number[]) => {
  let seen
  let index = -1
  let resIndex = 0

  const { length } = array
  const result = []

  while (++index < length) {
    const value = array[index],
      computed = value
    if (!index || computed !== seen) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}
