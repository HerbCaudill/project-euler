import { ascending } from './sort'

/** Deduplicates an array of numeric arrays. For example, [1,2,3] and [2,1,3] are treated
 * as equivalent, and only one is included in the returned set.
 */
const stringify = (arr: number[]) => JSON.stringify(arr.sort(ascending))
const parse = (s: string) => JSON.parse(s) as number[]

export const distinctArrays = (arr: number[][]) => {
  return Array.from(new Set(arr.map(stringify))).map(parse)
}
