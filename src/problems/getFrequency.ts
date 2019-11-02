type FrequencyTable = {
  [key: number]: number
}

const frequencyReducer = (r: any, d: number) => ({ ...r, [d]: (r[d] || 0) + 1 })

const sortByValue = (obj: { [k: string]: number }) =>
  Object.entries(obj)
    .sort((b, a) => a[1] - b[1])
    .map(e => +e[0])

export const getFrequency = (b: Buffer) =>
  sortByValue(b.reduce(frequencyReducer, {} as FrequencyTable))
