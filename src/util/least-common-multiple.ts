import { factors, isPrime } from '.'

type CountMap = {
  [f: number]: number
}

export const leastCommonMultiple = (...n: number[]) => {
  const factorCounts: CountMap = n
    .map(d => (isPrime(d) ? [d] : factors(d)))
    .reduce((countMaps: CountMap[], arr: number[]) => {
      const c = arr.reduce((countMap: CountMap, f: number) => {
        countMap[f] = (countMap[f] || 0) + 1
        return countMap
      }, {})
      return countMaps.concat(c)
    }, [])
    .reduce((countMap: CountMap, current: CountMap) => {
      for (const key in current) {
        countMap[key] = Math.max(current[key] || 0, countMap[key] || 0)
      }
      return countMap
    }, {})

  return Object.keys(factorCounts).reduce((result: number, key: string) => {
    return result * (+key) ** factorCounts[+key]
  }, 1)
}
