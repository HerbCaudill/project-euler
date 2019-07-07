const keys = Object.keys

export const deepEquals = (a: any, b: any): boolean =>
  // same number of properties
  keys(a).length == keys(b).length &&
  // each property is equal
  keys(a).every(
    key =>
      typeof a[key] === 'object'
        ? deepEquals(a[key], b[key]) // check deep equality for objects
        : a[key] == b[key] // otherwise check value equality
  )
