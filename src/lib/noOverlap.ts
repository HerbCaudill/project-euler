import { digits } from 'lib/digits'
/**
 * Takes a number n1, and returns a filter function that takes a number n2 and returns true if n1
 * and n2 have no digits in common.
 * @param n1 Number with the digits to exclude. If not provided, returns true.
 */
export const noOverlap = (n1?: number) => (n2: number) =>
  n1 ? !digits(n1).some(d => digits(n2).includes(d)) : true
