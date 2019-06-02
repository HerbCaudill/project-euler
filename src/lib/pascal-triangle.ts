import { range } from './range'

// overloads
export function pascalTriangle(r: number): number[]
export function pascalTriangle(r: number, c: number): number

// implementation
export function pascalTriangle(r: number, c?: number): number[] | number {
  const row = range({ start: 0, stop: c || r }).reduce<number[]>(
    (arr, c) => arr.concat(c === 0 ? 1 : (arr[c - 1] * (r + 1 - c)) / c),
    []
  )
  return c === null || c === undefined ? row : row[c]
}
