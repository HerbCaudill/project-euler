interface HitMap {
  [k: number]: boolean
}

interface HitMapCache {
  [k: string]: HitMap
}

const cache: HitMapCache = {}

const makeHitMap = (arr: number[], key: string) =>
  cache[key]
    ? cache[key]
    : (cache[key] = arr.reduce(
        (m, i) => ({
          ...m,
          [i]: true,
        }),
        {}
      ))

/**
 * Returns a function for determining if an array contains a number, optimized for repeated use
 * @param arr The reference array
 */
export const fastIncludes = (arr: number[]) => {
  // a bit of a hack, but I think first 20 elements probably uniquely identify an array
  const key = arr.slice(0, 20).join('_')
  const map = makeHitMap(arr, key)
  return (n: number) => map[n] !== undefined
}
