// returns the name (in English) of a number

// ten raised to multiples of three are special in the English numerical system (10³ = "thousand", 10⁶ = "million" etc.)
const THREE = 3

export const transcribe = (n: number): string => {
  // just look it up if we can (see `name` dictionary below)
  // this handles all numbers under twenty, as well as all multiples of ten (twenty, thirty, etc.)
  if (n in name) return name[n]

  // throw an error if the number is out of range
  // (this range can be extended just by adding entries to the `power` dictionary, e.g. 'quadrillion', 'quintillion')
  if (n < 0) throw new RangeError(`Cannot convert negative numbers`)
  const maxMagnitude = Math.max(...Object.keys(power).map(d => +d)) + THREE
  const max = 10 ** maxMagnitude - 1
  if (n > max) throw new RangeError(`Cannot convert numbers larger than ${max}`)

  const magnitude = Math.floor(Math.log10(n))

  // powerIndex is the exponent of the largest power of ten that will be included in the transcribed name
  // (2=hundred, 3=thousand, 6=million, etc.)
  // (see `power` dictionary below)
  const powerIndex =
    magnitude >= THREE
      ? // 3, 6, 9, 12, etc
        Math.floor(magnitude / THREE) * THREE
      : // 1, 2
        magnitude
  const powerIndexName = power[powerIndex] // "hundred", "thousand", "million", etc
  const powerOfTen = 10 ** powerIndex // 100, 1000, 1000000, etc

  // here we split the number into two parts based on the powerIndex:
  // n = bigPart + littlePart
  // 42 = 40 + 2
  // 100 = 100 + 0
  // 4321 = 4000 + 321
  // 1_234_567 = 1_000_000 + 234_567
  const bigPart = Math.floor(n / powerOfTen) * powerOfTen // we'll transcribe bigPart here
  const littlePart = n - bigPart // we'll deal with littlePart recursively

  const count = bigPart / powerOfTen // the number of {thousands, millions, billions, etc} we have

  const bigPartName =
    n < 100
      ? // for numbers under 100, this will be something like "forty", which we can look up
        name[bigPart]
      : // otherwise it will be something like "two thousand"
        `${transcribe(count)} ${powerIndexName}`

  const separator =
    n < 100
      ? // for numbers under 100, we need a dash e.g. "forty-two"
        '-'
      : // this is a little ambiguous in the instructions,
      //   but I think we only need the 'and' when the little part is under a hundred:
      //     - 100 + 42: "one hundred and forty-two"
      //     - 1000 + 42: "one thousand and forty-two"
      //   but not when it's larger:
      //     - 1000 + 100: "one thousand one hundred" (not "one thousand *and* one hundred")
      //     - 1000000 + 232: "one million two hundred and thirty-two" (not "one million *and* two hundred and thirty-two")
      littlePart > 0 && littlePart < 100
      ? ' and '
      : ' '

  // the little part is transcribed recursively; regardless of how big it is,
  // the same rules apply to it as to a stand-alone number
  //   - 107 = 100 + 7; littlePart is `transcribe(7)` -> "seven"
  //   - 1234 = 1000 + 234; littlePart is `transcribe(234)` -> "two hundred and thirty-four"
  //   - 1_234_567 = 1_000_000 + 234_567; littlePart is `transcribe(234_567) etc.
  const littlePartName =
    littlePart > 0
      ? // only transcribe the little part if it's non-zero (we don't say "one hundred and zero")
        transcribe(littlePart)
      : ''

  return (bigPartName + separator + littlePartName).trim()
}

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
