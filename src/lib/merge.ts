export const merge = (a: any[], b: any[]) =>
  a.concat(b.filter(d => !a.includes(d)))
