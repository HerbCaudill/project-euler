export const merge = <T>(a: T[], b: T[]): T[] =>
  Array.from(new Set(a.concat(b)))
