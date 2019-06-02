type Lookup = { [k: number]: string }

const name: Lookup = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
  1000000000000: 'trillion',
}

const split = (
  n: number,
  powerOfTen: number
): { bigPart: number; littlePart: number; count: number } => {
  const bigPart = Math.floor(n / powerOfTen) * powerOfTen
  const count = bigPart / powerOfTen
  const littlePart = n - bigPart
  return { bigPart, littlePart, count }
}

export const numberToWords = (n: number): string => {
  if (n < 100 && n in name) {
    return name[n]
  }

  if (n < 100) {
    const { bigPart, littlePart } = split(n, 10)
    return `${name[bigPart]}-${name[littlePart]}`
  }

  if (n < 1000) {
    const { littlePart, count } = split(n, 100)
    return (
      `${name[count]} ${name[100]}` +
      (littlePart ? ` and ${numberToWords(littlePart)}` : '')
    )
  }

  throw new Error('not implemented')
}
