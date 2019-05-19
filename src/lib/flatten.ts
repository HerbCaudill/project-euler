export const flatten = (arr: any[][]): any[] =>
  arr.reduce((result, a) => result.concat(a), [])
