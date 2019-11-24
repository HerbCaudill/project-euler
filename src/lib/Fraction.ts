export type Fraction = [bigint, bigint]

// add a whole number and a fraction
export const add = (n: bigint, [num, den]: Fraction) =>
  [n * den + num, den] as Fraction

// invert a fraction
export const invert = ([num, den]: Fraction) => [den, num] as Fraction
