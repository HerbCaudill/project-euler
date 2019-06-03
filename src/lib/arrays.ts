export const sort = (arr: number[]) => arr.sort((a, b) => a - b)

export const allButLast = (arr: any[]): any[] => arr.slice(0, arr.length - 1)

export const unique = (arr: number[]) => Array.from(new Set(arr))
