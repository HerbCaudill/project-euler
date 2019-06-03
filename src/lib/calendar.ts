export interface Day {
  year: number
  month: number
  day: number
  weekday?: number
}

const BEGINNING: Day = {
  year: 1900,
  month: 1,
  day: 1,
  weekday: 1, // monday
}

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const isLeapYear = (y: number) =>
  y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)

expect(isLeapYear(1900)).toBe(false)
expect(isLeapYear(1903)).toBe(false)
expect(isLeapYear(1904)).toBe(true)
expect(isLeapYear(1996)).toBe(true)
expect(isLeapYear(1997)).toBe(false)
expect(isLeapYear(2000)).toBe(true)

// m is 1-based (1=january, 2=february, etc)
const daysInMonth = (m: number, y: number): number =>
  (<{ [k: number]: number }>{
    1: 31,
    2: isLeapYear(y) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  })[m]

expect(daysInMonth(3, 2019)).toEqual(31)
expect(daysInMonth(2, 2019)).toEqual(28)
expect(daysInMonth(2, 2020)).toEqual(29)

export const calendar = (endDate: Day = { year: 2019, month: 6, day: 3 }) => {
  const days: Day[] = []
  let { year, month, day, weekday } = BEGINNING
  while (year != endDate.year) {
    days.push({ year, month, day, weekday })
    if (++weekday! > WEEKDAYS.length - 1) weekday = 0
    if (++day > daysInMonth(month, year)) {
      if (++month > 12) {
        ++year
        month = 1
      }
      day = 1
    }
  }
  return days
}
