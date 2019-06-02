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
}

const power: Lookup = {
  2: 'hundred',
  3: 'thousand',
  6: 'million',
  9: 'billion',
  12: 'trillion',
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
  if (n < 100) {
    if (n in name) return name[n]
    const { bigPart, littlePart } = split(n, 10 ** 1)
    return `${name[bigPart]}-${name[littlePart]}`
  }

  const magnitude = Math.floor(Math.log10(n))

  const powerIndex = magnitude === 2 ? 2 : Math.floor(magnitude / 3) * 3
  const maxPowerIndex = Math.max(...Object.keys(power).map(d => +d)) + 2
  if (powerIndex > maxPowerIndex) throw new RangeError()

  const { littlePart, count } = split(n, 10 ** powerIndex)

  return (
    `${numberToWords(count)} ${power[powerIndex]}` +
    (littlePart
      ? ` ${littlePart < 100 ? 'and ' : ''}${numberToWords(littlePart)}`
      : '')
  )
}
