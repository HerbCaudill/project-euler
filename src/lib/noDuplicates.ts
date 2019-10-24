import { digits } from 'lib/digits'
/**
 * Returns true
 * @param n
 */
export const noDuplicates = (n: number) => {
  const isDuplicate = (d: number, i: number, arr: number[]) =>
    i < 1 ? false : arr.slice(0, i).includes(d)
  return !digits(n).some(isDuplicate)
}
